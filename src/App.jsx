import React from "react";
import "./App.css";
import {nanoid} from "nanoid";
import Confetti from "react-confetti";
import Die from "./components/Die";

function App() {
 const [dice , setDice]=React.useState(allNewDice())
 const [tenzies, setTenzies] = React.useState(false)
    
 React.useEffect(() => {
     const allHeld = dice.every(die => die.isHeld)
     const firstValue = dice[0].value
     const allSameValue = dice.every(die => die.value === firstValue)
     if (allHeld && allSameValue) {
         setTenzies(true)
         
     }
 }, [dice])



 function generatenewDice(){
  return{ 
    value:(Math.ceil(Math.random()*6)),
    isHeld:false,
    id:nanoid()
   
  }
}
 



 function allNewDice(){ 
  const newDice=[]

  for(let i=0; i<10; i++){
    newDice.push( generatenewDice())
  }
  return newDice
 }



 function rollDice(){
  if(!tenzies){ setDice(oldDice=>oldDice.map(die =>{
    return die.isHeld?
    die :
     generatenewDice()

  }))
}
else
  {
    setTenzies(false)
setDice(allNewDice)
}
  
 }



 function holdDice(id){
  setDice(oldDice => oldDice.map(die => {
    return die.id===id?
    {...die, isHeld:!die.isHeld}:
    die
  }))
}



 const diceElements=dice.map(die => (<Die
   key={die.id}
   value={die.value}
    isHeld={die.isHeld} 
    holdDice={()=>holdDice(die.id)}
    />))

  return (
    <main>
         {tenzies && <Confetti />}
        <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die <br/> to freeze it at its current value between rolls.</p>
      <div className="dice-container">
       {diceElements}
      </div>
      <button className="roll-dice" onClick={rollDice}>
      {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
