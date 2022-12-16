import { useState } from 'react';
import { useGameStateStore } from '../../Stores/Stores';
import { GameGrid } from '../GameGrid/GameGrid';
import { GameHeader } from '../GameHeader/GameHeader';
import './App.css';

function App() {

  // Render ================================================================== //

  return (
    <div className="App" onContextMenu={()=>{return false}} onSelect={()=>{return false}} onCopy={()=>{return false}} onCut={()=>{return false}} onPaste={()=>{return false}}>
      {/* <header className="App-header">
      </header> */}
      <div className='app-container'>
        
        <GameHeader/>
        
        <GameGrid/>

      </div>
    </div>
  );
}

export default App;
