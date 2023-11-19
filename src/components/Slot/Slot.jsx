// import { useState } from "react";
import '../Slot/Slot.css';


const Slot = ({indice, valueSquare, lastClick}) =>{
    return(
            <button className='buttonCell' onClick={()=>lastClick(indice)}>{valueSquare}</button>
    )
    
}

export default Slot;