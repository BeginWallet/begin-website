'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { usePrices } from '@/hooks/terminal/usePrices';
import { TOP_TOKENS, formatPrice, formatChange, formatVolume } from '@/services/terminal/prices';
import { ChainBadge } from '../Shared/ChainBadge';
import type { PriceData } from '@/types/terminal';

// ── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = 'begin-terminal-watchlist';
const DEFAULT_IDS = ['btc', 'eth', 'ada', 'sol', 'usdc', 'usdt'];

type SortField = 'name' | 'price' | 'change24h' | 'volume24h' | 'marketCap';
type SortDir = 'asc' | 'desc';

// ── Persistence ─────────────────────────────────────────────────────────────

function loadWatchlist(): string[] {
  if (typeof window === 'undefined') return DEFAULT_IDS;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return DEFAULT_IDS;
}

function saveWatchlist(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
  } catch {}
}

// ── Fuzzy match ─────────────────────────────────────────────────────────────

function fuzzyMatch(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  if (t.includes(q)) return true;
  let qi = 0;
  for (let i = 0; i < t.length && qi < q.length; i++) {
    if (t[i] === q[qi]) qi++;
  }
  return qi === q.length;
}

// ── Format market cap ───────────────────────────────────────────────────────

function formatMarketCap(cap: number): string {
  if (cap >= 1_000_000_000_000) return `$${(cap / 1_000_000_000_000).toFixed(2)}T`;
  if (cap >= 1_000_000_000) return `$${(cap / 1_000_000_000).toFixed(1)}B`;
  if (cap >= 1_000_000) return `$${(cap / 1_000_000).toFixed(1)}M`;
  if (cap >= 1_000) return `$${(cap / 1_000).toFixed(1)}K`;
  return `$${cap.toFixed(0)}`;
}

// ── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b border-[#252525] animate-pulse">
      <td className="py-1.5 px-2"><div className="h-3 w-16 bg-[#252525] rounded" /></td>
      <td className="py-1.5 px-2 text-right"><div className="h-3 w-20 bg-[#252525] rounded ml-auto" /></td>
      <td className="py-1.5 px-2 text-right"><div className="h-3 w-14 bg-[#252525] rounded ml-auto" /></td>
      <td className="py-1.5 px-2 text-right"><div className="h-3 w-16 bg-[#252525] rounded ml-auto" /></td>
      <td className="py-1.5 px-2 text-right"><div className="h-3 w-16 bg-[#252525] rounded ml-auto" /></td>
    </tr>
  );
}

function LoadingSkeleton() {
  return (
    <>
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </>
  );
}

// ── Sort header ─────────────────────────────────────────────────────────────

