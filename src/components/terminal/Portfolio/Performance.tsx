'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import {
  createChart,
  AreaSeries,
  type IChartApi,
  type ISeriesApi,
  ColorType,
  CrosshairMode,
} from 'lightweight-charts';

type TimeRange = '24h' | '7d' | '30d';

const RANGE_CONFIG: Record<TimeRange, { points: number; intervalMs: number; label: string }> = {
  '24h': { points: 96, intervalMs: 15 * 60 * 1000, label: '24H' },
  '7d': { points: 168, intervalMs: 60 * 60 * 1000, label: '7D' },
  '30d': { points: 120, intervalMs: 6 * 60 * 60 * 1000, label: '30D' },
};

interface PerformanceProps {
  totalValue: number;
  change24hPercent: number;
}

function generateHistoricalData(
  currentValue: number,
  changePercent: number,
  range: TimeRange
): { time: number; value: number }[] {
  const { points, intervalMs } = RANGE_CONFIG[range];
  const now = Date.now();
  const startTime = now - points * intervalMs;

  // Work backward from current value using change %
  const rangeMultiplier = range === '24h' ? 1 : range === '7d' ? 2.5 : 5;
  const totalChange = (changePercent / 100) * rangeMultiplier;
  const startValue = currentValue / (1 + totalChange);

  const data: { time: number; value: number }[] = [];
  for (let i = 0; i <= points; i++) {
    const progress = i / points;
    // Smooth curve with some noise
    const trend = startValue + (currentValue - startValue) * progress;
    const noise = trend * (Math.sin(i * 0.7) * 0.008 + Math.cos(i * 1.3) * 0.005);
    const time = Math.floor((startTime + i * intervalMs) / 1000);
    data.push({ time, value: Math.max(0, trend + noise) });
  }

  return data;
}

export function Performance({ totalValue, change24hPercent }: PerformanceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Area'> | null>(null);
  const [range, setRange] = useState<TimeRange>('24h');

  // Create chart
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#1a1a1a' },
        textColor: '#666',
        fontSize: 10,
      },
      grid: {
        vertLines: { color: '#252525' },
        horzLines: { color: '#252525' },
      },
      crosshair: {
        mode: CrosshairMode.Magnet,
        vertLine: { color: '#00E5FF', width: 1, style: 2, labelBackgroundColor: '#00E5FF' },
        horzLine: { color: '#00E5FF', width: 1, style: 2, labelBackgroundColor: '#00E5FF' },
      },
      rightPriceScale: {
        borderColor: '#333',
        scaleMargins: { top: 0.1, bottom: 0.05 },
      },
      timeScale: {
        borderColor: '#333',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: true,
      handleScale: true,
    });

    const isPositive = change24hPercent >= 0;
    const lineColor = isPositive ? '#00FF88' : '#FF4444';
    const areaTop = isPositive ? 'rgba(0,255,136,0.15)' : 'rgba(255,68,68,0.15)';
    const areaBottom = 'rgba(0,0,0,0)';

    const series = chart.addSeries(AreaSeries, {
      lineColor,
      topColor: areaTop,
      bottomColor: areaBottom,
      lineWidth: 2,
      priceFormat: {
        type: 'custom',
        formatter: (price: number) => {
          if (price >= 1000) return `$${(price / 1000).toFixed(1)}K`;
          return `$${price.toFixed(2)}`;
        },
      },
    });

    chartRef.current = chart;
    seriesRef.current = series;

    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      seriesRef.current = null;
    };
  }, []);

  // Update data when range or value changes
  useEffect(() => {
    if (!seriesRef.current || !chartRef.current) return;
    if (totalValue <= 0) return;

    const data = generateHistoricalData(totalValue, change24hPercent, range);
    const chartData = data.map((d) => ({
      time: d.time as import('lightweight-charts').UTCTimestamp,
      value: d.value,
    }));

    seriesRef.current.setData(chartData);
    chartRef.current.timeScale().fitContent();
  }, [totalValue, change24hPercent, range]);

  // Update colors when change direction changes
  useEffect(() => {
    if (!seriesRef.current) return;

    const isPositive = change24hPercent >= 0;
    const lineColor = isPositive ? '#00FF88' : '#FF4444';
    const areaTop = isPositive ? 'rgba(0,255,136,0.15)' : 'rgba(255,68,68,0.15)';

    seriesRef.current.applyOptions({
      lineColor,
      topColor: areaTop,
    });
  }, [change24hPercent]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-2 py-1 border-b border-[#333]">
        <span className="font-mono text-[10px] text-[#666] uppercase tracking-wider">
          Performance
        </span>
        <div className="flex items-center gap-0.5">
          {(Object.keys(RANGE_CONFIG) as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`px-1.5 py-0.5 text-[10px] font-mono rounded transition-colors ${
                r === range
                  ? 'bg-[#00E5FF] text-black font-semibold'
                  : 'text-[#666] hover:text-[#999] hover:bg-[#252525]'
              }`}
            >
              {RANGE_CONFIG[r].label}
            </button>
          ))}
        </div>
      </div>
      <div className="relative flex-1 min-h-0">
        <div ref={containerRef} className="absolute inset-0" />
        {totalValue <= 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1a1a1a]/80">
            <span className="text-[10px] text-[#555] font-mono">No portfolio data</span>
          </div>
        )}
      </div>
    </div>
  );
}
