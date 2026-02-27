import { useMemo, useState, useEffect, type ReactNode } from 'react'
import { GridLayout, Layout } from 'react-grid-layout'
import { useTerminalStore, type PanelType } from '../../../hooks/terminal/useTerminalStore'
import Panel from './Panel'
import { PortfolioDashboard } from '../Portfolio/PortfolioDashboard'
import { SwapPanel } from '../Trade/SwapPanel'
import { BridgePanel } from '../Trade/BridgePanel'
import { PerpsPanel } from '../Trade/PerpsPanel'
import 'react-grid-layout/css/styles.css'

const PANEL_CONTENT: Partial<Record<PanelType, () => ReactNode>> = {
  portfolio: () => <PortfolioDashboard />,
  swap: () => <SwapPanel />,
  bridge: () => <BridgePanel />,
  perps: () => <PerpsPanel />,
}

const PanelGrid = () => {
  const { panels, layouts, layoutConfig, updateLayouts } = useTerminalStore()
  const [isMobile, setIsMobile] = useState(false)
  const [containerWidth, setContainerWidth] = useState(1200)

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth
      setIsMobile(width < 768)
      setContainerWidth(width)
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const handleLayoutChange = (newLayout: Layout) => {
    updateLayouts([...newLayout])
  }

  const isMaximized = layouts.length === 1

  const mobileLayouts = useMemo(() => {
    return panels.map((panel, index) => ({
      i: panel.id,
      x: 0,
      y: index,
      w: 1,
      h: 1,
    }))
  }, [panels])

  const currentLayout = isMobile ? mobileLayouts : layouts
  const cols = isMobile ? 1 : layoutConfig.cols

  const rowHeight = useMemo(() => {
    if (typeof window === 'undefined') return layoutConfig.rowHeight
    const availableHeight = window.innerHeight - 64 - 24 - 16
    if (isMobile) {
      return Math.max(250, availableHeight / 2)
    }
    const rows = Math.ceil(panels.length / cols)
    return Math.max(200, (availableHeight - (rows - 1) * 8) / rows)
  }, [isMobile, panels.length, cols, layoutConfig.rowHeight])

  return (
    <div className="flex-1 overflow-auto p-2">
      <GridLayout
        className="layout"
        layout={currentLayout}
        width={containerWidth - 16}
        gridConfig={{
          cols,
          rowHeight,
          margin: [8, 8] as const,
          containerPadding: [0, 0] as const,
        }}
        dragConfig={{
          enabled: !isMobile,
          handle: '.panel-drag-handle',
        }}
        resizeConfig={{
          enabled: !isMobile,
        }}
        onLayoutChange={handleLayoutChange}
      >
        {panels.map((panel) => {
          const renderContent = PANEL_CONTENT[panel.type]
          return (
            <div key={panel.id}>
              <Panel
                id={panel.id}
                title={panel.title}
                isMaximized={isMaximized}
              >
                {renderContent ? renderContent() : undefined}
              </Panel>
            </div>
          )
        })}
      </GridLayout>
    </div>
  )
}

export default PanelGrid
