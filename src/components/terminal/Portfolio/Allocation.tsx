'use client';

import { useMemo } from 'react';
import type { HoldingData } from '@/hooks/terminal/usePortfolio';
import type { ChainId } from '@/types/terminal';

const ALLOC_COLORS: string[] = [
  '#00E5FF',
  '#00FF88',
  '#F7931A',
  '#9945FF',
  '#627EEA',
  '#666',
];

interface AllocationProps {
  holdings: HoldingData[];
  totalValue: number;
}

interface AllocSlice {
  label: string;
  chain: ChainId;
  percent: number;
  color: string;
}

export function Allocation({ holdings, totalValue }: AllocationProps) {
  const slices = useMemo((): AllocSlice[] => {
    if (totalValue === 0 || holdings.length === 0) return [];

    const sorted = [...holdings].sort((a, b) => b.valueUsd - a.valueUsd);
    const top5 = sorted.slice(0, 5);
    const otherValue = sorted.slice(5).reduce((s, h) => s + h.valueUsd, 0);

    const result: AllocSlice[] = top5.map((h, i) => ({
      label: h.token,
      chain: h.chain,
      percent: (h.valueUsd / totalValue) * 100,
      color: ALLOC_COLORS[i],
    }));

    if (otherValue > 0) {
      result.push({
        label: 'Other',
        chain: 'ethereum',
        percent: (otherValue / totalValue) * 100,
        color: ALLOC_COLORS[5],
      });
    }

    return result;
  }, [holdings, totalValue]);

  if (slices.length === 0) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-2 py-1 border-b border-[#333]">
          <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">
            Allocation
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center text-[10px] text-[#555] font-mono">
          No data
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="px-2 py-1 border-b border-[#333]">
        <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">
          Allocation
        </span>
      </div>
      <div className="flex-1 px-2 py-2 flex flex-col gap-2 justify-center">
        {/* Bar */}
        <div className="flex h-3 rounded-sm overflow-hidden gap-px">
          {slices.map((s) => (
            <div
              key={s.label}
              className="h-full transition-all duration-300"
              style={{
                width: `${Math.max(s.percent, 1)}%`,
                backgroundColor: s.color,
              }}
              title={`${s.label}: ${s.percent.toFixed(1)}%`}
            />
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-x-3 gap-y-0.5">
          {slices.map((s) => (
            <div key={s.label} className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ backgroundColor: s.color }}
              />
              <span className="font-mono text-[10px] text-[#999]">
                {s.label}
              </span>
              <span className="font-mono text-[10px] text-[#555]">
                {s.percent.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
