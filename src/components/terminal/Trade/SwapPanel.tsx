'use client';

import { useState } from 'react';
import { useSwap, type SwapToken } from '../../../hooks/terminal/useSwap';
import { useWallet } from '../../../hooks/terminal/useWallet';

// ── Token Selector Dropdown ────────────────────────────────────────────
function TokenSelector({
  selected,
  tokens,
  onSelect,
  label,
}: {
  selected: SwapToken | null;
  tokens: SwapToken[];
  onSelect: (t: SwapToken) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 rounded text-sm font-mono transition-colors"
        style={{ backgroundColor: '#252525', color: '#fff', border: '1px solid #333' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#555'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; }}
      >
        <span>{selected?.symbol ?? label}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="#999">
          <path d="M2 4l3 3 3-3" stroke="#999" strokeWidth="1.2" fill="none" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 w-40 rounded border overflow-hidden"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
        >
          {tokens.map((t) => (
            <button
              key={t.id}
              onClick={() => { onSelect(t); setOpen(false); }}
              className="w-full text-left px-3 py-1.5 text-xs font-mono flex justify-between items-center transition-colors"
              style={{
                color: selected?.id === t.id ? '#00E5FF' : '#ccc',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#252525'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <span className="font-medium">{t.symbol}</span>
              <span style={{ color: '#666' }}>{t.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Slippage Settings ──────────────────────────────────────────────────
const SLIPPAGE_PRESETS = [
  { label: '0.5%', bps: 50 },
  { label: '1%', bps: 100 },
  { label: '3%', bps: 300 },
];

function SlippageSelector({
  value,
  onChange,
}: {
  value: number;
  onChange: (bps: number) => void;
}) {
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState('');
  const isPreset = SLIPPAGE_PRESETS.some((p) => p.bps === value);

  return (
    <div className="flex items-center gap-1">
      {SLIPPAGE_PRESETS.map((p) => (
        <button
          key={p.bps}
          onClick={() => { onChange(p.bps); setCustomOpen(false); }}
          className="px-2 py-0.5 text-xs font-mono rounded transition-colors"
          style={{
            backgroundColor: value === p.bps ? '#00E5FF' : '#252525',
            color: value === p.bps ? '#000' : '#999',
          }}
        >
          {p.label}
        </button>
      ))}
      {customOpen ? (
        <div className="flex items-center gap-1">
          <input
            type="text"
            value={customValue}
            onChange={(e) => {
              const v = e.target.value;
              if (v === '' || /^\d*\.?\d*$/.test(v)) setCustomValue(v);
            }}
            onBlur={() => {
              const pct = parseFloat(customValue);
              if (pct > 0 && pct <= 50) {
                onChange(Math.round(pct * 100));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const pct = parseFloat(customValue);
                if (pct > 0 && pct <= 50) {
                  onChange(Math.round(pct * 100));
                }
              }
            }}
            placeholder="%"
            className="w-12 px-1 py-0.5 text-xs font-mono rounded border outline-none"
            style={{ backgroundColor: '#1a1a1a', borderColor: '#555', color: '#fff' }}
            autoFocus
          />
        </div>
      ) : (
        <button
          onClick={() => setCustomOpen(true)}
          className="px-2 py-0.5 text-xs font-mono rounded transition-colors"
          style={{
            backgroundColor: !isPreset ? '#00E5FF' : '#252525',
            color: !isPreset ? '#000' : '#999',
          }}
        >
          {!isPreset ? `${(value / 100).toFixed(1)}%` : 'Custom'}
        </button>
      )}
    </div>
  );
}

// ── Main SwapPanel ─────────────────────────────────────────────────────
export function SwapPanel() {
  const {
    chain,
    inputToken,
    outputToken,
    inputAmount,
    slippageBps,
    quote,
    quoteLoading,
    quoteError,
    executing,
    executeError,
    tokens,
    connected,
    setChain,
    setInputToken,
    setOutputToken,
    setInputAmount,
    setSlippageBps,
    flipTokens,
    executeSwap,
  } = useSwap();

  const { connectWallet, beginDetected } = useWallet();

  const feeBps = parseInt(process.env.NEXT_PUBLIC_SWAP_FEE_BPS || '0', 10);

  return (
    <div className="flex flex-col h-full font-mono text-xs" style={{ color: '#ccc' }}>
      {/* Chain selector */}
      <div className="flex items-center gap-1 px-3 py-1.5 border-b" style={{ borderColor: '#333' }}>
        <span style={{ color: '#666' }} className="text-[10px] tracking-wider uppercase mr-1">Chain</span>
        <button
          onClick={() => setChain('solana')}
          className="px-2 py-0.5 rounded text-[10px] tracking-wide transition-colors"
          style={{
            backgroundColor: chain === 'solana' ? '#9945FF' : '#252525',
            color: chain === 'solana' ? '#fff' : '#666',
          }}
        >
          SOL
        </button>
        <button
          onClick={() => setChain('cardano')}
          className="px-2 py-0.5 rounded text-[10px] tracking-wide transition-colors"
          style={{
            backgroundColor: chain === 'cardano' ? '#0033AD' : '#252525',
            color: chain === 'cardano' ? '#fff' : '#666',
          }}
        >
          ADA
        </button>
        {chain === 'cardano' && (
          <span className="ml-auto text-[10px]" style={{ color: '#F7931A' }}>Coming soon</span>
        )}
      </div>

      {/* From */}
      <div className="px-3 pt-2 pb-1.5">
        <div className="flex items-center justify-between mb-1">
          <span style={{ color: '#666' }} className="text-[10px] tracking-wider uppercase">From</span>
        </div>
        <div
          className="flex items-center gap-2 rounded px-2 py-1.5 border"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
        >
          <TokenSelector
            selected={inputToken}
            tokens={tokens}
            onSelect={setInputToken}
            label="Select"
          />
          <input
            type="text"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 text-right bg-transparent outline-none text-sm font-mono"
            style={{ color: '#fff' }}
          />
          <button
            onClick={() => {
              // MAX placeholder — would read wallet balance
              setInputAmount('1');
            }}
            className="text-[10px] px-1 rounded transition-colors"
            style={{ color: '#00E5FF' }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            MAX
          </button>
        </div>
      </div>

      {/* Flip button */}
      <div className="flex justify-center -my-1 relative z-10">
        <button
          onClick={flipTokens}
          className="w-6 h-6 flex items-center justify-center rounded-full border transition-colors"
          style={{ backgroundColor: '#252525', borderColor: '#333' }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#00E5FF'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M3 7l3 3 3-3" stroke="#999" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* To */}
      <div className="px-3 pt-1.5 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span style={{ color: '#666' }} className="text-[10px] tracking-wider uppercase">To</span>
        </div>
        <div
          className="flex items-center gap-2 rounded px-2 py-1.5 border"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
        >
          <TokenSelector
            selected={outputToken}
            tokens={tokens}
            onSelect={setOutputToken}
            label="Select"
          />
          <div className="flex-1 text-right text-sm" style={{ color: quoteLoading ? '#666' : '#fff' }}>
            {quoteLoading ? (
              <span className="animate-pulse">...</span>
            ) : quote ? (
              quote.outputAmountUi.toLocaleString(undefined, { maximumFractionDigits: 6 })
            ) : (
              <span style={{ color: '#444' }}>0.00</span>
            )}
          </div>
        </div>
      </div>

      {/* Quote details */}
      {quote && !quoteLoading && (
        <div className="px-3 pb-2 space-y-1">
          <div className="rounded p-2 space-y-1" style={{ backgroundColor: '#1a1a1a', border: '1px solid #252525' }}>
            {/* Rate */}
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Rate</span>
              <span style={{ color: '#ccc' }}>
                1 {inputToken?.symbol} ≈{' '}
                {(quote.outputAmountUi / parseFloat(inputAmount || '1')).toLocaleString(undefined, {
                  maximumFractionDigits: 6,
                })}{' '}
                {outputToken?.symbol}
              </span>
            </div>

            {/* Price Impact */}
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Price Impact</span>
              <span style={{ color: quote.priceImpactPct > 1 ? '#FF4444' : quote.priceImpactPct > 0.5 ? '#F7931A' : '#00FF88' }}>
                {quote.priceImpactPct.toFixed(2)}%
              </span>
            </div>

            {/* Route */}
            {quote.routePlan.length > 0 && (
              <div className="flex justify-between">
                <span style={{ color: '#666' }}>Route</span>
                <span style={{ color: '#ccc' }}>
                  {quote.routePlan.map((r) => r.label).join(' → ')}
                </span>
              </div>
            )}

            {/* Slippage */}
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Max Slippage</span>
              <span style={{ color: '#ccc' }}>{(slippageBps / 100).toFixed(1)}%</span>
            </div>

            {/* Platform fee */}
            {feeBps > 0 && (
              <div className="flex justify-between">
                <span style={{ color: '#666' }}>Platform Fee</span>
                <span style={{ color: '#ccc' }}>{(feeBps / 100).toFixed(2)}%</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Error */}
      {quoteError && (
        <div className="px-3 pb-2">
          <div className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255,68,68,0.1)', color: '#FF4444' }}>
            {quoteError}
          </div>
        </div>
      )}

      {executeError && (
        <div className="px-3 pb-2">
          <div className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255,68,68,0.1)', color: '#FF4444' }}>
            {executeError}
          </div>
        </div>
      )}

      {/* Slippage setting */}
      <div className="px-3 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span style={{ color: '#666' }} className="text-[10px] tracking-wider uppercase">Slippage</span>
        </div>
        <SlippageSelector value={slippageBps} onChange={setSlippageBps} />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Swap / Connect button */}
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
            onClick={executeSwap}
            disabled={!quote || quoteLoading || executing || chain === 'cardano'}
            className="w-full py-2 rounded text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#00E5FF',
              color: '#000',
            }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#33ECFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#00E5FF';
            }}
          >
            {executing ? 'Swapping...' : chain === 'cardano' ? 'Cardano Swap Coming Soon' : 'Swap'}
          </button>
        )}
      </div>
    </div>
  );
}
