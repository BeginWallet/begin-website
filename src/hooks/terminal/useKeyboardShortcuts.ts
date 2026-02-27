import { useEffect } from 'react'
import { useTerminalStore } from './useTerminalStore'

export function useKeyboardShortcuts() {
  const { panels, setActivePanel, maximizePanel, restoreLayout, layouts } = useTerminalStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const isInputFocused =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable

      // Cmd/Ctrl + 1-4: focus panel by index
      if ((e.metaKey || e.ctrlKey) && e.key >= '1' && e.key <= '4') {
        e.preventDefault()
        const index = parseInt(e.key) - 1
        if (index < panels.length) {
          setActivePanel(panels[index].id)
        }
        return
      }

      // Cmd/Ctrl + M: maximize/restore active panel
      if ((e.metaKey || e.ctrlKey) && e.key === 'm') {
        e.preventDefault()
        const { activePanel } = useTerminalStore.getState()
        if (activePanel) {
          if (layouts.length === 1) {
            restoreLayout()
          } else {
            maximizePanel(activePanel)
          }
        }
        return
      }

      // Escape: deselect active panel (overlays handled by their own components)
      if (e.key === 'Escape' && !isInputFocused) {
        const { activePanel } = useTerminalStore.getState()
        if (activePanel) {
          setActivePanel(null)
        }
        return
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [panels, setActivePanel, maximizePanel, restoreLayout, layouts])
}
