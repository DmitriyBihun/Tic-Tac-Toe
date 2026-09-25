import { useState } from 'react'
import Board from './Board'

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ]
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

export default function Game() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [xIsNext, setXIsNext] = useState(true)

  const winner = calculateWinner(board)
  const isDraw = !winner && board.every(Boolean)

  function handleSquareClick(i) {
    if (board[i] || winner) return
    const next = [...board]
    next[i] = xIsNext ? 'X' : 'O'
    setBoard(next)
    setXIsNext(!xIsNext)
  }

  function handleReset() {
    setBoard(Array(9).fill(null))
    setXIsNext(true)
  }

  let status
  let statusClass = 'text-gray-700 dark:text-gray-300'

  if (winner) {
    status = `🎉 Победил ${winner}!`
    statusClass = winner === 'X'
      ? 'text-purple-600 dark:text-purple-400'
      : 'text-blue-600 dark:text-blue-400'
  } else if (isDraw) {
    status = '🤝 Ничья!'
    statusClass = 'text-amber-600 dark:text-amber-400'
  } else {
    status = `Ход: ${xIsNext ? 'X' : 'O'}`
  }

  return (
    <main className="flex flex-col items-center gap-6 py-10 px-4 min-h-screen bg-white dark:bg-gray-900 transition-colors duration-200">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
        Крестики-нолики
      </h1>

      <p
        aria-live="polite"
        className={`text-xl sm:text-2xl font-semibold transition-colors duration-200 ${statusClass}`}
      >
        {status}
      </p>

      <Board squares={board} onSquareClick={handleSquareClick} />

      <button
        type="button"
        onClick={handleReset}
        className="mt-4 px-6 py-3 text-base sm:text-lg font-semibold text-white bg-purple-600 rounded-lg hover:bg-purple-700 active:bg-purple-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 cursor-pointer"
      >
        Начать заново
      </button>
    </main>
  )
}
