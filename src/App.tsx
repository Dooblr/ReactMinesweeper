import { useEffect, useState } from 'react';
import './App.css';
import mineImage from './Assets/mine.png'

export function uuidv4() {
  // @ts-ignore-next-line
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
  // @ts-ignore-next-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
export function randomIntFromInterval(min:any, max:any) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}



function App() {
  const [firstRun,setFirstRun] = useState(true)
  const [mineCoordinates, setMineCoordinates] = useState([[0,0]])
  const [gameState, setGameState] = useState([
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank']
  ])
  const [reload,setReload] = useState(false)

  useEffect(()=>{
    let mineLocations = generateMineCoordinates()
    setMineCoordinates(mineLocations)
  },[])

  useEffect(()=>{
    if(!firstRun){
      console.log('minecoords',mineCoordinates)
      
      let tempGameState = gameState
      mineCoordinates.forEach((mineCoord)=>{
        const row = mineCoord[0]
        const column = mineCoord[1]
        tempGameState[row][column] = 'mine'
        console.log('new gamestate',tempGameState);
        
        setGameState(tempGameState)
        // console.log(mineCoord);
        setReload(!reload)
      })
    }
    setFirstRun(false)
  },[mineCoordinates])

  function generateMineCoordinates(){
    // Create empty array for coordinate pairs
    let tempMineLocations: number[][] = []
    // Generate 8 pairs of coordinates
    for (let i=0; i<8; i++){
      const rndIntPair = [randomIntFromInterval(0, 7),randomIntFromInterval(0, 7)]
      // Push pair into temp array
      tempMineLocations.push(rndIntPair)
    }
    return tempMineLocations
  }

  

  function handleCellClick(row:any, rowIndex:any, column:any, columnIndex:any){
    // console.log(row,column);
    console.log('cell coords:', rowIndex, columnIndex);
    
  }

  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <div className='app-container'>
        <>
        {gameState.map((row,rowIndex)=>{
          
          
          return(
            <div key={uuidv4()}>
              {row.map((column,columnIndex)=>{
                console.log(column);
                
                return (
                  // <div key={uuidv4()}>
                  <button key={uuidv4()} className='default-cell' onClick={()=>{handleCellClick(row,rowIndex,column,columnIndex)}}>
                    {column === 'mine' && <> <img src={mineImage} className='icon-image'/> </>}
                    {column === 'blank' && <>  </>}
                  </button>
                  // </div>
                )
              })}
            </div>
          )
        })}
        </>
        {/* <button className='default-cell'>
            
        </button> */}

      </div>
    </div>
  );
}

export default App;
