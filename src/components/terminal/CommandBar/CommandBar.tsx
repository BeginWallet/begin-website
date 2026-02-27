'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { Command } from 'cmdk';
import { Search, Clock, X } from 'lucide-react';
import { commands, searchCommands, getCommandsByGroup, groupLabels, Command as CommandType } from './commands';
import { CommandItem } from './CommandItem';

const RECENT_SEARCHES_KEY = 'begin-terminal-recent-searches';
const MAX_RECENT_SEARCHES = 5;

interface CommandBarProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const CommandBar = ({ open: controlledOpen, onOpenChange }: CommandBarProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const open = controlledOpen ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  // Load recent searches from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (stored) {
      try {
        setRecentSearches(JSON.parse(stored));
      } catch {
        setRecentSearches([]);
      }
    }
  }, []);

  // Save recent search
  const saveRecentSearch = useCallback((query: string) => {
    if (!query.trim()) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== query.toLowerCase());
      const updated = [query, ...filtered].slice(0, MAX_RECENT_SEARCHES);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Clear a specific recent search
  const clearRecentSearch = useCallback((searchToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setRecentSearches((prev) => {
      const updated = prev.filter((s) => s !== searchToRemove);
      localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd+K or Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
      // / key (when not typing in an input)
      if (e.key === '/' && !open) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA' && !target.isContentEditable) {
          e.preventDefault();
          setOpen(true);
        }
      }
      // Escape to close
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, setOpen]);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setSearch('');
    }
  }, [open]);

  // Handle command selection
  const handleSelect = useCallback((command: CommandType) => {
    saveRecentSearch(command.label);
    command.action();
    setOpen(false);
  }, [saveRecentSearch, setOpen]);

  // Handle recent search selection
  const handleRecentSelect = useCallback((query: string) => {
    setSearch(query);
  }, []);

  // Get filtered commands
  const filteredCommands = search ? searchCommands(search) : commands;

  // Group filtered commands
  const tokenCommands = filteredCommands.filter((c) => c.group === 'tokens');
  const actionCommands = filteredCommands.filter((c) => c.group === 'commands');
  const navCommands = filteredCommands.filter((c) => c.group === 'navigation');

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Command palette */}
      <div className="absolute left-1/2 top-[20%] -translate-x-1/2 w-full max-w-[640px] px-4">
        <Command
          className="rounded-xl border border-[#333] bg-[#1a1a1a] shadow-2xl overflow-hidden"
          loop
        >
          {/* Search input */}
          <div className="flex items-center gap-3 px-4 border-b border-[#333]">
            <Search size={18} className="text-gray-500 flex-shrink-0" />
            <Command.Input
              ref={inputRef}
              value={search}
              onValueChange={setSearch}
              placeholder="Search tokens, commands..."
              className="flex-1 h-14 bg-transparent font-mono text-sm text-white
                         placeholder:text-gray-600 outline-none"
            />
            <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-[10px] font-mono
                           rounded border border-[#333] bg-[#252525] text-gray-500">
              ESC
            </kbd>
          </div>

          {/* Command list */}
          <Command.List className="max-h-[400px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
            <Command.Empty className="py-8 text-center text-sm text-gray-500">
              No results found.
            </Command.Empty>

            {/* Recent searches (only when no search query) */}
            {!search && recentSearches.length > 0 && (
              <Command.Group
                heading={
                  <div className="flex items-center gap-2 px-3 py-2 text-xs font-mono text-gray-500 uppercase tracking-wider">
                    <Clock size={12} />
                    Recent
                  </div>
                }
              >
                {recentSearches.map((recentSearch) => (
                  <Command.Item
                    key={recentSearch}
                    value={`recent-${recentSearch}`}
                    onSelect={() => handleRecentSelect(recentSearch)}
                    className="flex items-center gap-3 px-3 py-2 mx-1 cursor-pointer rounded-md
                               text-gray-400
                               data-[selected=true]:bg-[#00E5FF]/10
                               data-[selected=true]:text-white
                               hover:bg-[#00E5FF]/5
                               transition-colors duration-100"
                  >
                    <Clock size={14} className="text-gray-600" />
                    <span className="flex-1 font-mono text-sm">{recentSearch}</span>
                    <button
                      onClick={(e) => clearRecentSearch(recentSearch, e)}
                      className="p-1 rounded hover:bg-[#333] text-gray-600 hover:text-gray-400 transition-colors"
                    >
                      <X size={12} />
                    </button>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {/* Tokens */}
            {tokenCommands.length > 0 && (
              <Command.Group
                heading={
                  <div className="px-3 py-2 text-xs font-mono text-gray-500 uppercase tracking-wider">
                    {groupLabels.tokens}
                  </div>
                }
              >
                {tokenCommands.map((cmd) => (
                  <CommandItem
                    key={cmd.id}
                    command={cmd}
                    onSelect={() => handleSelect(cmd)}
                  />
                ))}
              </Command.Group>
            )}

            {/* Commands */}
            {actionCommands.length > 0 && (
              <Command.Group
                heading={
                  <div className="px-3 py-2 text-xs font-mono text-gray-500 uppercase tracking-wider">
                    {groupLabels.commands}
                  </div>
                }
              >
                {actionCommands.map((cmd) => (
                  <CommandItem
                    key={cmd.id}
                    command={cmd}
                    onSelect={() => handleSelect(cmd)}
                  />
                ))}
              </Command.Group>
            )}

            {/* Navigation */}
            {navCommands.length > 0 && (
              <Command.Group
                heading={
                  <div className="px-3 py-2 text-xs font-mono text-gray-500 uppercase tracking-wider">
                    {groupLabels.navigation}
                  </div>
                }
              >
                {navCommands.map((cmd) => (
                  <CommandItem
                    key={cmd.id}
                    command={cmd}
                    onSelect={() => handleSelect(cmd)}
                  />
                ))}
              </Command.Group>
            )}
          </Command.List>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#333] text-[10px] font-mono text-gray-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-[#333] bg-[#252525]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded border border-[#333] bg-[#252525]">↓</kbd>
                <span className="ml-1">Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded border border-[#333] bg-[#252525]">↵</kbd>
                <span className="ml-1">Select</span>
              </span>
            </div>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded border border-[#333] bg-[#252525]">⌘</kbd>
              <kbd className="px-1.5 py-0.5 rounded border border-[#333] bg-[#252525]">K</kbd>
              <span className="ml-1">Toggle</span>
            </span>
          </div>
        </Command>
      </div>
    </div>
  );
};

export default CommandBar;
