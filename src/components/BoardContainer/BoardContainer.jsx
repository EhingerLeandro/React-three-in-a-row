// import { useState } from "react";
import './BoardContainer.css'
import Slot from '../Slot/Slot';

const BoardContainer = (props) =>{
    return (
        <div className='board'>
            {props.board.map((slot, index)=>{
            return <Slot key={index} indice={index} valueSquare={props.board[index]} lastClick={props.onClickBoard}/>
            })}
        </div>
        
    )
}

export default BoardContainer;