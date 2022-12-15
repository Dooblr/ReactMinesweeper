import { useEffect, useState } from 'react'
import { useGameStateStore } from '../../Stores/Stores'
import { addLeadingZeros } from '../../utils'
import './GameHeader.css'

export function GameHeader(){

  // State ================================================================== //
  
  const [isGameOver, setGameOver] = useGameStateStore((state:any) => [state.isGameOver, state.setGameOver])
  const [newGame,setNewGame] = useGameStateStore((state:any) => [state.newGame, state.setNewGame])

  // Methods ================================================================== //

  const [timeElapsedMinutes,setTimeElapsedMinues] = useState(0)
  const [timeElapsedSeconds,setTimeElapsedSeconds] = useState(0)

  const [isActive, setIsActive] = useState(false);

  useEffect(()=>{
    const interval = setInterval(() => {
      if (timeElapsedSeconds > 58){
        setTimeElapsedSeconds(0)
        setTimeElapsedMinues(timeElapsedMinutes + 1)
      } else {
        setTimeElapsedSeconds(timeElapsedSeconds + 1)
      }
    }, 1000);
    return () => clearInterval(interval);
  },[timeElapsedSeconds])

  function newGameHandler(){
    setTimeElapsedMinues(0)
    setTimeElapsedSeconds(0)
    setGameOver(false)
    setNewGame()
  }
  return(
    <>
    
      <div className="game-header-container flex-between">
        <p className='header-side-container'>0  🚩</p>
        <button className='header-center-button' onClick={newGameHandler}>
          {!isGameOver &&
            <>🙂</>
          }
          {isGameOver &&
            <>🙂</>
          }
        </button>
        <p className='header-side-container'>{timeElapsedMinutes}:{addLeadingZeros(timeElapsedSeconds, 2)}</p>
      </div>
    
    </>
  )
}