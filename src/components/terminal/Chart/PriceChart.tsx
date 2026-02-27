'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickSeriesPartialOptions,
  type HistogramSeriesPartialOptions,
  ColorType,
  CrosshairMode,
} from 'lightweight-charts';
import { useChart } from '../../../hooks/terminal/useChart';
import type { Timeframe } from '../../../services/terminal/charts';

interface PriceChartProps {
  tokenId: string;
  initialTimeframe?: Timeframe;
}

const TIMEFRAMES: Timeframe[] = ['1m', '5m', '15m', '1h', '4h', '1D', '1W'];

export default function PriceChart({
  tokenId,
  initialTimeframe = '1h',
}: PriceChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candleSeriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
  const volumeSeriesRef = useRef<ISeriesApi<'Histogram'> | null>(null);

  const [timeframe, setTimeframe] = useState<Timeframe>(initialTimeframe);
  const symbol = tokenId.toUpperCase();
  const { data, isLoading, error } = useChart(symbol, timeframe);

  // Create chart once on mount
  useEffect(() => {
    if (!containerRef.current) return;

    const chart = createChart(containerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: '#141414' },
        textColor: '#999',
        fontSize: 11,
      },
      grid: {
        vertLines: { color: '#333' },
        horzLines: { color: '#333' },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: { color: '#00E5FF', width: 1, style: 2, labelBackgroundColor: '#00E5FF' },
        horzLine: { color: '#00E5FF', width: 1, style: 2, labelBackgroundColor: '#00E5FF' },
      },
      rightPriceScale: {
        borderColor: '#333',
        scaleMargins: { top: 0.1, bottom: 0.25 },
      },
      timeScale: {
        borderColor: '#333',
        timeVisible: true,
        secondsVisible: false,
      },
      handleScroll: true,
      handleScale: true,
    });

    const candleOpts: CandlestickSeriesPartialOptions = {
      upColor: '#00FF88',
      downColor: '#FF4444',
      borderUpColor: '#00FF88',
      borderDownColor: '#FF4444',
      wickUpColor: '#00FF88',
      wickDownColor: '#FF4444',
    };

    const volumeOpts: HistogramSeriesPartialOptions = {
      priceFormat: { type: 'volume' },
      priceScaleId: '',
    };

    const candleSeries = chart.addSeries(CandlestickSeries, candleOpts);
    const volumeSeries = chart.addSeries(HistogramSeries, volumeOpts);

    volumeSeries.priceScale().applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    chartRef.current = chart;
    candleSeriesRef.current = candleSeries;
    volumeSeriesRef.current = volumeSeries;

    // Resize observer
    const resizeObserver = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      chart.applyOptions({ width, height });
    });
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
      chart.remove();
      chartRef.current = null;
      candleSeriesRef.current = null;
      volumeSeriesRef.current = null;
    };
  }, []);

  // Update data when it changes
  useEffect(() => {
    if (!data || !candleSeriesRef.current || !volumeSeriesRef.current) return;

    const candles = data.map((d) => ({
      time: d.time as import('lightweight-charts').UTCTimestamp,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    const volumes = data.map((d) => ({
      time: d.time as import('lightweight-charts').UTCTimestamp,
      value: d.volume,
      color: d.close >= d.open ? 'rgba(0,255,136,0.3)' : 'rgba(255,68,68,0.3)',
    }));

    candleSeriesRef.current.setData(candles);
    volumeSeriesRef.current.setData(volumes);
    chartRef.current?.timeScale().fitContent();
  }, [data]);

  // Last candle info for header
  const lastCandle = useMemo(() => {
    if (!data || data.length === 0) return null;
    return data[data.length - 1];
  }, [data]);

  const priceChange = lastCandle
    ? ((lastCandle.close - lastCandle.open) / lastCandle.open) * 100
    : 0;

  return (
    <div className="flex flex-col h-full w-full bg-[#141414]">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-[#333]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-white">
            {symbol}/USDT
          </span>
          {lastCandle && (
            <>
              <span className="text-xs font-mono text-[#ccc]">
                {lastCandle.close.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <span
                className={`text-xs font-mono ${
                  priceChange >= 0 ? 'text-[#00FF88]' : 'text-[#FF4444]'
                }`}
              >
                {priceChange >= 0 ? '+' : ''}
                {priceChange.toFixed(2)}%
              </span>
            </>
          )}
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-0.5">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-2 py-0.5 text-xs rounded transition-colors ${
                tf === timeframe
                  ? 'bg-[#00E5FF] text-black font-semibold'
                  : 'text-[#999] hover:text-white hover:bg-[#252525]'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Chart container */}
      <div className="relative flex-1 min-h-0">
        <div ref={containerRef} className="absolute inset-0" />

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#141414]/80">
            <span className="text-xs text-[#666]">Loading chart...</span>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#141414]/80">
            <span className="text-xs text-[#FF4444]">
              Failed to load chart data
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
