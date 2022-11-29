import { ACTIONS } from "./App";

export const OperationButton=({operation,dispatch})=>{
        return(
            <button onClick={()=>dispatch({type:ACTIONS.ADD_OPERATOR,payload:{operation}})}>{operation}</button>
        )
}