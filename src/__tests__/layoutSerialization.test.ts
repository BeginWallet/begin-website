// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from 'vitest'
import {
  serializeLayout,
  deserializeLayout,
  loadCustomLayouts,
  saveCustomLayouts,
  PRESET_LAYOUTS,
  type PanelConfig,
  type LayoutItem,
  type LayoutConfig,
  type SavedLayout,
} from '../hooks/terminal/useTerminalStore'

// ── Test data ────────────────────────────────────────────────────────────────

const samplePanels: PanelConfig[] = [
  { id: 'panel-1', type: 'chart', title: 'Chart' },
  { id: 'panel-2', type: 'watchlist', title: 'Watchlist' },
]

const sampleLayouts: LayoutItem[] = [
  { i: 'panel-1', x: 0, y: 0, w: 1, h: 1 },
  { i: 'panel-2', x: 1, y: 0, w: 1, h: 1 },
]

const sampleConfig: LayoutConfig = {
  name: 'Test Layout',
  cols: 2,
  rowHeight: 300,
}

// ── serializeLayout ──────────────────────────────────────────────────────────

describe('serializeLayout', () => {
  it('produces valid JSON string', () => {
    const result = serializeLayout(samplePanels, sampleLayouts, sampleConfig)
    expect(() => JSON.parse(result)).not.toThrow()
  })

  it('includes all panels, layouts, and config', () => {
    const result = serializeLayout(samplePanels, sampleLayouts, sampleConfig)
    const parsed = JSON.parse(result)
    expect(parsed.panels).toEqual(samplePanels)
    expect(parsed.layouts).toEqual(sampleLayouts)
    expect(parsed.layoutConfig).toEqual(sampleConfig)
  })

  it('handles empty arrays', () => {
    const result = serializeLayout([], [], sampleConfig)
    const parsed = JSON.parse(result)
    expect(parsed.panels).toEqual([])
    expect(parsed.layouts).toEqual([])
  })
})

// ── deserializeLayout ────────────────────────────────────────────────────────

describe('deserializeLayout', () => {
  it('round-trips through serialize then deserialize', () => {
    const serialized = serializeLayout(samplePanels, sampleLayouts, sampleConfig)
    const result = deserializeLayout(serialized)
    expect(result).not.toBeNull()
    expect(result!.panels).toEqual(samplePanels)
    expect(result!.layouts).toEqual(sampleLayouts)
    expect(result!.layoutConfig).toEqual(sampleConfig)
  })

  it('returns null for invalid JSON', () => {
    expect(deserializeLayout('not json')).toBeNull()
    expect(deserializeLayout('')).toBeNull()
    expect(deserializeLayout('{}')).toBeNull()
  })

  it('returns null when panels is not an array', () => {
    const bad = JSON.stringify({
      panels: 'not-array',
      layouts: sampleLayouts,
      layoutConfig: sampleConfig,
    })
    expect(deserializeLayout(bad)).toBeNull()
  })

  it('returns null when layouts is not an array', () => {
    const bad = JSON.stringify({
      panels: samplePanels,
      layouts: 'not-array',
      layoutConfig: sampleConfig,
    })
    expect(deserializeLayout(bad)).toBeNull()
  })

  it('returns null when layoutConfig is missing required fields', () => {
    const bad = JSON.stringify({
      panels: samplePanels,
      layouts: sampleLayouts,
      layoutConfig: { name: 'test' }, // missing cols and rowHeight
    })
    expect(deserializeLayout(bad)).toBeNull()
  })

  it('returns null when a panel is missing required fields', () => {
    const bad = JSON.stringify({
      panels: [{ id: 'panel-1', type: 'chart' }], // missing title
      layouts: sampleLayouts,
      layoutConfig: sampleConfig,
    })
    expect(deserializeLayout(bad)).toBeNull()
  })

  it('returns null when a layout item has wrong types', () => {
    const bad = JSON.stringify({
      panels: samplePanels,
      layouts: [{ i: 'panel-1', x: 'zero', y: 0, w: 1, h: 1 }],
      layoutConfig: sampleConfig,
    })
    expect(deserializeLayout(bad)).toBeNull()
  })
})

// ── PRESET_LAYOUTS ───────────────────────────────────────────────────────────

describe('PRESET_LAYOUTS', () => {
  it('has exactly 4 presets', () => {
    expect(PRESET_LAYOUTS).toHaveLength(4)
  })

  it('each preset has unique id', () => {
    const ids = PRESET_LAYOUTS.map((p) => p.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('each preset has matching panels and layouts count', () => {
    for (const preset of PRESET_LAYOUTS) {
      expect(preset.panels.length).toBe(preset.layouts.length)
    }
  })

  it('each preset layout item references a valid panel', () => {
    for (const preset of PRESET_LAYOUTS) {
      const panelIds = new Set(preset.panels.map((p) => p.id))
      for (const layout of preset.layouts) {
        expect(panelIds.has(layout.i)).toBe(true)
      }
    }
  })

  it('each preset has a valid layoutConfig', () => {
    for (const preset of PRESET_LAYOUTS) {
      expect(preset.layoutConfig.name).toBeTruthy()
      expect(preset.layoutConfig.cols).toBeGreaterThan(0)
      expect(preset.layoutConfig.rowHeight).toBeGreaterThan(0)
    }
  })

  it('preset ids match expected set', () => {
    const ids = PRESET_LAYOUTS.map((p) => p.id).sort()
    expect(ids).toEqual(['analyst', 'news-desk', 'portfolio', 'trader'])
  })
})

// ── localStorage helpers ─────────────────────────────────────────────────────

describe('loadCustomLayouts / saveCustomLayouts', () => {
  const mockStorage: Record<string, string> = {}

  beforeEach(() => {
    Object.keys(mockStorage).forEach((k) => delete mockStorage[k])
    globalThis.localStorage = {
      getItem: (key: string) => mockStorage[key] ?? null,
      setItem: (key: string, value: string) => { mockStorage[key] = value },
      removeItem: (key: string) => { delete mockStorage[key] },
      clear: () => Object.keys(mockStorage).forEach((k) => delete mockStorage[k]),
      length: 0,
      key: () => null,
    }
  })

  it('returns empty array when nothing is stored', () => {
    expect(loadCustomLayouts()).toEqual([])
  })

  it('round-trips custom layouts through save and load', () => {
    const layouts: SavedLayout[] = [
      { name: 'My Layout', panels: samplePanels, layouts: sampleLayouts, layoutConfig: sampleConfig },
    ]
    saveCustomLayouts(layouts)
    const loaded = loadCustomLayouts()
    expect(loaded).toEqual(layouts)
  })

  it('handles corrupted localStorage gracefully', () => {
    mockStorage['begin-terminal-custom-layouts'] = 'not-json'
    expect(loadCustomLayouts()).toEqual([])
  })

  it('handles non-array stored value', () => {
    mockStorage['begin-terminal-custom-layouts'] = '"string"'
    expect(loadCustomLayouts()).toEqual([])
  })
})
