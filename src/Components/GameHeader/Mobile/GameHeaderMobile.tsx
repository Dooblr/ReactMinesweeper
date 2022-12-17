import { useEffect, useState } from 'react'
import { useGameStateStore } from '../../../Stores/Stores'
import { addLeadingZeros } from '../../../utils'
import './GameHeaderMobile.css'

export function GameHeaderMobile(){

  // State ================================================================== //
  
  const [isGameOver, setGameOver] = useGameStateStore((state:any) => [state.isGameOver, state.setGameOver])
  const setNewGame = useGameStateStore((state:any) => state.setNewGame)

  const [timeElapsedMinutes,setTimeElapsedMinues] = useState(0)
  const [timeElapsedSeconds,setTimeElapsedSeconds] = useState(0)

  const [flagsRemaining, setFlagsRemaining] = useGameStateStore((state:any) => [state.flagsRemaining,state.setFlagsRemaining])

  const [playerWon,setPlayerWon] = useGameStateStore((state:any) => [state.playerWon, state.setPlayerWon])

  const [flagMode,setFlagMode] = useGameStateStore((state:any) => [state.flagMode, state.setFlagMode])

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
    }, 1000)

    // Stop timer if player wins or loses
    if(playerWon || isGameOver){
      clearInterval(interval)
    }
    return () => clearInterval(interval);
  },[timeElapsedSeconds, playerWon, isGameOver])

  // Methods ================================================================== //

  function newGameHandler(){
    
    setTimeElapsedMinues(0)
    setTimeElapsedSeconds(0)

    setGameOver(false)

    setPlayerWon(false)

    // TODO: Dynamic board size
    setFlagsRemaining(8)

    setNewGame()
  }

  function getClassName(){
    if(flagMode){
      return 'header-side-container flag-points flag-button-active'
    } else {
      return 'header-side-container flag-points'
    }
  }

  // Render ================================================================== //

  return(
    <>
    
      <div className="game-header-container-mobile mobile flex-between">
        <button onClick={setFlagMode(!flagMode)} className={'header-side-container flag-points'}>{flagsRemaining}  🚩</button>
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