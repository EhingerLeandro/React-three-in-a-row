// import { useState } from "react";
import './BoardContainer.css'
import Slot from '../Slot/Slot';

const BoardContainer = (props) =>{
    return (
        <div className='board'>
            {/*En la siguiente línea de código se renderiza en una lista los botones,
            usando la función .map() aprovechando que también se puede sacar el indice
            de cada item del arreglo*/}
            {props.board.map((slot, index)=>{
            return <Slot key={index} indice={index} valueSquare={props.board[index]} lastClick={props.onClickBoard}/>
            })}
        </div>
        
    )
}

export default BoardContainer;