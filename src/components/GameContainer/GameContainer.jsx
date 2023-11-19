import BoardContainer from '../BoardContainer/BoardContainer';
import './GameContainer.css'
import { useState } from 'react';

const GameContainer =() =>{
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));

    function calculateWinner (arreglo){
        const lista =[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        let winPlayer= null;

        lista.forEach((item)=>{
            const [a, b, c] = item;
            if( arreglo[a] && arreglo[a] === arreglo[b] && arreglo[a] === arreglo[c]){
                winPlayer= arreglo[a];
            }
        })

        return winPlayer;
    }

    let statusGame;
   
    const handleClick =(i)=>{
        if(squares[i] || calculateWinner(squares)){
            return
        }
        let newSquares = squares.slice();
        xIsNext ? newSquares[i] = 'X' : newSquares[i]= 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }

   
    const winner = calculateWinner(squares);
    console.log(squares)
    console.log(winner)

    if(winner){
        statusGame = `Winner is: ${winner}!`;
    }else{
        statusGame = xIsNext ? 'Next player is X' : 'Next player is O';
    }
    
    return(
    <div className='Game'>
        <h1>Three in a Row Game</h1>
        <BoardContainer board={squares} onClickBoard={handleClick}/>
        <div>{statusGame}</div>
    </div>
    )
}

export default GameContainer;