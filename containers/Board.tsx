import { useEffect, useState } from 'react';
import Square from '../components/Square';
type Player = "X" | "O" | null | "Both";

function calculateWinner(squares: Player[]){
    const lines = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];
    for (let i = 0; i<lines.length; i++){
        const [a,b,c] = lines[i]
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}

function Board () {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<'X' | 'O'>(
        Math.round(Math.random() * 1) === 1 ? 'X' : 'O'
    )
    const [winner, setWinner] = useState<Player>(null);  
    
    function setSquareValue(index: number){
        const newSquares = squares.map((val,i)=>{
            if (i === index){
                return currentPlayer;
            }
            return val;
        });
        setSquares(newSquares);
        setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }

    
    
    function reset(){
        setSquares(Array(9).fill(null));
        setWinner(null);
        setCurrentPlayer(Math.round(Math.random() * 1) === 1 ? 'X' : 'O')
    }

    useEffect(()=>{
        const w = calculateWinner(squares);
        if(w){
            setWinner(w)
        }
        if(!w && !squares.filter((square)=> !square).length){
            setWinner("Both")
        }
    });

    return (
    <div>
        {!winner &&<p>{currentPlayer} its your turn.</p>}
        <div className='winner'>{winner && <p>Congratulations {winner}</p>}</div>
        <div className="grid">
            {Array(9).fill(null).map((_, index) => {
                return <Square
                winner={winner}
                key={index}
                onClick={()=> setSquareValue(index)}
                value={squares[index]}
                />
            })}
        </div>
        
        <button className='reset' onClick={reset}>Reset</button>
    </div>
    )
}

export default Board;