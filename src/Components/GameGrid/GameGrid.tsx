import { useEffect, useState } from "react";
import explosionImage from '../../Assets/explosion.png';
import flagImage from '../../Assets/flag.png';
import mineImage from '../../Assets/mine.png';
import { useGameStateStore } from "../../Stores/Stores";
import { multiArrayContainsArray, uuidv4 } from "../../utils";

export function GameGrid(){

  // State ================================================================== //

  const [gameState,setGameState] = useGameStateStore((state:any) => [state.gameState, state.setGameState])

  const [mineCoordinates, setMineCoordinates] = useGameStateStore((state:any) => [state.mineCoordinates, state.setMineCoordinates])

  const [isGameOver, setGameOver] = useGameStateStore((state:any) => [state.isGameOver, state.setGameOver])
  
  const [newGame] = useGameStateStore((state:any) => [state.newGame])

  // Watchers ======= //

  useEffect(()=>{
    setGameState(
      [
        ['blank','blank','blank','blank','blank','blank','blank','blank'],
        ['blank','blank','blank','blank','blank','blank','blank','blank'],
        ['blank','blank','blank','blank','blank','blank','blank','blank'],
        ['blank','blank','blank','blank','blank','blank','blank','blank'],
        ['blank','blank','blank','blank','blank','blank','blank','blank'],
        ['blank','blank','blank','blank','blank','blank','blank','blank'],
        ['blank','blank','blank','blank','blank','blank','blank','blank'],
        ['blank','blank','blank','blank','blank','blank','blank','blank']
      ]
    )
  },[newGame])
  
  // Handlers ================================================================== //
  
  // Set current time on mousedown. If ms exceeds 100 has transpired since mousedown, register as long press
  const [mouseDownTime,setMouseDownTime] = useState(0)
  function handleCellMouseDown(){ setMouseDownTime(Date.now()) }
  
  function handleCellMouseUp(rowIndex:number, columnIndex:number, cellText:string){

    // Get the ms since mousedown
    const clickDuration = Date.now() - mouseDownTime

    // Create a copy of the game state
    let tempGameState = gameState
    
    // Click
    if (clickDuration <= 300){
      handleCellClick(rowIndex,columnIndex)
    } 
    // Long press
    else {
      // Do nothing if it's a numbered cell
      if ( isNaN(parseInt(cellText)) ){
        // if it's a flag return it to blank
        if (tempGameState[rowIndex][columnIndex] === 'flag'){
          tempGameState[rowIndex][columnIndex] = 'blank'
        } else {
          // Set it to flag state
          tempGameState[rowIndex][columnIndex] = 'flag'
        }
        // Update state
        setGameState(tempGameState)
      }
    }
  }

  function handleCellClick(rowIndex:number, columnIndex:number){

    // if a mine is not hit, continue with numbering fn
    let playerDied = false

    // Player died check
    mineCoordinates.forEach((mineCoordinate:[number,number])=>{
      if (rowIndex === mineCoordinate[0] && columnIndex === mineCoordinate[1]){
        let tempState = gameState
        tempState[rowIndex][columnIndex] = 'explosion'
        setGameState(tempState)
        gameOver()
        playerDied = true
      }
    })
    
    // Player hit an empty square
    if (gameState[rowIndex][columnIndex] === 'blank' && !playerDied){
      let tempGameState = gameState
      
      const surroundingMinesCount = getNumberOfSurroundingMines(rowIndex,columnIndex)

      if (surroundingMinesCount === 0){
        tempGameState[rowIndex][columnIndex] = 'clicked'
        const surroundingCells = getCellsAroundClick(rowIndex,columnIndex)
        surroundingCells.forEach((cell)=>{
          handleCellClick(cell.row,cell.column)
        })
      } else {
        tempGameState[rowIndex][columnIndex] = surroundingMinesCount.toString()
      }

      // set cell state to number of surrounding mines
      setGameState(tempGameState)
    } 
  }

  function gameOver(){
    console.log('game over!');
    let tempGameState = gameState
    mineCoordinates.forEach((mineCoord:[number,number])=>{
      const row = mineCoord[0]
      const column = mineCoord[1]
      // Show mines except for clicked explosion space
      if (tempGameState[row][column] !== 'explosion'){
        tempGameState[row][column] = 'mine'
      }
      
      setGameState(tempGameState)
    })
    
    setGameOver(true)
  }

  // Methods ================================================================== //

  function getCellsAroundClick(rowIndex:number, columnIndex:number){

    const surroundingCells = [
      // Above
      {row:rowIndex-1,
        column:columnIndex-1,
        cellText:gameState[rowIndex-1]?.[columnIndex-1],
        isMine:multiArrayContainsArray(mineCoordinates,[rowIndex-1,columnIndex-1])
      },
      {row:rowIndex-1,
        column:columnIndex,
        cellText:gameState[rowIndex-1]?.[columnIndex],
        isMine:multiArrayContainsArray(mineCoordinates,[rowIndex-1,columnIndex])
      },
      {row:rowIndex-1,
        column:columnIndex+1,
        cellText:gameState[rowIndex-1]?.[columnIndex+1],
        isMine:multiArrayContainsArray(mineCoordinates,[rowIndex-1,columnIndex+1])
      },
      
      // Inline
      {row:rowIndex,
        column:columnIndex-1,
        cellText:gameState[rowIndex]?.[columnIndex-1],
        isMine:multiArrayContainsArray(mineCoordinates,[rowIndex,columnIndex-1])
      },
      {row:rowIndex,
        column:columnIndex+1,
        cellText:gameState[rowIndex]?.[columnIndex+1],
        isMine:multiArrayContainsArray(mineCoordinates,[rowIndex,columnIndex+1])
      },

      // Row below
      {row:rowIndex+1,
        column:columnIndex-1,
        cellText:gameState[rowIndex+1]?.[columnIndex-1],
        isMine:multiArrayContainsArray(mineCoordinates,[rowIndex+1,columnIndex-1])
      },
      {row:rowIndex+1,
        column:columnIndex,
        cellText:gameState[rowIndex+1]?.[columnIndex],
        isMine:multiArrayContainsArray(mineCoordinates,[rowIndex+1,columnIndex])
      },
      {row:rowIndex+1,
        column:columnIndex+1,
        cellText:gameState[rowIndex+1]?.[columnIndex+1],
        isMine:multiArrayContainsArray(mineCoordinates,[rowIndex+1,columnIndex+1])
      },
    ]

    let filteredCells = surroundingCells.filter((cell) => cell.cellText !== undefined)
    
    return filteredCells
  }

  function getNumberOfSurroundingMines(rowIndex:number,columnIndex:number){
    let adjacentMineCount = 0
    
    getCellsAroundClick(rowIndex, columnIndex).forEach((surroundingCell:any)=>{
      if (surroundingCell.isMine === true){
        adjacentMineCount = adjacentMineCount + 1
      }
    })
    return adjacentMineCount
  }

  // Render ================================================================== //

  function renderNumberedCellDiv(surroundingMinesCount:string) {
    switch(surroundingMinesCount) {
      case '0':
        return <div className='cell cell-number' style={{color:'black'}}>0</div>;
      case '1':
        return <div className='cell cell-number' style={{color:'blue'}}>1</div>;
      case '2':
        return <div className='cell cell-number' style={{color:'green'}}>2</div>;
      case '3':
        return <div className='cell cell-number' style={{color:'red'}}>3</div>;
      case '4':
        return <div className='cell cell-number' style={{color:'purple'}}>4</div>;
      case '5':
        return <div className='cell cell-number' style={{color:'maroon'}}>5</div>;
      case '6':
        return <div className='cell cell-number' style={{color:'turquoise'}}>6</div>;
      case '7':
        return <div className='cell cell-number' style={{color:'black'}}>7</div>;
      case '8':
        return <div className='cell cell-number' style={{color:'gray'}}>8</div>;  
    }
  }

  return(
    <>
      {gameState.map((row:any,rowIndex:any)=>{
          
          return(
            <div key={uuidv4()} className='cell-row'>
              {row.map((cellText:any,columnIndex:any)=>{
                
                return (
                  <button key={uuidv4()} className='cell-button' onMouseDown={handleCellMouseDown} onMouseUp={()=>handleCellMouseUp(rowIndex,columnIndex,cellText)} >
                    {cellText === 'mine' && <div className='cell'> <img className='mine-img' src={mineImage}/> </div>}
                    {cellText === 'explosion' && <div className='cell'> <img className='explosion-img' src={explosionImage}/> </div>}
                    {cellText === 'blank' && <div className='cell'> </div>}
                    {cellText === 'clicked' && <div className='cell cell-clicked'> </div>}
                    {!isNaN(parseInt(cellText)) && renderNumberedCellDiv(cellText)}
                    {cellText === 'flag' && <div className='cell cell-flag'> <img className='flag-img' src={flagImage}/> </div>}
                  </button>
                  
                )
              })}
            </div>
          )
        })}
    </>
  )
}