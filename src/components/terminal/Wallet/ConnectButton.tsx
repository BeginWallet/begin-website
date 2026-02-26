import React, { useState, useEffect, useRef } from 'react';
import { useWallet, initWalletAutoReconnect } from '../../../hooks/terminal/useWallet';

function truncateAddress(addr: string): string {
  if (addr.length <= 16) return addr;
  return addr.slice(0, 8) + '...' + addr.slice(-6);
}

function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text).catch(() => {
    // Fallback for older browsers
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  });
}

export default function ConnectButton({ onNoWallet }: { onNoWallet?: () => void }) {
  const {
    connected,
    connecting,
    addresses,
    beginDetected,
    connectWallet,
    disconnectWallet,
    checkBeginDetected,
  } = useWallet();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-reconnect on mount
  useEffect(() => {
    initWalletAutoReconnect();
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close on Escape
  useEffect(() => {
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') setDropdownOpen(false);
    }
    document.addEventListener('keyup', handleEsc);
    return () => document.removeEventListener('keyup', handleEsc);
  }, []);

  const handleConnect = () => {
    const detected = checkBeginDetected();
    if (!detected) {
      onNoWallet?.();
      return;
    }
    connectWallet();
  };

  const handleCopy = (chain: string, addr: string) => {
    copyToClipboard(addr);
    setCopied(chain);
    setTimeout(() => setCopied(null), 1500);
  };

  const primaryAddress = addresses.cardano || addresses.solana || addresses.evm || '';

  // Disconnected state
  if (!connected && !connecting) {
    return (
      <button
        onClick={handleConnect}
        className="px-4 py-1.5 text-sm font-medium rounded border transition-colors"
        style={{
          color: '#00E5FF',
          borderColor: '#00E5FF',
          backgroundColor: 'transparent',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        Connect Begin
      </button>
    );
  }

  // Connecting state
  if (connecting) {
    return (
      <button
        disabled
        className="px-4 py-1.5 text-sm font-medium rounded border flex items-center gap-2"
        style={{ color: '#00E5FF', borderColor: '#333', backgroundColor: 'transparent' }}
      >
        <svg
          className="animate-spin h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: '#00E5FF' }}
        >
          <circle
            cx="12" cy="12" r="10"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="31.4 31.4"
            strokeLinecap="round"
          />
        </svg>
        Connecting...
      </button>
    );
  }

  // Connected state
  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setDropdownOpen((v) => !v)}
        className="px-3 py-1.5 text-sm rounded border flex items-center gap-2 transition-colors"
        style={{
          color: '#e0e0e0',
          borderColor: '#333',
          backgroundColor: dropdownOpen ? '#2a2a2a' : 'transparent',
          fontFamily: 'monospace',
        }}
      >
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{ backgroundColor: '#00E676' }}
        />
        {truncateAddress(primaryAddress)}
        <svg
          width="10" height="6" viewBox="0 0 10 6" fill="none"
          style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}
        >
          <path d="M1 1L5 5L9 1" stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {dropdownOpen && (
        <div
          className="absolute right-0 mt-1 w-72 rounded border shadow-lg z-50"
          style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
        >
          <div className="px-3 py-2 border-b" style={{ borderColor: '#333' }}>
            <span className="text-xs uppercase tracking-wider" style={{ color: '#888' }}>
              Connected Addresses
            </span>
          </div>

          {addresses.cardano && (
            <AddressRow
              chain="Cardano"
              address={addresses.cardano}
              copied={copied === 'cardano'}
              onCopy={() => handleCopy('cardano', addresses.cardano!)}
            />
          )}
          {addresses.solana && (
            <AddressRow
              chain="Solana"
              address={addresses.solana}
              copied={copied === 'solana'}
              onCopy={() => handleCopy('solana', addresses.solana!)}
            />
          )}
          {addresses.evm && (
            <AddressRow
              chain="EVM"
              address={addresses.evm}
              copied={copied === 'evm'}
              onCopy={() => handleCopy('evm', addresses.evm!)}
            />
          )}

          <div className="border-t" style={{ borderColor: '#333' }}>
            <button
              onClick={() => {
                disconnectWallet();
                setDropdownOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm transition-colors"
              style={{ color: '#ff5252' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255,82,82,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function AddressRow({
  chain,
  address,
  copied,
  onCopy,
}: {
  chain: string;
  address: string;
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <div
      className="px-3 py-2 flex items-center justify-between gap-2 transition-colors"
      style={{ borderBottom: '1px solid #2a2a2a' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2a2a2a';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <div className="min-w-0 flex-1">
        <div className="text-xs mb-0.5" style={{ color: '#00E5FF' }}>
          {chain}
        </div>
        <div
          className="text-xs truncate"
          style={{ color: '#ccc', fontFamily: 'monospace' }}
          title={address}
        >
          {truncateAddress(address)}
        </div>
      </div>
      <button
        onClick={onCopy}
        className="text-xs px-2 py-1 rounded transition-colors flex-shrink-0"
        style={{
          color: copied ? '#00E676' : '#888',
          backgroundColor: copied ? 'rgba(0,230,118,0.1)' : 'transparent',
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}
