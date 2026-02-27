# Task: T13 — Layout Presets + Keyboard Shortcuts

## Context
Next.js website, work in `src/` directory. Bloomberg-style crypto terminal on `feat/terminal` branch. Path alias `@/` maps to `src/`. Components in `src/components/terminal/`, hooks in `src/hooks/terminal/`.

The terminal uses `react-grid-layout` for panel management (see `src/components/terminal/Layout/PanelGrid.tsx`). There's a zustand store at `src/hooks/terminal/useTerminalStore.ts`.

## What to Build

### Layout Presets (`src/components/terminal/Layout/LayoutPresets.tsx`)
1. Preset layouts:
   - **Trader**: chart + orderbook/swap + positions + news
   - **Analyst**: 4 charts (different tokens/timeframes)
   - **Portfolio**: holdings + performance + allocation + activity
   - **News Desk**: news + chart + watchlist + social feed
2. Save/load custom layouts to localStorage
3. Layout switcher in terminal header (dropdown or toolbar)

### Keyboard Shortcuts (`src/hooks/terminal/useKeyboardShortcuts.ts`)
1. Cmd+1/2/3/4 — focus panels by index
2. Cmd+K — open command bar (may already exist, verify)
3. Esc — close overlays/modals
4. Arrow keys in watchlist for navigation
5. Panel maximize (double-click or shortcut) / minimize / close / swap

### Integration
- Wire presets into TerminalShell header
- Integrate keyboard hook into the terminal page
- Persist selected layout in localStorage

## Rules
- Reuse existing zustand store and PanelGrid component
- Match dark terminal theme
- Write unit tests for layout serialization/deserialization
- Run `cd src && npm run typecheck` — must pass (ignore pages/test.tsx)
- Commit: `feat(terminal): add layout presets and keyboard shortcuts (T13)`
