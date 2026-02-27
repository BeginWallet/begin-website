import { create } from 'zustand'

export type PanelType = 'chart' | 'orderbook' | 'trades' | 'portfolio' | 'watchlist' | 'news' | 'swap' | 'bridge' | 'perps' | 'empty'

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

export interface LayoutPreset {
  id: string
  name: string
  panels: PanelConfig[]
  layouts: LayoutItem[]
  layoutConfig: LayoutConfig
}

export interface SavedLayout {
  name: string
  panels: PanelConfig[]
  layouts: LayoutItem[]
  layoutConfig: LayoutConfig
}

// ── Preset Definitions ─────────────────────────────────────────────────────

export const PRESET_LAYOUTS: LayoutPreset[] = [
  {
    id: 'trader',
    name: 'Trader',
    panels: [
      { id: 'panel-1', type: 'chart', title: 'Chart' },
      { id: 'panel-2', type: 'swap', title: 'Swap' },
      { id: 'panel-3', type: 'perps', title: 'Perps' },
      { id: 'panel-4', type: 'news', title: 'News' },
    ],
    layouts: [
      { i: 'panel-1', x: 0, y: 0, w: 1, h: 1 },
      { i: 'panel-2', x: 1, y: 0, w: 1, h: 1 },
      { i: 'panel-3', x: 0, y: 1, w: 1, h: 1 },
      { i: 'panel-4', x: 1, y: 1, w: 1, h: 1 },
    ],
    layoutConfig: { name: 'Trader', cols: 2, rowHeight: 300 },
  },
  {
    id: 'analyst',
    name: 'Analyst',
    panels: [
      { id: 'panel-1', type: 'chart', title: 'BTC Chart' },
      { id: 'panel-2', type: 'chart', title: 'ETH Chart' },
      { id: 'panel-3', type: 'chart', title: 'SOL Chart' },
      { id: 'panel-4', type: 'chart', title: 'ADA Chart' },
    ],
    layouts: [
      { i: 'panel-1', x: 0, y: 0, w: 1, h: 1 },
      { i: 'panel-2', x: 1, y: 0, w: 1, h: 1 },
      { i: 'panel-3', x: 0, y: 1, w: 1, h: 1 },
      { i: 'panel-4', x: 1, y: 1, w: 1, h: 1 },
    ],
    layoutConfig: { name: 'Analyst', cols: 2, rowHeight: 300 },
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    panels: [
      { id: 'panel-1', type: 'portfolio', title: 'Portfolio' },
      { id: 'panel-2', type: 'chart', title: 'Chart' },
      { id: 'panel-3', type: 'watchlist', title: 'Watchlist' },
      { id: 'panel-4', type: 'news', title: 'News' },
    ],
    layouts: [
      { i: 'panel-1', x: 0, y: 0, w: 1, h: 1 },
      { i: 'panel-2', x: 1, y: 0, w: 1, h: 1 },
      { i: 'panel-3', x: 0, y: 1, w: 1, h: 1 },
      { i: 'panel-4', x: 1, y: 1, w: 1, h: 1 },
    ],
    layoutConfig: { name: 'Portfolio', cols: 2, rowHeight: 300 },
  },
  {
    id: 'news-desk',
    name: 'News Desk',
    panels: [
      { id: 'panel-1', type: 'news', title: 'News Feed' },
      { id: 'panel-2', type: 'chart', title: 'Chart' },
      { id: 'panel-3', type: 'watchlist', title: 'Watchlist' },
      { id: 'panel-4', type: 'swap', title: 'Swap' },
    ],
    layouts: [
      { i: 'panel-1', x: 0, y: 0, w: 1, h: 1 },
      { i: 'panel-2', x: 1, y: 0, w: 1, h: 1 },
      { i: 'panel-3', x: 0, y: 1, w: 1, h: 1 },
      { i: 'panel-4', x: 1, y: 1, w: 1, h: 1 },
    ],
    layoutConfig: { name: 'News Desk', cols: 2, rowHeight: 300 },
  },
]

// ── localStorage helpers ───────────────────────────────────────────────────

const CUSTOM_LAYOUTS_KEY = 'begin-terminal-custom-layouts'
const ACTIVE_LAYOUT_KEY = 'begin-terminal-active-layout'

