import { useEffect, useState } from 'react';
import { GameGrid } from '../GameGrid/GameGrid';
import { GameHeader } from '../GameHeader/GameHeader';
import './App.css';

function App() {

  const [isApprovedDevice,setIsApprovedDevice] = useState(true)

  useEffect(()=>{
    console.log(window.navigator.userAgent)
    
    if(window.navigator.userAgent.includes('iPhone') || window.navigator.userAgent.includes('Android') || (!window.navigator.userAgent.includes('Macintosh') && window.navigator.userAgent.includes('Safari'))){
      setIsApprovedDevice(false)
    }
  },[])

  // Render ================================================================== //

  return (
    <div className="App" onContextMenu={()=>{return false}} onSelect={()=>{return false}} onCopy={()=>{return false}} onCut={()=>{return false}} onPaste={()=>{return false}}>
      {/* <header className="App-header">
      </header> */}
      <div className='app-container'>

        <h1 id='title'>Reactsweeper</h1>
        
        {isApprovedDevice && 
        <>
          <GameHeader/>
          <GameGrid/>
          <br/>
          <p className='p-text'>Instructions:</p>
          <p className='p-text'>
            Minesweeper is a game of logical intuition.
            <br/><br/> Click on a cell to see what's under it.
            <br/><br/> Numbered cells indicate how many surrounding cells contain mines.
            <br/><br/> If you click a mine, you lose.
            <br/><br/> Hold down a cell to place a flag.
          
          </p>
        </>
        }

        {!isApprovedDevice && 
        <>
          <br/><br/><br/>
          <p className='p-text'>Mobile and Safari are currently unsupported. Please load on a desktop in Chrome, Firefox, or Edge.</p>
        </>
        }

        
        
      </div>
    </div>
  );
}

export default App;
