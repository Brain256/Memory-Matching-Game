import { useState } from 'react'
import './App.css'
import Cards from './Cards.jsx'

function App() {

  const [score, setScore] = useState(0); 
  const [highestScore, setHighestScore] = useState(0); 

  return (
    <>
     <h1>Memory Card Game</h1>
     <p>Each turn pick a card and try not to click any cards you have already clicked</p>
     <h2>Score: {score} </h2>
     <h2>Highest Score: {highestScore} </h2>

     <div className="card-container">
      <Cards score={score} setScore={setScore} highestScore={highestScore} setHighestScore={setHighestScore}/>
     </div>
    </>
  )
}

export default App
