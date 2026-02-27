'use client';

import { useEffect, useRef } from 'react';
import { createChart, LineSeries, type IChartApi, ColorType } from 'lightweight-charts';

interface MiniChartProps {
  data: number[];
  change24h: number;
  width?: number;
  height?: number;
}

export default function MiniChart({
  data,
  change24h,
  width = 100,
  height = 30,
}: MiniChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current || data.length < 2) return;

    const lineColor = change24h >= 0 ? '#00FF88' : '#FF4444';

    const chart = createChart(containerRef.current, {
      width,
      height,
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: 'transparent',
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false },
      },
      rightPriceScale: { visible: false },
      timeScale: { visible: false },
      handleScroll: false,
      handleScale: false,
      crosshair: {
        vertLine: { visible: false },
        horzLine: { visible: false },
      },
    });

    const series = chart.addSeries(LineSeries, {
      color: lineColor,
      lineWidth: 1,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
    });

    // Map data array to time-value pairs using index as time
    const seriesData = data.map((value, index) => ({
      time: (index + 1) as import('lightweight-charts').UTCTimestamp,
      value,
    }));

    series.setData(seriesData);
    chart.timeScale().fitContent();
    chartRef.current = chart;

    return () => {
      chart.remove();
      chartRef.current = null;
    };
  }, [data, change24h, width, height]);

  if (!data || data.length < 2) {
    return <div style={{ width, height }} />;
  }

  return <div ref={containerRef} style={{ width, height }} />;
}
