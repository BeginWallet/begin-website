'use client';

import { useState, useCallback, useMemo } from 'react';
import { ChainBadge } from '../Shared/ChainBadge';
import { formatPrice, formatChange } from '@/services/terminal/prices';
import type { HoldingData } from '@/hooks/terminal/usePortfolio';

type SortField = 'token' | 'amount' | 'valueUsd' | 'change24h';
type SortDir = 'asc' | 'desc';

function SortArrow({ field, sortField, sortDir }: { field: SortField; sortField: SortField; sortDir: SortDir }) {
  if (field !== sortField) return <span className="text-[#444] ml-0.5">▼</span>;
  return <span className="text-[#00E5FF] ml-0.5">{sortDir === 'asc' ? '▲' : '▼'}</span>;
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 4 }).map((_, i) => (
        <tr key={i} className="border-b border-[#252525] animate-pulse">
          <td className="py-1 px-2"><div className="h-3 w-14 bg-[#252525] rounded" /></td>
          <td className="py-1 px-2 text-right"><div className="h-3 w-16 bg-[#252525] rounded ml-auto" /></td>
          <td className="py-1 px-2 text-right"><div className="h-3 w-18 bg-[#252525] rounded ml-auto" /></td>
          <td className="py-1 px-2 text-right"><div className="h-3 w-12 bg-[#252525] rounded ml-auto" /></td>
        </tr>
      ))}
    </>
  );
}

interface HoldingsProps {
  holdings: HoldingData[];
  isLoading: boolean;
}

export function Holdings({ holdings, isLoading }: HoldingsProps) {
  const [sortField, setSortField] = useState<SortField>('valueUsd');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortField(field);
        setSortDir(field === 'token' ? 'asc' : 'desc');
      }
    },
    [sortField]
  );

  const sorted = useMemo(() => {
    return [...holdings].sort((a, b) => {
      let cmp: number;
      switch (sortField) {
        case 'token':
          cmp = a.token.localeCompare(b.token);
          break;
        case 'amount':
          cmp = a.amount - b.amount;
          break;
        case 'valueUsd':
          cmp = a.valueUsd - b.valueUsd;
          break;
        case 'change24h':
          cmp = a.change24h - b.change24h;
          break;
        default:
          cmp = 0;
      }
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [holdings, sortField, sortDir]);

  const thBase =
    'py-1 px-2 text-[10px] font-mono font-normal text-[#666] uppercase tracking-wider cursor-pointer select-none hover:text-[#999] transition-colors whitespace-nowrap';

  return (
    <div className="flex flex-col h-full">
      <div className="px-2 py-1 border-b border-[#333]">
        <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">
          Holdings
        </span>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-[#333] scrollbar-track-transparent">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 bg-[#1a1a1a] z-10">
            <tr className="border-b border-[#333]">
              <th className={`${thBase} text-left`} onClick={() => handleSort('token')}>
                Token <SortArrow field="token" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thBase} text-right`} onClick={() => handleSort('amount')}>
                Amount <SortArrow field="amount" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thBase} text-right`} onClick={() => handleSort('valueUsd')}>
                Value <SortArrow field="valueUsd" sortField={sortField} sortDir={sortDir} />
              </th>
              <th className={`${thBase} text-right`} onClick={() => handleSort('change24h')}>
                24h <SortArrow field="change24h" sortField={sortField} sortDir={sortDir} />
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <SkeletonRows />
            ) : sorted.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-6 text-[10px] text-[#555] font-mono">
                  No holdings found
                </td>
              </tr>
            ) : (
              sorted.map((h) => {
                const changeColor =
                  h.change24h === 0
                    ? 'text-[#999]'
                    : h.change24h > 0
                      ? 'text-[#00FF88]'
                      : 'text-[#FF4444]';

                return (
                  <tr
                    key={`${h.chain}-${h.token}`}
                    className="border-b border-[#252525] hover:bg-[#222] transition-colors duration-75"
                  >
                    <td className="py-1 px-2">
                      <span className="inline-flex items-center gap-1.5">
                        <ChainBadge chain={h.chain} size="sm" />
                        <span className="font-mono text-xs text-white font-medium">
                          {h.token}
                        </span>
                      </span>
                    </td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-[#999] tabular-nums">
                      {h.amount < 0.001
                        ? h.amount.toExponential(2)
                        : h.amount < 1
                          ? h.amount.toFixed(6)
                          : h.amount < 1000
                            ? h.amount.toFixed(4)
                            : h.amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </td>
                    <td className="py-1 px-2 text-right font-mono text-xs text-white tabular-nums">
                      {formatPrice(h.valueUsd)}
                    </td>
                    <td className={`py-1 px-2 text-right font-mono text-xs tabular-nums ${changeColor}`}>
                      {formatChange(h.change24h)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
