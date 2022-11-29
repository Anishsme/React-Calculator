import { useReducer } from "react";
import "./index.css";
import DigitButton from "./DigitButton";
import { OperationButton } from "./OperationButton";
export const ACTIONS={
  CLEAR:"clear",
  ADD_OPERATOR:"add_operator",
  ADD_DIGIT:"add_digit",
  DELETE:"delete",
  FINAL:"final"
}

const reducer=(state,{type,payload})=>{
  switch(type){
    case ACTIONS.CLEAR:
      return{...state,current:"",previous:"",operation:"",hidden:""}
    case ACTIONS.ADD_OPERATOR:
      return{...state,previous:state.current,operation:`${payload.operation}`,current:"",hidden:""}
    case ACTIONS.DELETE:
      return{...state,current:state.current.slice(0,-1)}
    case ACTIONS.ADD_DIGIT:
      
      if(payload.num==="0" && state.current==="0"){
        
          return {...state}
      }
      if(payload.num==="." && state.current.includes(".")){
        return {...state}
      }
      return {...state,current:`${state.current || ""}${payload.num}`,hidden:""}
    case ACTIONS.FINAL:
      // if(state.current==="" && state.previous===""){return {...state}}
      console.log(state.current)
      let ans=evaluate(state.previous,state.operation,state.current)
      console.log(ans)
      return {...state,hidden:state.current,current:ans}
  }
}

const evaluate=(p,o,c)=>{
  let a=null;
  let x=parseFloat(p)
  let y=parseFloat(c)
  if(o==="/"){
    a=x/y
  }
  else if(o==="*"){
    a=x*y
  }
  else if(o==="+"){
    a=x+y
  }
  else{
    a=x-y
  }
  return a.toString();

}

function App() {
 const [{current,operation,previous,hidden},dispatch]=useReducer(reducer,{})
  return (<div className="calc-body">
    <div className="result-area">
      <div className="pre-result">{previous}{operation}{hidden}</div>
      <div className="current-list">{current}</div>
    </div>
    {/* First row */}
    <button className="span-2" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
    <button onClick={()=>dispatch({type:ACTIONS.DELETE})}>Delete</button>
    {/* <button>➗</button> */}
    <OperationButton operation="/" dispatch={dispatch}></OperationButton>
    {/* Second row */}
    {/* <button>7</button> */}
    <DigitButton num="7" dispatch={dispatch} ></DigitButton>
    <DigitButton num="8" dispatch={dispatch} ></DigitButton>
    <DigitButton num="9" dispatch={dispatch} ></DigitButton>
    <OperationButton operation="*" dispatch={dispatch}></OperationButton>
    {/* Third row */}
    <DigitButton num="4" dispatch={dispatch} ></DigitButton>
    <DigitButton num="5" dispatch={dispatch} ></DigitButton>
    <DigitButton num="6" dispatch={dispatch} ></DigitButton>
    
    <OperationButton operation="-" dispatch={dispatch}></OperationButton>
  {/* Fourth row */}
  <DigitButton num="1" dispatch={dispatch} ></DigitButton>
  <DigitButton num="2" dispatch={dispatch} ></DigitButton>
  <DigitButton num="3" dispatch={dispatch} ></DigitButton>
    <OperationButton operation="+" dispatch={dispatch}></OperationButton>
    {/* Fifth row */}
    <DigitButton num="0" dispatch={dispatch} className="span-2"></DigitButton>
    <DigitButton num="." dispatch={dispatch} ></DigitButton>
    <button onClick={()=>dispatch({type:ACTIONS.FINAL})}>=</button>
  </div>);
}

export default App;