function SortArrow({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (field !== sortField) return <span className="text-[#444] ml-0.5">▼</span>;
  return <span className="text-[#00E5FF] ml-0.5">{sortDir === 'asc' ? '▲' : '▼'}</span>;
}

// ── Add Token Search ────────────────────────────────────────────────────────

function AddTokenSearch({
  watchlistIds,
  onAdd,
  onClose,
}: {
  watchlistIds: string[];
  onAdd: (id: string) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return TOP_TOKENS.filter(
      (t) =>
        !watchlistIds.includes(t.id) &&
        (fuzzyMatch(query, t.symbol) || fuzzyMatch(query, t.name))
    ).slice(0, 5);
  }, [query, watchlistIds]);

  return (
    <div className="border-t border-[#333] bg-[#1a1a1a]">
      <div className="flex items-center px-2 py-1 gap-1">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'Enter' && results.length > 0) {
              onAdd(results[0].id);
              setQuery('');
            }
          }}
          placeholder="Search token…"
          className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-white placeholder-[#555] py-0.5"
        />
        <button
          onClick={onClose}
          className="text-[10px] text-[#555] hover:text-white font-mono px-1"
        >
          ESC
        </button>
      </div>
      {results.length > 0 && (
        <div className="border-t border-[#252525]">
          {results.map((token) => (
            <button
              key={token.id}
              onClick={() => {
                onAdd(token.id);
                setQuery('');
              }}
              className="flex items-center gap-2 w-full px-2 py-1 text-left hover:bg-[#252525] transition-colors duration-75"
            >
              <ChainBadge chain={token.chain} size="sm" />
              <span className="font-mono text-xs text-white">{token.symbol}</span>
              <span className="font-mono text-[10px] text-[#555]">{token.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Watchlist ──────────────────────────────────────────────────────────

export function Watchlist() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>(DEFAULT_IDS);
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [showSearch, setShowSearch] = useState(false);
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);

  // Load persisted watchlist on mount
  useEffect(() => {
    setWatchlistIds(loadWatchlist());
  }, []);

  const { data, isLoading, error, dataUpdatedAt } = usePrices(watchlistIds);

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortField(field);
        setSortDir(field === 'name' ? 'asc' : 'desc');
      }
    },
    [sortField]
  );

  const sortedData = useMemo(() => {
    if (!data) return [];
    return [...data].sort((a, b) => {
      let cmp: number;
      switch (sortField) {
        case 'name':
          cmp = a.symbol.localeCompare(b.symbol);
          break;
        case 'price':
          cmp = a.price - b.price;
          break;
        case 'change24h':
          cmp = a.change24h - b.change24h;
          break;
        case 'volume24h':
          cmp = a.volume24h - b.volume24h;
          break;
        case 'marketCap':
          cmp = a.marketCap - b.marketCap;
          break;
        default:
          cmp = 0;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [data, sortField, sortDir]);

  const addToken = useCallback(
    (id: string) => {
      if (watchlistIds.includes(id)) return;
      const next = [...watchlistIds, id];
      setWatchlistIds(next);
      saveWatchlist(next);
    },
    [watchlistIds]
  );

  const removeToken = useCallback(
    (id: string) => {
      const next = watchlistIds.filter((wid) => wid !== id);
      if (next.length === 0) return; // keep at least one
      setWatchlistIds(next);
      saveWatchlist(next);
    },
    [watchlistIds]
  );

  const handleRowClick = useCallback((token: PriceData) => {
    window.dispatchEvent(
      new CustomEvent('terminal:open-chart', {
        detail: { tokenId: token.id, symbol: token.symbol, name: token.name },
      })
    );
  }, []);

  const lastUpdated = dataUpdatedAt
    ? new Date(dataUpdatedAt).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      })
    : '--:--';

  const thBase = 'py-1 px-2 text-[10px] font-mono font-normal text-[#666] uppercase tracking-wider cursor-pointer select-none hover:text-[#999] transition-colors whitespace-nowrap';

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] border border-[#333] rounded overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-[#333] bg-[#1a1a1a]">
        <span className="font-mono text-xs text-[#00E5FF] uppercase tracking-wider">
          Watchlist
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSearch((s) => !s)}
            className="font-mono text-[10px] text-[#555] hover:text-[#00E5FF] transition-colors px-1"
            title="Add token"
          >
            + ADD
          </button>
          <span className="font-mono text-[10px] text-[#555]">
            UPD {lastUpdated}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        {error ? (
          <div className="flex items-center justify-center h-32 text-xs text-[#FF4444] font-mono">
            Error loading prices
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-[#1a1a1a] z-10">
              <tr className="border-b border-[#333]">
                <th className={`${thBase} text-left`} onClick={() => handleSort('name')}>
                  Name <SortArrow field="name" sortField={sortField} sortDir={sortDir} />
                </th>
                <th className={`${thBase} text-right`} onClick={() => handleSort('price')}>
                  Price <SortArrow field="price" sortField={sortField} sortDir={sortDir} />
                </th>
                <th className={`${thBase} text-right`} onClick={() => handleSort('change24h')}>
                  24h % <SortArrow field="change24h" sortField={sortField} sortDir={sortDir} />
                </th>
                <th className={`${thBase} text-right hidden sm:table-cell`} onClick={() => handleSort('volume24h')}>
                  Volume <SortArrow field="volume24h" sortField={sortField} sortDir={sortDir} />
                </th>
                <th className={`${thBase} text-right hidden md:table-cell`} onClick={() => handleSort('marketCap')}>
                  MCap <SortArrow field="marketCap" sortField={sortField} sortDir={sortDir} />
                </th>
                <th className="w-6" />
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <LoadingSkeleton />
              ) : sortedData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-xs text-[#555] font-mono">
                    No tokens in watchlist
                  </td>
                </tr>
              ) : (
                sortedData.map((token) => {
                  const changeColor =
                    token.change24h === 0
                      ? 'text-[#999]'
                      : token.change24h > 0
                        ? 'text-[#00FF88]'
                        : 'text-[#FF4444]';

                  return (
                    <tr
                      key={token.id}
                      className="border-b border-[#252525] hover:bg-[#222] transition-colors duration-75 cursor-pointer group"
                      onClick={() => handleRowClick(token)}
                      onMouseEnter={() => setHoveredRow(token.id)}
                      onMouseLeave={() => setHoveredRow(null)}
                    >
                      <td className="py-1 px-2">
                        <span className="inline-flex items-center gap-1.5">
                          <ChainBadge chain={token.chain} size="sm" />
                          <span className="font-mono text-xs text-white font-medium">
                            {token.symbol}
                          </span>
                          <span className="font-mono text-[10px] text-[#555] hidden lg:inline">
                            {token.name}
                          </span>
                        </span>
                      </td>
                      <td className="py-1 px-2 text-right font-mono text-xs text-white tabular-nums">
                        {formatPrice(token.price)}
                      </td>
                      <td className={`py-1 px-2 text-right font-mono text-xs tabular-nums ${changeColor}`}>
                        {formatChange(token.change24h)}
                      </td>
                      <td className="py-1 px-2 text-right font-mono text-xs text-[#999] tabular-nums hidden sm:table-cell">
                        {formatVolume(token.volume24h)}
                      </td>
                      <td className="py-1 px-2 text-right font-mono text-xs text-[#999] tabular-nums hidden md:table-cell">
                        {formatMarketCap(token.marketCap)}
                      </td>
                      <td className="py-1 px-1 w-6 text-center">
                        {hoveredRow === token.id && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeToken(token.id);
                            }}
                            className="text-[10px] text-[#555] hover:text-[#FF4444] font-mono leading-none transition-colors"
                            title="Remove from watchlist"
                          >
                            ✕
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add token search */}
      {showSearch && (
        <AddTokenSearch
          watchlistIds={watchlistIds}
          onAdd={addToken}
          onClose={() => setShowSearch(false)}
        />
      )}
    </div>
  );
}
