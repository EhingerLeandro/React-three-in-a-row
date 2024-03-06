import BoardContainer from '../BoardContainer/BoardContainer';
import './GameContainer.css'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameContainer =() =>{
    
    //Se determina con los siguiente useState para quien es el turno.
    const [xIsNext, setXIsNext] = useState(true);

    //En la línea que hay a continuación se establece el valor dentro
    //de cada botón o celda.
    const [squares, setSquares] = useState(Array(9).fill(null));

    let statusGame;

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

        //Esta parte se encarga de determinar cual de los juagadores X u O, 
        //ha completado uno de los patrones que otorgan la victoria.
        lista.forEach((item)=>{
            const [a, b, c] = item;
            if( arreglo[a] && arreglo[a] === arreglo[b] && arreglo[a] === arreglo[c]){
                winPlayer= arreglo[a];
            }
        })
        return winPlayer;
    }

    //Esta función handleClick determina donde se establecen los string X u O, 
    //en el arreglo squares que se maneja desde el useState.
    const handleClick =(i)=>{
        if(squares[i] || calculateWinner(squares)){
            return
        }
        let newSquares = squares.slice();
        xIsNext ? newSquares[i] = 'X' : newSquares[i]= 'O';
        setSquares(newSquares);
        setXIsNext(!xIsNext);
    }
    
    //Esta función permite hacer reset (reiniciar) a la informacion de los useStates.
    function handleReset () { 
        setSquares(Array(9).fill(null));
        setXIsNext('X')
    }

    // Esta función determina si ya se han usado todos los turnos posibles.
    const remainTurns = (arr)=>{
        let turnForPlay=0; 
        arr.forEach( (item)=>{
            if(item === 'X' || item === 'O'){
                turnForPlay++
            }
        })
        return 9 - turnForPlay;
    }

    const turns = remainTurns(squares);
    const winner = calculateWinner(squares);
    console.log(squares)
    console.log(winner)

    
    if(winner){
        statusGame = `Winner is ${winner}`;
    } else if(turns === 0){
        statusGame = `No more movements!`;
    } else if(turns === 9){
        statusGame = `Start the Game`;
    }else{
        statusGame = xIsNext ? 'Next player is X' : 'Next player is O';
    }
   
    return(
    <div className='Game'>
        <h3 style={{marginBottom:"15px"}}>Tic Tac Toe Game</h3>
        <BoardContainer board={squares} onClickBoard={handleClick}/>
        {
            winner==='X' ? 
            <div className='status' style={{color:'green'}}><b>{statusGame}!</b></div> :
            winner==='O' ?
                <div className='status' style={{color:'#933'}}><b>{statusGame}!</b></div>:
                <div className='status'>{statusGame}</div>
        }
        <button className='btn btn-primary buttonReset' onClick={handleReset}>Reiniciar</button>
    </div>
    )
}

export default GameContainer;