import { useEffect, useState } from 'react'
import { useGameStateStore } from '../../Stores/Stores'
import './GameHeader.css'

export function GameHeader(){

  // State ================================================================== //
  
  const [isGameOver, setGameOver] = useGameStateStore((state:any) => [state.isGameOver, state.setGameOver])
  const [setNewGame] = useGameStateStore((state:any) => [state.setNewGame])

  // Methods ================================================================== //

  const [timeElapsedMinutes,setTimeElapsedMinues] = useState(0)
  const [timeElapsedSeconds,setTimeElapsedSeconds] = useState(0)

  const [isActive, setIsActive] = useState(false);

  // useEffect(()=>{
    
    
    
  // },[])

  function newGameHandler(){
    
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
        <p className='header-side-container'>{timeElapsedMinutes}:{timeElapsedSeconds}</p>
      </div>
    
    </>
  )
}