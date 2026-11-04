import { useEffect, useRef, useState } from 'react'
import Wordmark from './wordmark'

// Photo of hands holding a phone, with the Begin home screen mapped onto the
// phone's display (same perspective transform as the canvas component).
// The 750x1000 stage is scaled to cover the box, like object-fit: cover.

const STAGE_W = 750
const STAGE_H = 1000
const SCREEN_MATRIX =
  'matrix3d(0.415004, 0.0403425, 0, -8.27969e-05, -0.116752, 0.424026, 0, -5.93792e-05, 0, 0, 1, 0, 412, 232, 0, 1)'

const ink = '#0A0A0B'
const muted = '#6E6E73'
const soft = '#F4F4F5'
const line = '#ECECEE'
const accent = '#1FD1E5'

const Avatar = ({ initials }: { initials: string }) => (
  <span style={{ width: 54, height: 54, borderRadius: 27, background: soft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 500 }}>
    {initials}
  </span>
)

const Pocket = ({ label, amount }: { label: string; amount: string }) => (
  <span style={{ background: soft, borderRadius: 18, padding: 12, display: 'flex', flexDirection: 'column', gap: 2 }}>
    <span style={{ fontSize: 12, color: muted }}>{label}</span>
    <span style={{ fontSize: 20, fontWeight: 300, letterSpacing: '-0.03em' }}>{amount}</span>
  </span>
)

const PhoneScreen = () => (
  <div style={{ width: 390, height: 844, boxSizing: 'border-box', background: '#FFFFFF', color: ink, position: 'relative', overflow: 'hidden', paddingTop: 58, display: 'flex', flexDirection: 'column' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 48, padding: '0 18px 0 22px' }}>
      <span style={{ width: 40, height: 40, borderRadius: 20, background: soft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 500 }}>AR</span>
      <Wordmark height={24} />
      <span style={{ width: 40, height: 40, borderRadius: 20, background: soft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={ink}>
          <path d="M12 1.5l2.6 7.9 7.9 2.6-7.9 2.6L12 22.5l-2.6-7.9L1.5 12l7.9-2.6z" />
        </svg>
      </span>
    </div>
    <div style={{ padding: '22px 26px 0', display: 'flex', flexDirection: 'column' }}>
      <span style={{ fontSize: 15, color: muted }}>Your stablecoin account</span>
      <span style={{ fontSize: 62, fontWeight: 300, letterSpacing: '-0.05em', lineHeight: 1.1 }}>
        $8,420<span style={{ color: '#8E8E93' }}>.00</span>
      </span>
      <span style={{ marginTop: 4, fontSize: 14, color: muted }}>Dollars · USDC · @ana</span>
    </div>
    <div style={{ display: 'flex', gap: 8, padding: '22px 20px 0' }}>
      <span style={{ flex: 1, height: 54, borderRadius: 27, background: ink, color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 500 }}>Add money</span>
      <span style={{ flex: 1, height: 54, borderRadius: 27, background: soft, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 500 }}>Send</span>
    </div>
    <div style={{ margin: '22px 20px 0', padding: 16, borderRadius: 22, border: `1px solid ${line}`, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 15, fontWeight: 500 }}>
        <span>Coming in</span>
        <span>$7,300</span>
      </div>
      <div style={{ display: 'flex', gap: 3, height: 8 }}>
        <span style={{ width: '16%', borderRadius: 4, background: accent }} />
        <span style={{ flex: 1, borderRadius: 4, background: '#E4E4E7' }} />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 40, fontSize: 15, borderTop: `1px solid ${line}` }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: accent }} />
        <span style={{ flex: 1 }}>Lumen Labs</span>
        <span style={{ color: muted, fontSize: 14 }}>Paid just now</span>
        <span>$2,400</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minHeight: 40, fontSize: 15 }}>
        <span style={{ width: 8, height: 8, borderRadius: 4, background: '#D4D4D8' }} />
        <span style={{ flex: 1 }}>Northwind</span>
        <span style={{ color: muted, fontSize: 14 }}>Thursday</span>
        <span>$1,200</span>
      </div>
    </div>
    <div style={{ padding: '22px 26px 0' }}>
      <span style={{ fontSize: 15, fontWeight: 500 }}>Send again</span>
      <div style={{ display: 'flex', gap: 18, marginTop: 10, fontSize: 13 }}>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <img src="/images/transition/mom-kitchen.jpg" alt="" style={{ width: 54, height: 54, borderRadius: 27, objectFit: 'cover', objectPosition: '50% 30%' }} />
          Mom
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><Avatar initials="JR" />João</span>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}><Avatar initials="LK" />Lea</span>
        <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 54, height: 54, borderRadius: 27, border: '1.5px dashed #8E8E93', boxSizing: 'border-box', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>+</span>
          New
        </span>
      </div>
    </div>
    <div style={{ padding: '22px 20px 0' }}>
      <span style={{ paddingLeft: 6, fontSize: 15, fontWeight: 500 }}>Pockets</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8, marginTop: 10 }}>
        <Pocket label="Taxes" amount="$1,240" />
        <Pocket label="Family" amount="$300" />
        <Pocket label="Trip home" amount="$860" />
      </div>
    </div>
    <span style={{ flexGrow: 1 }} />
    <div style={{ height: 86, borderTop: `1px solid ${line}`, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', padding: '10px 8px 0', boxSizing: 'border-box', fontSize: 12, color: muted, textAlign: 'center' }}>
      <span style={{ color: ink, fontWeight: 500 }}>Home</span>
      <span>Send</span>
      <span>Get paid</span>
      <span>Activity</span>
    </div>
  </div>
)

type Props = { alt: string }

const PhonePhoto = ({ alt }: Props) => {
  const box = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 520, h: 640 })

  useEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => {
      const w = el.clientWidth
      const h = el.clientHeight
      if (w && h) setSize((s) => (s.w === w && s.h === h ? s : { w, h }))
    }
    measure()
    if (typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const s = Math.max(size.w / STAGE_W, size.h / STAGE_H)
  const x = (size.w - STAGE_W * s) * 0.5
  const y = (size.h - STAGE_H * s) * 0.5

  return (
    <div ref={box} role="img" aria-label={alt} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#E4E4E7' }}>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: STAGE_W,
          height: STAGE_H,
          transformOrigin: '0 0',
          transform: `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${s.toFixed(4)})`,
        }}
      >
        <img src="/images/transition/phone-cafe.jpg" alt="" style={{ position: 'absolute', left: 0, top: 0, width: STAGE_W, height: STAGE_H, display: 'block' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, width: 390, height: 844, transformOrigin: '0 0', transform: SCREEN_MATRIX, borderRadius: 50, overflow: 'hidden', background: '#FFFFFF' }}>
          <PhoneScreen />
        </div>
      </div>
    </div>
  )
}

export default PhonePhoto
