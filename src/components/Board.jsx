import Square from './Square'

export default function Board({ squares, onSquareClick }) {
  return (
    <div
      className="grid grid-cols-3 gap-2 sm:gap-3"
      role="grid"
      aria-label="Игровое поле крестики-нолики"
    >
      {squares.map((value, i) => (
        <Square
          key={i}
          value={value}
          onClick={() => onSquareClick(i)}
        />
      ))}
    </div>
  )
}
