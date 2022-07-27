import { useState } from 'react';

function Board () {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
        Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
    )
    return <div>{currentPlayer} its your turn.</div>
}

export default Board;