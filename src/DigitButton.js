import { ACTIONS } from "./App"
const DigitButton=({num,dispatch,className})=>{
    // console.log(num)
    // console.log(ACTIONS.ADD_DIGIT)
    return(<button onClick={()=>dispatch({type:ACTIONS.ADD_DIGIT,payload:{num}})} className={className}>{num}</button>)
}
// onClick={dispatch({type:ACTIONS.ADD_DIGIT,payload:num})}
export default DigitButton