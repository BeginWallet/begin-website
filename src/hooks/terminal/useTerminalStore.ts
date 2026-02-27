import { create } from 'zustand'

export type PanelType = 'chart' | 'orderbook' | 'trades' | 'portfolio' | 'watchlist' | 'news' | 'swap' | 'empty'

export interface PanelConfig {
  id: string
  type: PanelType
  title: string
}

export interface LayoutConfig {
  name: string
  cols: number
  rowHeight: number
}

export interface LayoutItem {
  i: string
  x: number
  y: number
  w: number
  h: number
}

interface TerminalState {
  panels: PanelConfig[]
  layouts: LayoutItem[]
  activePanel: string | null
  layoutConfig: LayoutConfig
  setActivePanel: (id: string | null) => void
  updatePanels: (panels: PanelConfig[]) => void
  updateLayouts: (layouts: LayoutItem[]) => void
  removePanel: (id: string) => void
  maximizePanel: (id: string) => void
  restoreLayout: () => void
  setLayoutConfig: (config: LayoutConfig) => void
}

const defaultPanels: PanelConfig[] = [
  { id: 'panel-1', type: 'chart', title: 'Chart' },
  { id: 'panel-2', type: 'watchlist', title: 'Watchlist' },
  { id: 'panel-3', type: 'news', title: 'News' },
  { id: 'panel-4', type: 'portfolio', title: 'Portfolio' },
]

const defaultLayouts: LayoutItem[] = [
  { i: 'panel-1', x: 0, y: 0, w: 1, h: 1 },
  { i: 'panel-2', x: 1, y: 0, w: 1, h: 1 },
  { i: 'panel-3', x: 0, y: 1, w: 1, h: 1 },
  { i: 'panel-4', x: 1, y: 1, w: 1, h: 1 },
]

const defaultLayoutConfig: LayoutConfig = {
  name: '2x2 Grid',
  cols: 2,
  rowHeight: 300,
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  panels: defaultPanels,
  layouts: defaultLayouts,
  activePanel: null,
  layoutConfig: defaultLayoutConfig,

  setActivePanel: (id) => set({ activePanel: id }),

  updatePanels: (panels) => set({ panels }),

  updateLayouts: (layouts) => set({ layouts }),

  removePanel: (id) => {
    const { panels, layouts } = get()
    set({
      panels: panels.filter((p) => p.id !== id),
      layouts: layouts.filter((l) => l.i !== id),
    })
  },

  maximizePanel: (id) => {
    set({
      layouts: [{ i: id, x: 0, y: 0, w: 2, h: 2 }],
    })
  },

  restoreLayout: () => {
    set({
      layouts: defaultLayouts,
    })
  },

  setLayoutConfig: (config) => set({ layoutConfig: config }),
}))
