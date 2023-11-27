// import { useState } from "react";
import '../Slot/Slot.css';


const Slot = ({indice, valueSquare, lastClick}) =>{
    return(
            <button className='buttonCell' onClick={()=>lastClick(indice)}>
                {
                valueSquare ==='X'?
                <b style={{color:'green'}}>X</b>:
                valueSquare ==='O'?
                    <b style={{color:'red'}}>O</b>:
                    <b></b>
                }
            </button>
    )
}

export default Slot;