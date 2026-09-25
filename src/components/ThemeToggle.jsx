import { useState, useEffect } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      if (stored) return stored === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      root.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    }
  }, [isDark])

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Переключить тему"
      onClick={() => setIsDark((prev) => !prev)}
      className="relative inline-flex h-9 w-16 items-center rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 cursor-pointer"
    >
      <span className="sr-only">Переключить тему</span>
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full bg-white dark:bg-gray-900 shadow-sm transition-transform duration-200 ${
          isDark ? 'translate-x-8' : 'translate-x-1'
        }`}
      >
        {isDark ? (
          <span className="text-sm" aria-hidden="true">
            🌙
          </span>
        ) : (
          <span className="text-sm" aria-hidden="true">
            ☀️
          </span>
        )}
      </span>
    </button>
  )
}