export function loadCustomLayouts(): SavedLayout[] {
  if (typeof window === 'undefined') return []
  try {
    const stored = localStorage.getItem(CUSTOM_LAYOUTS_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {}
  return []
}

export function saveCustomLayouts(layouts: SavedLayout[]): void {
  try {
    localStorage.setItem(CUSTOM_LAYOUTS_KEY, JSON.stringify(layouts))
  } catch {}
}

export function loadActiveLayoutId(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(ACTIVE_LAYOUT_KEY)
  } catch {}
  return null
}

function saveActiveLayoutId(id: string | null): void {
  try {
    if (id) {
      localStorage.setItem(ACTIVE_LAYOUT_KEY, id)
    } else {
      localStorage.removeItem(ACTIVE_LAYOUT_KEY)
    }
  } catch {}
}

// ── Serialization helpers (exported for testing) ───────────────────────────

export function serializeLayout(panels: PanelConfig[], layouts: LayoutItem[], layoutConfig: LayoutConfig): string {
  return JSON.stringify({ panels, layouts, layoutConfig })
}

export function deserializeLayout(data: string): SavedLayout | null {
  try {
    const parsed = JSON.parse(data)
    if (
      parsed &&
      Array.isArray(parsed.panels) &&
      Array.isArray(parsed.layouts) &&
      parsed.layoutConfig &&
      typeof parsed.layoutConfig.name === 'string' &&
      typeof parsed.layoutConfig.cols === 'number' &&
      typeof parsed.layoutConfig.rowHeight === 'number'
    ) {
      // Validate each panel has required fields
      for (const p of parsed.panels) {
        if (!p.id || !p.type || !p.title) return null
      }
      // Validate each layout item has required fields
      for (const l of parsed.layouts) {
        if (typeof l.i !== 'string' || typeof l.x !== 'number' || typeof l.y !== 'number' || typeof l.w !== 'number' || typeof l.h !== 'number') return null
      }
      return parsed as SavedLayout
    }
  } catch {}
  return null
}

// ── Default state ──────────────────────────────────────────────────────────

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

// ── Store ──────────────────────────────────────────────────────────────────

interface TerminalState {
  panels: PanelConfig[]
  layouts: LayoutItem[]
  activePanel: string | null
  layoutConfig: LayoutConfig
  activePresetId: string | null
  customLayouts: SavedLayout[]
  setActivePanel: (id: string | null) => void
  updatePanels: (panels: PanelConfig[]) => void
  updateLayouts: (layouts: LayoutItem[]) => void
  removePanel: (id: string) => void
  maximizePanel: (id: string) => void
  restoreLayout: () => void
  setLayoutConfig: (config: LayoutConfig) => void
  applyPreset: (presetId: string) => void
  saveCurrentLayout: (name: string) => void
  deleteCustomLayout: (name: string) => void
  loadPersistedLayout: () => void
}

export const useTerminalStore = create<TerminalState>((set, get) => ({
  panels: defaultPanels,
  layouts: defaultLayouts,
  activePanel: null,
  layoutConfig: defaultLayoutConfig,
  activePresetId: null,
  customLayouts: [],

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
    const { activePresetId } = get()
    if (activePresetId) {
      const preset = PRESET_LAYOUTS.find((p) => p.id === activePresetId)
      if (preset) {
        set({ layouts: [...preset.layouts] })
        return
      }
    }
    set({ layouts: defaultLayouts })
  },

  setLayoutConfig: (config) => set({ layoutConfig: config }),

  applyPreset: (presetId) => {
    const preset = PRESET_LAYOUTS.find((p) => p.id === presetId)
    if (!preset) return
    set({
      panels: [...preset.panels],
      layouts: [...preset.layouts],
      layoutConfig: { ...preset.layoutConfig },
      activePresetId: presetId,
    })
    saveActiveLayoutId(`preset:${presetId}`)
  },

  saveCurrentLayout: (name) => {
    const { panels, layouts, layoutConfig, customLayouts } = get()
    const newLayout: SavedLayout = {
      name,
      panels: [...panels],
      layouts: [...layouts],
      layoutConfig: { ...layoutConfig, name },
    }
    const updated = customLayouts.filter((l) => l.name !== name)
    updated.push(newLayout)
    set({ customLayouts: updated, activePresetId: null })
    saveCustomLayouts(updated)
    saveActiveLayoutId(`custom:${name}`)
  },

  deleteCustomLayout: (name) => {
    const { customLayouts } = get()
    const updated = customLayouts.filter((l) => l.name !== name)
    set({ customLayouts: updated })
    saveCustomLayouts(updated)
  },

  loadPersistedLayout: () => {
    const customs = loadCustomLayouts()
    const activeId = loadActiveLayoutId()
    set({ customLayouts: customs })

    if (activeId) {
      if (activeId.startsWith('preset:')) {
        const presetId = activeId.replace('preset:', '')
        const preset = PRESET_LAYOUTS.find((p) => p.id === presetId)
        if (preset) {
          set({
            panels: [...preset.panels],
            layouts: [...preset.layouts],
            layoutConfig: { ...preset.layoutConfig },
            activePresetId: presetId,
          })
          return
        }
      } else if (activeId.startsWith('custom:')) {
        const customName = activeId.replace('custom:', '')
        const custom = customs.find((l) => l.name === customName)
        if (custom) {
          set({
            panels: [...custom.panels],
            layouts: [...custom.layouts],
            layoutConfig: { ...custom.layoutConfig },
            activePresetId: null,
          })
          return
        }
      }
    }
  },
}))
