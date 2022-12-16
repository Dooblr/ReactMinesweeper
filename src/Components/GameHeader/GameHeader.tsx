import { useEffect, useState } from 'react'
import { useGameStateStore } from '../../Stores/Stores'
import { addLeadingZeros } from '../../utils'
import './GameHeader.css'

export function GameHeader(){

  // State ================================================================== //
  
  const [isGameOver, setGameOver] = useGameStateStore((state:any) => [state.isGameOver, state.setGameOver])
  const [newGame,setNewGame] = useGameStateStore((state:any) => [state.newGame, state.setNewGame])

  const [timeElapsedMinutes,setTimeElapsedMinues] = useState(0)
  const [timeElapsedSeconds,setTimeElapsedSeconds] = useState(0)

  const [flagsRemaining, setFlagsRemaining] = useGameStateStore((state:any) => [state.flagsRemaining,state.setFlagsRemaining])

  const [playerWon, setPlayerWon] = useGameStateStore((state:any) => [state.playerWon, state.setPlayerWon])

  useEffect(()=>{
    // Start a timer on header load
    const interval = setInterval(() => {
      // Reset to 0 after 59
      if (timeElapsedSeconds > 58){
        setTimeElapsedSeconds(0)
        setTimeElapsedMinues(timeElapsedMinutes + 1)
      } else {
        setTimeElapsedSeconds(timeElapsedSeconds + 1)
      }
    }, 1000);
    return () => clearInterval(interval);
  },[timeElapsedSeconds])

  // Methods ================================================================== //

  function newGameHandler(){
    
    setTimeElapsedMinues(0)
    setTimeElapsedSeconds(0)

    setGameOver(false)

    setFlagsRemaining(8)

    setNewGame()
  }

  // Render ================================================================== //

  return(
    <>
    
      <div className="game-header-container flex-between">
        <p className='header-side-container'>{flagsRemaining}  🚩</p>
        <button className='header-center-button' onClick={newGameHandler}>
          {(!isGameOver && !playerWon) &&
            <>🙂</>
          }
          {isGameOver &&
            <>☠️</>
          }

          {playerWon && 
            <>😎</>
          }
        </button>
        <p className='header-side-container'>{timeElapsedMinutes}:{addLeadingZeros(timeElapsedSeconds, 2)}</p>
      </div>
    
    </>
  )
}