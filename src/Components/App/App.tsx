import { useState } from 'react';
import { useGameStateStore } from '../../Stores/Stores';
import { GameGrid } from '../GameGrid/GameGrid';
import { GameHeader } from '../GameHeader/GameHeader';
import './App.css';

function App() {
  
  // Render ================================================================== //

  return (
    <div className="App">
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