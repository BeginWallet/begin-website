import { useState, useRef, useEffect } from 'react'
import { ChevronDown, Save, Trash2, Layout, TrendingUp, BarChart3, Briefcase, Newspaper } from 'lucide-react'
import { useTerminalStore, PRESET_LAYOUTS } from '../../../hooks/terminal/useTerminalStore'

const PRESET_ICONS: Record<string, typeof Layout> = {
  trader: TrendingUp,
  analyst: BarChart3,
  portfolio: Briefcase,
  'news-desk': Newspaper,
}

export function LayoutPresets() {
  const {
    layoutConfig,
    activePresetId,
    customLayouts,
    applyPreset,
    saveCurrentLayout,
    deleteCustomLayout,
  } = useTerminalStore()

  const [isOpen, setIsOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveName, setSaveName] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const saveInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isSaving) {
      saveInputRef.current?.focus()
    }
  }, [isSaving])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
        setIsSaving(false)
        setSaveName('')
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const handlePresetSelect = (presetId: string) => {
    applyPreset(presetId)
    setIsOpen(false)
  }

  const handleSave = () => {
    const name = saveName.trim()
    if (!name) return
    saveCurrentLayout(name)
    setSaveName('')
    setIsSaving(false)
    setIsOpen(false)
  }

  const handleSaveKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setIsSaving(false)
      setSaveName('')
    }
  }

  const handleDeleteCustom = (name: string, e: React.MouseEvent) => {
    e.stopPropagation()
    deleteCustomLayout(name)
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1a1a] border border-[#333] rounded hover:border-[#444] transition-colors"
      >
        <Layout className="w-3.5 h-3.5 text-[#00E5FF]" />
        <span className="text-sm text-white">{layoutConfig.name}</span>
        <ChevronDown className={`w-4 h-4 text-[#999] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full mt-1 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#333] rounded shadow-lg z-20 min-w-[200px]">
          {/* Preset layouts */}
          <div className="px-3 py-1.5 text-[10px] font-mono text-[#666] uppercase tracking-wider">
            Presets
          </div>
          {PRESET_LAYOUTS.map((preset) => {
            const Icon = PRESET_ICONS[preset.id] || Layout
            return (
              <button
                key={preset.id}
                onClick={() => handlePresetSelect(preset.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm hover:bg-[#333] transition-colors ${
                  activePresetId === preset.id ? 'text-[#00E5FF]' : 'text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{preset.name}</span>
                {activePresetId === preset.id && (
                  <span className="ml-auto text-[10px] text-[#00E5FF] font-mono">ACTIVE</span>
                )}
              </button>
            )
          })}

          {/* Custom layouts */}
          {customLayouts.length > 0 && (
            <>
              <div className="border-t border-[#333] my-1" />
              <div className="px-3 py-1.5 text-[10px] font-mono text-[#666] uppercase tracking-wider">
                Custom
              </div>
              {customLayouts.map((layout) => (
                <div
                  key={layout.name}
                  className="flex items-center group"
                >
                  <button
                    onClick={() => {
                      saveCurrentLayout(layout.name)
                      // Re-apply from saved
                      const { customLayouts: cl } = useTerminalStore.getState()
                      const saved = cl.find((l) => l.name === layout.name)
                      if (saved) {
                        useTerminalStore.setState({
                          panels: [...saved.panels],
                          layouts: [...saved.layouts],
                          layoutConfig: { ...saved.layoutConfig },
                        })
                      }
                      setIsOpen(false)
                    }}
                    className="flex-1 flex items-center gap-2 px-3 py-2 text-left text-sm text-white hover:bg-[#333] transition-colors"
                  >
                    <Layout className="w-3.5 h-3.5 flex-shrink-0 text-[#999]" />
                    <span className="truncate">{layout.name}</span>
                  </button>
                  <button
                    onClick={(e) => handleDeleteCustom(layout.name, e)}
                    className="p-2 text-[#666] hover:text-[#FF4444] transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete layout"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </>
          )}

          {/* Save current layout */}
          <div className="border-t border-[#333] my-1" />
          {isSaving ? (
            <div className="px-3 py-2">
              <div className="flex items-center gap-2">
                <input
                  ref={saveInputRef}
                  type="text"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  onKeyDown={handleSaveKeyDown}
                  placeholder="Layout name…"
                  className="flex-1 bg-[#0a0a0a] border border-[#333] rounded px-2 py-1 text-xs text-white font-mono placeholder-[#555] outline-none focus:border-[#00E5FF]"
                  maxLength={30}
                />
                <button
                  onClick={handleSave}
                  disabled={!saveName.trim()}
                  className="px-2 py-1 bg-[#00E5FF]/10 text-[#00E5FF] text-xs font-mono rounded hover:bg-[#00E5FF]/20 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setIsSaving(true)}
              className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm text-[#999] hover:text-white hover:bg-[#333] transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Current Layout</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default LayoutPresets
