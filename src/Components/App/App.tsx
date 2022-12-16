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

        <h1 id='title'>Reactsweeper</h1>
        
        <GameHeader/>
        
        <GameGrid/>
        
        <br/>
        <p className='p-text'>Instructions:</p>
        <p className='p-text'>
          Minesweeper is a game of logical intuition.
          <br/><br/> Click on a cell to see what's under it.
          <br/><br/> Numbered cells indicate how many surrounding cells contain mines.
          <br/><br/> If you click a mine, you lose.
          <br/><br/> Hold down a cell to place a flag if you believe it contains a mine.
        
        </p>
      </div>
    </div>
  );
}

export default App;
