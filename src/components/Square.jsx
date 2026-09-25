export default function Square({ value, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={value ? `Клетка: ${value}` : 'Пустая клетка'}
      className="flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 text-4xl sm:text-5xl font-bold rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white transition-colors duration-200 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-gray-100 dark:disabled:hover:bg-gray-800"
      disabled={!!value}
    >
      {value && (
        <span className={value === 'X' ? 'text-purple-600 dark:text-purple-400' : 'text-blue-600 dark:text-blue-400'}>
          {value}
        </span>
      )}
    </button>
  )
}
