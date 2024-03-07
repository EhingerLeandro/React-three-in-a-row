import BoardContainer from '../BoardContainer/BoardContainer';
import './GameContainer.css'
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const GameContainer =({xIsNext, squares, onReset, onPlay}) =>{
    
    //Se determina con los siguiente useState para quien es el turno.
    /* La siguiente línea se ha comentado porque se pasó al componente padre 'Game'.
    const [xIsNext, setXIsNext] = useState(true);*/

    /*En la línea que hay a continuación se establece el valor dentro
    de cada botón o celda.*/
    /*La siguiente línea se ha comentado porque se pasó al componente padre 'Game'.
    const [squares, setSquares] = useState(Array(9).fill(null));*/

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
        //aquí se activa el prop 'onPlay' que es el mismo 'activePlay'.
        onPlay(newSquares);
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

    /*Estas variables reciben un valor que al contrastarse con un condicional,
    permiten determinar que texto será renderizado.*/
    const turns = remainTurns(squares);
    const winner = calculateWinner(squares);
    
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
    <div className='GameContainer'>
        <BoardContainer board={squares} onClickBoard={handleClick}/>
        {
            winner==='X' ? 
            <div className='status' style={{color:'green'}}><b>{statusGame}!</b></div> :
            winner==='O' ?
                <div className='status' style={{color:'#933'}}><b>{statusGame}!</b></div>:
                <div className='status'style={{textAlign:"center"}}>{statusGame}</div>
        }
        <button className='btn btn-primary buttonReset' onClick={onReset}>Reiniciar</button>
    </div>
    )
}

const Game = () =>{
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [xxIsNext, setXxIsNext] = useState(true);
    const [currentMove, setCurrentMove]= useState(0);
    /*La variable currentSquares ayuda a renderizar la partida en la posición 
    del botón 'move' seleccionado previamente, sin afectar todo el historial.*/
    let currentSquares = history[currentMove];

    /*Esta función se activa solo cuando se oprime una casilla donde va 'X' u 'O'.*/
    function activePlay (squa){
        /*Aquí se resetea el history, teniendo en cuenta el currentMove solo si
        se ha oprimido una casilla. */
        const nextHistory = [...history.slice(0, currentMove +1), squa];
        setHistory(nextHistory);
        //se le resta 1 porque los arreglos empiezan desde el index 0.
        setCurrentMove(nextHistory.length - 1);
        setXxIsNext(!xxIsNext);
        
    }

    //Esta función permite hacer reset (reiniciar) a la informacion de los useStates.
    function handleReset () { 
        setCurrentMove(0);
        setHistory([Array(9).fill(null)]);
        setXxIsNext(true);
    }

    /*Con esta función se cambia el currentMove afectando la variable 
    'currentSquares', la cual se envía como una prop de nombre 'squares' 
    al componente hijo; este a su vez usa esa información para renderizar 
    los simbolos 'X' y 'O' en el tablero.*/
    function jumpTo (ind){
        setCurrentMove(ind);
        setXxIsNext(ind % 2 ===0);
    }

    const movements = history.map((item, index) => (
        index===0 ? <p key={0} className="historyTitle">
                        Game History
                    </p>:
        <li key={index} >
            <button className="btn btn-outline-dark btn-sm move"
            onClick={()=>jumpTo(index)}>
                Move N°{index}
            </button>
        </li>
    ))

    return(
        <div className="Game">
            <section>
                <GameContainer xIsNext={xxIsNext} squares={currentSquares} 
                onReset={handleReset} onPlay={activePlay}/>
            </section>
            <section>
                <ul type="circle" className="list">
                    { movements }
                </ul>
            </section>
        </div>
    )
}

export default Game;