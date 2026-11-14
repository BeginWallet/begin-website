type Props = {
  height?: number
  color?: string
  className?: string
}

// The Begin wordmark from the "Brand & Landing" canvas, drawn as one SVG.
const Wordmark = ({ height = 26, color = '#0A0A0B', className }: Props) => {
  const svgH = Math.round(height * 1.12)
  const svgW = Math.round((svgH * 242) / 120)
  return (
    <svg
      className={className}
      style={{ display: 'block', overflow: 'visible', color }}
      width={svgW}
      height={svgH}
      viewBox="-4 2 242 120"
      role="img"
      aria-label="Begin"
    >
      <path d="M0.00 100 L11.00 100 L11.00 24 L0.00 35 Z" fill="currentColor" />
      <path d="M56.00 69.50 L103.39 69.50 A25 25 0 0 1 103.39 80.50 L56.00 80.50 Z" fill="currentColor" />
      <path d="M165.00 100 L176.00 100 L176.00 50 L165.00 50 Z" fill="currentColor" />
      <path d="M170.50 35.5 m-6.5 0 a6.5 6.5 0 1 0 13 0 a6.5 6.5 0 1 0 -13 0" fill="currentColor" />
      <path d="M184.00 100 L195.00 100 L195.00 50 L184.00 50 Z" fill="currentColor" />
      <path d="M25.00 75 m-19.5 0 a19.5 19.5 0 1 0 39 0 a19.5 19.5 0 1 0 -39 0" fill="none" stroke="currentColor" strokeWidth="11.0" />
      <path d="M98.50 75.00 A19.50 19.50 0 1 0 94.37 87.01" fill="none" stroke="currentColor" strokeWidth="11.0" />
      <path d="M133.00 75 m-19.5 0 a19.5 19.5 0 1 0 39 0 a19.5 19.5 0 1 0 -39 0" fill="none" stroke="currentColor" strokeWidth="11.0" />
      <path d="M147.00 50 L158.00 50 L158.00 105.50 A25 25 0 0 1 133.00 130.50 L122.00 130.50 L133.00 119.50 A14 14 0 0 0 147.00 105.50 Z" fill="currentColor" />
      <path d="M189.50 75.00 A19.50 19.50 0 0 1 228.50 75.00 L228.50 100" fill="none" stroke="currentColor" strokeWidth="11.0" />
    </svg>
  )
}

export default Wordmark
