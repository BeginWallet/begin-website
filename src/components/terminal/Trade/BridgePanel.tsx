'use client';

import { useState } from 'react';
import { useBridge, type BridgeStep } from '../../../hooks/terminal/useBridge';
import { useWallet } from '../../../hooks/terminal/useWallet';
import { BRIDGE_ASSETS, type BridgeAsset, type OrderStatus } from '../../../services/terminal/bridge';

// ── Asset Selector ─────────────────────────────────────────────────────
function AssetSelector({
  selected,
  assets,
  onSelect,
  label,
}: {
  selected: BridgeAsset;
  assets: BridgeAsset[];
  onSelect: (a: BridgeAsset) => void;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const info = BRIDGE_ASSETS[selected];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 px-2 py-1 rounded text-sm font-mono transition-colors"
        style={{ backgroundColor: '#252525', color: '#fff', border: '1px solid #333' }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#555'; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#333'; }}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: info.color }}
        />
        <span>{selected}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="#999">
          <path d="M2 4l3 3 3-3" stroke="#999" strokeWidth="1.2" fill="none" />
        </svg>
      </button>

      {open && (
        <div
          className="absolute z-50 mt-1 w-44 rounded border overflow-hidden"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
        >
          {assets.map((a) => {
            const ai = BRIDGE_ASSETS[a];
            return (
              <button
                key={a}
                onClick={() => { onSelect(a); setOpen(false); }}
                className="w-full text-left px-3 py-1.5 text-xs font-mono flex items-center gap-2 transition-colors"
                style={{
                  color: selected === a ? '#00E5FF' : '#ccc',
                  backgroundColor: 'transparent',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#252525'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: ai.color }}
                />
                <span className="font-medium">{a}</span>
                <span style={{ color: '#666' }} className="ml-auto">{ai.name}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Status Step Indicator ──────────────────────────────────────────────
const STATUS_STEPS: { key: OrderStatus; label: string }[] = [
  { key: 'awaiting_deposit', label: 'Pending' },
  { key: 'confirming', label: 'Confirming' },
  { key: 'exchanging', label: 'Exchanging' },
  { key: 'complete', label: 'Complete' },
];

function StatusTracker({ status }: { status: OrderStatus }) {
  const failed = status === 'failed' || status === 'refunded';
  const currentIdx = STATUS_STEPS.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center gap-1 px-1">
      {STATUS_STEPS.map((step, idx) => {
        const isActive = step.key === status;
        const isDone = idx < currentIdx || status === 'complete';
        const isAnimating = isActive && !isDone && !failed;

        let dotColor = '#333';
        let labelColor = '#666';

        if (failed && isActive) {
          dotColor = '#FF4444';
          labelColor = '#FF4444';
        } else if (isDone) {
          dotColor = '#00FF88';
          labelColor = '#00FF88';
        } else if (isActive) {
          dotColor = '#00E5FF';
          labelColor = '#00E5FF';
        }

        return (
          <div key={step.key} className="flex items-center gap-1">
            {idx > 0 && (
              <div
                className="w-4 h-px"
                style={{ backgroundColor: isDone ? '#00FF88' : '#333' }}
              />
            )}
            <div className="flex flex-col items-center gap-0.5">
              <div
                className={`w-2.5 h-2.5 rounded-full ${isAnimating ? 'animate-pulse' : ''}`}
                style={{ backgroundColor: dotColor }}
              />
              <span className="text-[9px] font-mono" style={{ color: labelColor }}>
                {step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main BridgePanel ───────────────────────────────────────────────────
export function BridgePanel() {
  const {
    fromAsset,
    toAsset,
    amount,
    rate,
    rateLoading,
    rateError,
    order,
    orderLoading,
    orderError,
    step,
    fromAssets,
    toAssets,
    connected,
    setFromAsset,
    setToAsset,
    setAmount,
    flipAssets,
    executeBridge,
    confirmDeposit,
    resetBridge,
  } = useBridge();

  const { connectWallet, beginDetected } = useWallet();
  const [depositTxId, setDepositTxId] = useState('');

  const outputAmount = rate && amount ? parseFloat(amount) * rate.rate : 0;

  // ── Deposit view ───────────────────────────────────────────────────
  if (step === 'deposit' && order) {
    return (
      <div className="flex flex-col h-full font-mono text-xs" style={{ color: '#ccc' }}>
        <div className="px-3 py-2 border-b" style={{ borderColor: '#333' }}>
          <div className="flex items-center justify-between">
            <span style={{ color: '#00E5FF' }} className="text-[10px] tracking-wider uppercase">
              Deposit Required
            </span>
            <button
              onClick={resetBridge}
              className="text-[10px] px-1.5 py-0.5 rounded transition-colors"
              style={{ color: '#999' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#999'; }}
            >
              Cancel
            </button>
          </div>
        </div>

        <div className="px-3 py-3 space-y-3 flex-1">
          <div className="rounded p-2 space-y-1.5" style={{ backgroundColor: '#1a1a1a', border: '1px solid #252525' }}>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Send</span>
              <span style={{ color: '#fff' }}>{order.fromAmount} {fromAsset}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Receive</span>
              <span style={{ color: '#fff' }}>~{order.toAmount.toFixed(6)} {toAsset}</span>
            </div>
          </div>

          <div>
            <span style={{ color: '#666' }} className="text-[10px] tracking-wider uppercase block mb-1">
              Deposit Address
            </span>
            <div
              className="rounded px-2 py-1.5 text-[10px] break-all select-all cursor-text"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid #252525', color: '#00E5FF' }}
            >
              {order.depositAddress}
            </div>
          </div>

          <div>
            <span style={{ color: '#666' }} className="text-[10px] tracking-wider uppercase block mb-1">
              Your TX ID (after sending)
            </span>
            <input
              type="text"
              value={depositTxId}
              onChange={(e) => setDepositTxId(e.target.value)}
              placeholder="Paste transaction hash..."
              className="w-full px-2 py-1.5 text-[10px] font-mono rounded border outline-none"
              style={{ backgroundColor: '#1a1a1a', borderColor: '#333', color: '#fff' }}
            />
          </div>
        </div>

        <div className="px-3 pb-3">
          <button
            onClick={() => { if (depositTxId.trim()) confirmDeposit(depositTxId.trim()); }}
            disabled={!depositTxId.trim() || orderLoading}
            className="w-full py-2 rounded text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#00E5FF', color: '#000' }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#33ECFF';
            }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#00E5FF'; }}
          >
            {orderLoading ? 'Confirming...' : 'Confirm Deposit'}
          </button>
        </div>
      </div>
    );
  }

  // ── Status tracking view ───────────────────────────────────────────
  if (step === 'status' && order) {
    const isDone = order.status === 'complete';
    const isFailed = order.status === 'failed' || order.status === 'refunded';

    return (
      <div className="flex flex-col h-full font-mono text-xs" style={{ color: '#ccc' }}>
        <div className="px-3 py-2 border-b" style={{ borderColor: '#333' }}>
          <span
            style={{ color: isDone ? '#00FF88' : isFailed ? '#FF4444' : '#00E5FF' }}
            className="text-[10px] tracking-wider uppercase"
          >
            {isDone ? 'Bridge Complete' : isFailed ? 'Bridge Failed' : 'Bridging...'}
          </span>
        </div>

        <div className="px-3 py-3 space-y-3 flex-1">
          <StatusTracker status={order.status} />

          <div className="rounded p-2 space-y-1.5" style={{ backgroundColor: '#1a1a1a', border: '1px solid #252525' }}>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Order</span>
              <span style={{ color: '#999' }} className="text-[10px]">{order.orderId.slice(0, 12)}...</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>From</span>
              <span style={{ color: '#fff' }}>{order.fromAmount} {fromAsset}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>To</span>
              <span style={{ color: '#fff' }}>~{order.toAmount.toFixed(6)} {toAsset}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Status</span>
              <span style={{
                color: isDone ? '#00FF88' : isFailed ? '#FF4444' : '#00E5FF',
              }}>
                {order.status.replace(/_/g, ' ')}
              </span>
            </div>
            {order.txIdOut && (
              <div className="flex justify-between">
                <span style={{ color: '#666' }}>TX Out</span>
                <span style={{ color: '#999' }} className="text-[10px]">{order.txIdOut.slice(0, 16)}...</span>
              </div>
            )}
          </div>

          {!isDone && !isFailed && (
            <div className="flex items-center justify-center gap-1.5 py-2">
              <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#00E5FF' }} />
              <span style={{ color: '#666' }} className="text-[10px]">Monitoring exchange status...</span>
            </div>
          )}
        </div>

        <div className="px-3 pb-3">
          <button
            onClick={resetBridge}
            className="w-full py-2 rounded text-sm font-medium transition-colors"
            style={{
              backgroundColor: isDone || isFailed ? '#00E5FF' : 'transparent',
              color: isDone || isFailed ? '#000' : '#00E5FF',
              border: isDone || isFailed ? 'none' : '1px solid #00E5FF',
            }}
            onMouseEnter={(e) => {
              if (isDone || isFailed) {
                e.currentTarget.style.backgroundColor = '#33ECFF';
              } else {
                e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.1)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDone || isFailed ? '#00E5FF' : 'transparent';
            }}
          >
            {isDone ? 'New Bridge' : isFailed ? 'Try Again' : 'Cancel'}
          </button>
        </div>
      </div>
    );
  }

  // ── Quote view (default) ───────────────────────────────────────────
  const amountBelowMin = rate && amount && parseFloat(amount) < rate.min;
  const amountAboveMax = rate && amount && parseFloat(amount) > rate.max;

  return (
    <div className="flex flex-col h-full font-mono text-xs" style={{ color: '#ccc' }}>
      {/* Header */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b" style={{ borderColor: '#333' }}>
        <span style={{ color: '#666' }} className="text-[10px] tracking-wider uppercase mr-1">Bridge</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10M9 4l3 3-3 3" stroke="#00E5FF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="text-[10px]" style={{ color: '#666' }}>Cross-chain via XOSwap</span>
      </div>

      {/* From */}
      <div className="px-3 pt-2 pb-1.5">
        <div className="flex items-center justify-between mb-1">
          <span style={{ color: '#666' }} className="text-[10px] tracking-wider uppercase">From</span>
          <span style={{ color: '#444' }} className="text-[10px]">{BRIDGE_ASSETS[fromAsset].name}</span>
        </div>
        <div
          className="flex items-center gap-2 rounded px-2 py-1.5 border"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
        >
          <AssetSelector
            selected={fromAsset}
            assets={fromAssets}
            onSelect={setFromAsset}
            label="From"
          />
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="flex-1 text-right bg-transparent outline-none text-sm font-mono"
            style={{ color: '#fff' }}
          />
        </div>
        {amountBelowMin && (
          <span className="text-[10px] mt-0.5 block" style={{ color: '#FF4444' }}>
            Min: {rate!.min} {fromAsset}
          </span>
        )}
        {amountAboveMax && (
          <span className="text-[10px] mt-0.5 block" style={{ color: '#FF4444' }}>
            Max: {rate!.max} {fromAsset}
          </span>
        )}
      </div>

      {/* Flip button */}
      <div className="flex justify-center -my-1 relative z-10">
        <button
          onClick={flipAssets}
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
          <span style={{ color: '#444' }} className="text-[10px]">{BRIDGE_ASSETS[toAsset].name}</span>
        </div>
        <div
          className="flex items-center gap-2 rounded px-2 py-1.5 border"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
        >
          <AssetSelector
            selected={toAsset}
            assets={toAssets}
            onSelect={setToAsset}
            label="To"
          />
          <div className="flex-1 text-right text-sm" style={{ color: rateLoading ? '#666' : '#fff' }}>
            {rateLoading ? (
              <span className="animate-pulse">...</span>
            ) : outputAmount > 0 ? (
              outputAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })
            ) : (
              <span style={{ color: '#444' }}>0.00</span>
            )}
          </div>
        </div>
      </div>

      {/* Rate details */}
      {rate && !rateLoading && (
        <div className="px-3 pb-2 space-y-1">
          <div className="rounded p-2 space-y-1" style={{ backgroundColor: '#1a1a1a', border: '1px solid #252525' }}>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Rate</span>
              <span style={{ color: '#ccc' }}>
                1 {fromAsset} = {rate.rate.toLocaleString(undefined, { maximumFractionDigits: 8 })} {toAsset}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Output</span>
              <span style={{ color: '#ccc' }}>
                {outputAmount.toLocaleString(undefined, { maximumFractionDigits: 8 })} {toAsset}
              </span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Miner Fee</span>
              <span style={{ color: '#ccc' }}>{rate.minerFee} {toAsset}</span>
            </div>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>Min / Max</span>
              <span style={{ color: '#ccc' }}>{rate.min} – {rate.max} {fromAsset}</span>
            </div>
          </div>
        </div>
      )}

      {/* Errors */}
      {rateError && (
        <div className="px-3 pb-2">
          <div className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255,68,68,0.1)', color: '#FF4444' }}>
            {rateError}
          </div>
        </div>
      )}

      {orderError && (
        <div className="px-3 pb-2">
          <div className="text-[10px] px-2 py-1 rounded" style={{ backgroundColor: 'rgba(255,68,68,0.1)', color: '#FF4444' }}>
            {orderError}
          </div>
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bridge / Connect button */}
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
            onClick={executeBridge}
            disabled={!rate || rateLoading || orderLoading || !!amountBelowMin || !!amountAboveMax}
            className="w-full py-2 rounded text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#00E5FF', color: '#000' }}
            onMouseEnter={(e) => {
              if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = '#33ECFF';
            }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#00E5FF'; }}
          >
            {orderLoading ? 'Creating Order...' : 'Bridge'}
          </button>
        )}
      </div>
    </div>
  );
}
