import { ReactNode } from 'react'
import { Maximize2, X, Minimize2 } from 'lucide-react'
import { useTerminalStore } from '../../../hooks/terminal/useTerminalStore'

interface PanelProps {
  id: string
  title: string
  children?: ReactNode
  isMaximized?: boolean
}

const Panel = ({ id, title, children, isMaximized = false }: PanelProps) => {
  const { removePanel, maximizePanel, restoreLayout } = useTerminalStore()

  const handleMaximize = () => {
    if (isMaximized) {
      restoreLayout()
    } else {
      maximizePanel(id)
    }
  }

  const handleClose = () => {
    removePanel(id)
  }

  return (
    <div className="h-full flex flex-col bg-[#1a1a1a] border border-[#333] rounded overflow-hidden">
      <div className="panel-drag-handle h-8 bg-[#1a1a1a] border-b border-[#333] px-3 flex items-center justify-between flex-shrink-0 cursor-grab active:cursor-grabbing">
        <span className="text-sm text-white font-medium truncate">{title}</span>
        <div className="flex items-center gap-1">
          <button
            onClick={handleMaximize}
            className="p-1 hover:bg-[#333] rounded transition-colors"
            title={isMaximized ? 'Restore' : 'Maximize'}
          >
            {isMaximized ? (
              <Minimize2 className="w-3.5 h-3.5 text-[#999] hover:text-white" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5 text-[#999] hover:text-white" />
            )}
          </button>
          <button
            onClick={handleClose}
            className="p-1 hover:bg-[#333] rounded transition-colors"
            title="Close"
          >
            <X className="w-3.5 h-3.5 text-[#999] hover:text-white" />
          </button>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {children || (
          <div className="h-full flex items-center justify-center text-[#666] text-sm font-mono">
            {title} Panel
          </div>
        )}
      </div>
    </div>
  )
}

export default Panel
