import React, { useEffect } from 'react';

const LINKS = {
  chrome: 'https://chromewebstore.google.com/detail/begin-wallet/nhbicdelgedinnbcidconlnfeionhbml',
  ios: 'https://apps.apple.com/app/begin-wallet/id1642372567',
  android: 'https://play.google.com/store/apps/details?id=is.begin.app',
};

interface NoWalletModalProps {
  open: boolean;
  onClose: () => void;
}

export default function NoWalletModal({ open, onClose }: NoWalletModalProps) {
  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keyup', handleEsc);
    return () => document.removeEventListener('keyup', handleEsc);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-sm mx-4 rounded-lg border shadow-2xl"
        style={{ backgroundColor: '#1a1a1a', borderColor: '#333' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-3">
          <h2 className="text-base font-semibold" style={{ color: '#e0e0e0' }}>
            Begin Wallet Required
          </h2>
          <button
            onClick={onClose}
            className="text-lg leading-none px-1 rounded transition-colors"
            style={{ color: '#888' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = '#888'; }}
          >
            &times;
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pb-5">
          <p className="text-sm mb-5" style={{ color: '#999' }}>
            Install the Begin wallet extension to connect. Begin supports Cardano, Solana, and EVM chains.
          </p>

          <div className="flex flex-col gap-2">
            <StoreLink
              href={LINKS.chrome}
              icon={<ChromeIcon />}
              label="Chrome Web Store"
              sublabel="Browser extension"
            />
            <StoreLink
              href={LINKS.ios}
              icon={<AppleIcon />}
              label="App Store"
              sublabel="iOS"
            />
            <StoreLink
              href={LINKS.android}
              icon={<AndroidIcon />}
              label="Google Play"
              sublabel="Android"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StoreLink({
  href,
  icon,
  label,
  sublabel,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  sublabel: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 px-4 py-3 rounded border transition-colors"
      style={{ borderColor: '#333', backgroundColor: 'transparent', textDecoration: 'none' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#2a2a2a';
        e.currentTarget.style.borderColor = '#00E5FF';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.borderColor = '#333';
      }}
    >
      <span style={{ color: '#00E5FF' }}>{icon}</span>
      <div>
        <div className="text-sm font-medium" style={{ color: '#e0e0e0' }}>{label}</div>
        <div className="text-xs" style={{ color: '#888' }}>{sublabel}</div>
      </div>
    </a>
  );
}

function ChromeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" y1="8" x2="12" y2="8" />
      <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
      <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.463 11.463 0 00-8.94 0L5.65 5.67c-.19-.29-.58-.38-.87-.2-.28.18-.37.54-.22.83L6.4 9.48A10.78 10.78 0 002 18h20a10.78 10.78 0 00-4.4-8.52zM7 15.25a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5zm10 0a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z" />
    </svg>
  );
}
