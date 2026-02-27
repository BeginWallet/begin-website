import React from 'react';
import { useWallet } from '../../../hooks/terminal/useWallet';

interface WalletRequiredProps {
  children: React.ReactNode;
  onNoWallet?: () => void;
}

export default function WalletRequired({ children, onNoWallet }: WalletRequiredProps) {
  const { connected, beginDetected, connectWallet, checkBeginDetected } = useWallet();

  if (connected) {
    return <>{children}</>;
  }

  const handleAction = () => {
    const detected = checkBeginDetected();
    if (!detected) {
      onNoWallet?.();
      return;
    }
    connectWallet();
  };

  return (
    <div className="relative w-full h-full min-h-[200px]">
      {/* Blurred / dimmed background hint */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'rgba(26,26,26,0.85)' }}>
        <div className="text-center px-6 py-8">
          <svg
            width="40" height="40" viewBox="0 0 24 24" fill="none" className="mx-auto mb-4"
            stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
          >
            <rect x="2" y="6" width="20" height="14" rx="2" />
            <path d="M2 10h20" />
            <circle cx="17" cy="15" r="1.5" />
          </svg>

          {beginDetected ? (
            <>
              <p className="text-sm mb-4" style={{ color: '#ccc' }}>
                Connect wallet to view
              </p>
              <button
                onClick={handleAction}
                className="px-5 py-2 text-sm font-medium rounded border transition-colors"
                style={{ color: '#00E5FF', borderColor: '#00E5FF', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Connect Begin
              </button>
            </>
          ) : (
            <>
              <p className="text-sm mb-2" style={{ color: '#ccc' }}>
                Begin wallet not detected
              </p>
              <button
                onClick={handleAction}
                className="px-5 py-2 text-sm font-medium rounded border transition-colors"
                style={{ color: '#00E5FF', borderColor: '#00E5FF', backgroundColor: 'transparent' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(0,229,255,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                Download Begin Wallet
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
