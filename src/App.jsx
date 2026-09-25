import Game from './components/Game'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900">
      <header className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </header>
      <Game />
    </div>
  )
}

export default App
