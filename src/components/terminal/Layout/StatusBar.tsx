import { useEffect, useState } from 'react'

const StatusBar = () => {
  const [currentTime, setCurrentTime] = useState<string>('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setCurrentTime(
        now.toISOString().slice(11, 19) + ' UTC'
      )
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-6 bg-[#0a0a0a] border-t border-[#333] px-4 flex items-center justify-between font-mono text-xs text-[#999]">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Connected
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>{currentTime}</span>
        <span className="text-[#666]">v0.1.0</span>
      </div>
    </div>
  )
}

export default StatusBar
