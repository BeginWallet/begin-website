'use client';

import { useState, useMemo } from 'react';
import { usePerps, type OrderSide } from '../../../hooks/terminal/usePerps';
import { useWallet } from '../../../hooks/terminal/useWallet';
import { formatPerpPrice, formatFunding } from '../../../services/terminal/perps';

// ── Popular markets shown at top of selector ──────────────────────────
const POPULAR_COINS = ['BTC', 'ETH', 'SOL', 'ARB', 'DOGE', 'AVAX', 'MATIC', 'OP', 'APT', 'SUI'];

// ── Market Selector Dropdown ──────────────────────────────────────────
function MarketSelector({
  selectedCoin,
  markets,
  midPrices,
  onSelect,
}: {
  selectedCoin: string;
  markets: { coin: string }[];
  midPrices: Record<string, number>;
  onSelect: (coin: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toUpperCase();
    const list = markets.filter((m) => m.coin.includes(q));
    if (!search) {
      const popular = list.filter((m) => POPULAR_COINS.includes(m.coin));
      const rest = list.filter((m) => !POPULAR_COINS.includes(m.coin));
      return [...popular, ...rest];
    }
    return list;
  }, [markets, search]);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 rounded text-sm font-mono font-medium transition-colors"
        style={{ backgroundColor: '#252525', color: '#fff', border: '1px solid #333' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#555'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; }}
      >
        <span>{selectedCoin}-PERP</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="#999">
          <path d="M2 4l3 3 3-3" stroke="#999" strokeWidth="1.2" fill="none" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 w-56 rounded border overflow-hidden"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
        >
          <div className="px-2 py-1.5 border-b" style={{ borderColor: '#333' }}>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search markets..."
              className="w-full bg-transparent outline-none text-xs font-mono"
              style={{ color: '#fff' }}
              autoFocus
            />
          </div>
          <div className="max-h-48 overflow-y-auto">
            {filtered.map((m) => (
              <button
                key={m.coin}
                onClick={() => { onSelect(m.coin); setOpen(false); setSearch(''); }}
                className="w-full text-left px-3 py-1.5 text-xs font-mono flex justify-between items-center transition-colors"
                style={{
                  color: selectedCoin === m.coin ? '#00E5FF' : '#ccc',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#252525'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span className="font-medium">{m.coin}-PERP</span>
                <span style={{ color: '#666' }}>
                  {midPrices[m.coin] ? formatPerpPrice(midPrices[m.coin]) : '—'}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Order Book Visualization ──────────────────────────────────────────
function OrderBookViz({
  orderBook,
  maxRows,
}: {
  orderBook: { bids: { price: number; size: number }[]; asks: { price: number; size: number }[] } | null;
  maxRows: number;
}) {
  if (!orderBook) {
    return (
      <div className="flex items-center justify-center py-4" style={{ color: '#444' }}>
        <span className="text-xs font-mono">Loading order book...</span>
      </div>
    );
  }

  const asks = orderBook.asks.slice(0, maxRows).reverse();
  const bids = orderBook.bids.slice(0, maxRows);
  const maxSize = Math.max(
    ...asks.map((l) => l.size),
    ...bids.map((l) => l.size),
    1,
  );

  return (
    <div className="text-[10px] font-mono">
      {/* Header */}
      <div className="flex justify-between px-2 py-0.5" style={{ color: '#666' }}>
        <span>Price</span>
        <span>Size</span>
      </div>

      {/* Asks (red) */}
      {asks.map((level, i) => (
        <div key={`a-${i}`} className="relative flex justify-between px-2 py-px">
          <div
            className="absolute inset-y-0 right-0 opacity-15"
            style={{
              backgroundColor: '#FF4444',
              width: `${(level.size / maxSize) * 100}%`,
            }}
          />
          <span className="relative" style={{ color: '#FF4444' }}>{formatPerpPrice(level.price)}</span>
          <span className="relative" style={{ color: '#ccc' }}>{level.size.toFixed(4)}</span>
        </div>
      ))}

      {/* Spread */}
      {bids.length > 0 && asks.length > 0 && (
        <div className="flex justify-center px-2 py-0.5 border-y" style={{ borderColor: '#252525' }}>
          <span style={{ color: '#666' }}>
            Spread: {formatPerpPrice(orderBook.asks[0].price - orderBook.bids[0].price)}
          </span>
        </div>
      )}

      {/* Bids (green) */}
      {bids.map((level, i) => (
        <div key={`b-${i}`} className="relative flex justify-between px-2 py-px">
          <div
            className="absolute inset-y-0 right-0 opacity-15"
            style={{
              backgroundColor: '#00FF88',
              width: `${(level.size / maxSize) * 100}%`,
            }}
          />
          <span className="relative" style={{ color: '#00FF88' }}>{formatPerpPrice(level.price)}</span>
          <span className="relative" style={{ color: '#ccc' }}>{level.size.toFixed(4)}</span>
        </div>
      ))}
    </div>
  );
}

// ── Positions Table ───────────────────────────────────────────────────
function PositionsTable({ positions }: { positions: { coin: string; side: 'long' | 'short'; size: number; entryPrice: number; markPrice: number; leverage: number; unrealizedPnl: number; liquidationPrice: number | null }[] }) {
  if (positions.length === 0) {
    return (
      <div className="flex items-center justify-center py-3" style={{ color: '#444' }}>
        <span className="text-[10px] font-mono">No open positions</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-[10px] font-mono">
        <thead>
          <tr style={{ color: '#666' }}>
            <th className="text-left px-2 py-1 font-normal">Market</th>
            <th className="text-right px-2 py-1 font-normal">Size</th>
            <th className="text-right px-2 py-1 font-normal">Entry</th>
            <th className="text-right px-2 py-1 font-normal">Mark</th>
            <th className="text-right px-2 py-1 font-normal">PnL</th>
            <th className="text-right px-2 py-1 font-normal">Liq</th>
          </tr>
        </thead>
        <tbody>
          {positions.map((pos) => (
            <tr key={pos.coin} className="border-t" style={{ borderColor: '#252525' }}>
              <td className="px-2 py-1">
                <span style={{ color: pos.side === 'long' ? '#00FF88' : '#FF4444' }}>
                  {pos.coin} {pos.leverage}x {pos.side.toUpperCase()}
                </span>
              </td>
              <td className="text-right px-2 py-1" style={{ color: '#ccc' }}>
                {pos.size.toFixed(4)}
              </td>
              <td className="text-right px-2 py-1" style={{ color: '#ccc' }}>
                {formatPerpPrice(pos.entryPrice)}
              </td>
              <td className="text-right px-2 py-1" style={{ color: '#ccc' }}>
                {formatPerpPrice(pos.markPrice)}
              </td>
              <td className="text-right px-2 py-1" style={{ color: pos.unrealizedPnl >= 0 ? '#00FF88' : '#FF4444' }}>
                {pos.unrealizedPnl >= 0 ? '+' : ''}{pos.unrealizedPnl.toFixed(2)}
              </td>
              <td className="text-right px-2 py-1" style={{ color: '#F7931A' }}>
                {pos.liquidationPrice ? formatPerpPrice(pos.liquidationPrice) : '—'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ── Leverage Slider ───────────────────────────────────────────────────
const LEVERAGE_PRESETS = [1, 2, 5, 10, 25, 50];

function LeverageControl({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] tracking-wider uppercase" style={{ color: '#666' }}>Leverage</span>
        <span className="text-xs font-mono font-medium" style={{ color: '#fff' }}>{value}x</span>
      </div>
      <input
        type="range"
        min={1}
        max={50}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value, 10))}
        className="w-full h-1 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #00E5FF 0%, #00E5FF ${((value - 1) / 49) * 100}%, #333 ${((value - 1) / 49) * 100}%, #333 100%)`,
        }}
      />
      <div className="flex justify-between mt-1 gap-1">
        {LEVERAGE_PRESETS.map((lev) => (
          <button
            key={lev}
            onClick={() => onChange(lev)}
            className="flex-1 py-0.5 text-[10px] font-mono rounded transition-colors"
            style={{
              backgroundColor: value === lev ? '#00E5FF' : '#252525',
              color: value === lev ? '#000' : '#666',
            }}
          >
            {lev}x
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main PerpsPanel ───────────────────────────────────────────────────
export function PerpsPanel() {
  const {
    markets,
    selectedCoin,
    midPrices,
    orderBook,
    fundingRates,
    positions,
    side,
    orderType,
    leverage,
    amount,
    limitPrice,
    loading,
    error,
    currentPrice,
    currentFunding,
    positionSize,
    notionalValue,
    setSelectedCoin,
    setSide,
    setOrderType,
    setLeverage,
    setAmount,
    setLimitPrice,
  } = usePerps();

  const { connected, connectWallet, beginDetected } = useWallet();

  const [activeTab, setActiveTab] = useState<'order' | 'book' | 'positions'>('order');

  const sideColor = side === 'long' ? '#00FF88' : '#FF4444';

  return (
    <div className="flex flex-col h-full font-mono text-xs" style={{ color: '#ccc' }}>
      {/* Header: Market selector + Price + Funding */}
      <div className="flex items-center gap-2 px-3 py-1.5 border-b" style={{ borderColor: '#333' }}>
        <MarketSelector
          selectedCoin={selectedCoin}
          markets={markets}
          midPrices={midPrices}
          onSelect={setSelectedCoin}
        />
        <div className="ml-auto flex items-center gap-3">
          {currentPrice > 0 && (
            <span className="text-sm font-medium" style={{ color: '#fff' }}>
              {formatPerpPrice(currentPrice)}
            </span>
          )}
          {currentFunding && (
            <div className="flex items-center gap-1">
              <span className="text-[10px]" style={{ color: '#666' }}>Fund</span>
              <span
                className="text-[10px]"
                style={{ color: currentFunding.funding >= 0 ? '#00FF88' : '#FF4444' }}
              >
                {formatFunding(currentFunding.funding)}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Tabs: Order / Book / Positions */}
      <div className="flex border-b" style={{ borderColor: '#333' }}>
        {(['order', 'book', 'positions'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="flex-1 py-1.5 text-[10px] tracking-wider uppercase transition-colors"
            style={{
              color: activeTab === tab ? '#fff' : '#666',
              borderBottom: activeTab === tab ? `2px solid #00E5FF` : '2px solid transparent',
            }}
          >
            {tab === 'book' ? 'Order Book' : tab === 'positions' ? `Positions (${positions.length})` : 'Order'}
          </button>
        ))}
      </div>

      {/* Error banner */}
      {error && (
        <div className="px-3 py-1">
          <div className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255,68,68,0.1)', color: '#FF4444' }}>
            {error}
          </div>
        </div>
      )}

      {/* Loading state */}
      {loading && !error && markets.length === 0 && (
        <div className="flex-1 flex items-center justify-center">
          <span className="text-xs animate-pulse" style={{ color: '#666' }}>Loading markets...</span>
        </div>
      )}

      {/* ── Order Tab ─────────────────────────────────────────────── */}
      {activeTab === 'order' && (
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Long / Short toggle */}
          <div className="flex gap-1 px-3 pt-2 pb-1">
            {(['long', 'short'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSide(s)}
                className="flex-1 py-1.5 rounded text-xs font-medium transition-colors"
                style={{
                  backgroundColor: side === s ? (s === 'long' ? '#00FF88' : '#FF4444') : '#252525',
                  color: side === s ? '#000' : '#666',
                }}
              >
                {s.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Market / Limit toggle */}
          <div className="flex gap-1 px-3 pb-1.5">
            {(['market', 'limit'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setOrderType(t)}
                className="flex-1 py-1 rounded text-[10px] tracking-wider uppercase transition-colors"
                style={{
                  backgroundColor: orderType === t ? '#333' : 'transparent',
                  color: orderType === t ? '#fff' : '#666',
                }}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Leverage slider */}
          <div className="px-3 pb-2">
            <LeverageControl value={leverage} onChange={setLeverage} />
          </div>

          {/* Limit price input (limit orders only) */}
          {orderType === 'limit' && (
            <div className="px-3 pb-1.5">
              <span className="text-[10px] tracking-wider uppercase mb-1 block" style={{ color: '#666' }}>
                Limit Price
              </span>
              <div
                className="flex items-center rounded px-2 py-1.5 border"
                style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
              >
                <input
                  type="text"
                  value={limitPrice}
                  onChange={(e) => setLimitPrice(e.target.value)}
                  placeholder={currentPrice > 0 ? formatPerpPrice(currentPrice) : '0.00'}
                  className="flex-1 bg-transparent outline-none text-sm font-mono"
                  style={{ color: '#fff' }}
                />
                <span className="text-[10px] ml-1" style={{ color: '#666' }}>USD</span>
              </div>
            </div>
          )}

          {/* Amount input */}
          <div className="px-3 pb-1.5">
            <span className="text-[10px] tracking-wider uppercase mb-1 block" style={{ color: '#666' }}>
              Amount (USDC)
            </span>
            <div
              className="flex items-center rounded px-2 py-1.5 border"
              style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
            >
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="flex-1 bg-transparent outline-none text-sm font-mono"
                style={{ color: '#fff' }}
              />
              <span className="text-[10px] ml-1" style={{ color: '#666' }}>USDC</span>
            </div>
          </div>

          {/* Position size info */}
          {parseFloat(amount) > 0 && currentPrice > 0 && (
            <div className="px-3 pb-2">
              <div className="rounded p-2 space-y-1" style={{ backgroundColor: '#1a1a1a', border: '1px solid #252525' }}>
                <div className="flex justify-between">
                  <span style={{ color: '#666' }}>Position Size</span>
                  <span style={{ color: '#ccc' }}>
                    {positionSize.toFixed(4)} {selectedCoin}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#666' }}>Notional Value</span>
                  <span style={{ color: '#ccc' }}>
                    ${notionalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#666' }}>Leverage</span>
                  <span style={{ color: '#00E5FF' }}>{leverage}x</span>
                </div>
                {currentFunding && (
                  <div className="flex justify-between">
                    <span style={{ color: '#666' }}>Funding (1h)</span>
                    <span style={{ color: currentFunding.funding >= 0 ? '#00FF88' : '#FF4444' }}>
                      {formatFunding(currentFunding.funding)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Execute / Connect button */}
          <div className="px-3 pb-3">
            {!connected ? (
              <button
                onClick={connectWallet}
                className="w-full py-2 rounded text-sm font-medium transition-colors"
                style={{
                  backgroundColor: 'transparent',
                  color: '#00E5FF',
                  border: '1px solid #00E5FF',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                {beginDetected ? 'Connect Wallet' : 'Install Begin Wallet'}
              </button>
            ) : (
              <button
                disabled={!amount || parseFloat(amount) <= 0}
                className="w-full py-2 rounded text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: sideColor,
                  color: '#000',
                }}
                onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) e.currentTarget.style.opacity = '0.85';
                }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                {side === 'long' ? 'Long' : 'Short'} {selectedCoin} {leverage}x
              </button>
            )}
          </div>
        </div>
      )}

      {/* ── Order Book Tab ────────────────────────────────────────── */}
      {activeTab === 'book' && (
        <div className="flex-1 overflow-y-auto">
          <OrderBookViz orderBook={orderBook} maxRows={10} />
        </div>
      )}

      {/* ── Positions Tab ─────────────────────────────────────────── */}
      {activeTab === 'positions' && (
        <div className="flex-1 overflow-y-auto">
          <PositionsTable positions={positions} />
        </div>
      )}
    </div>
  );
}
