import create from "zustand";
import { randomIntFromInterval } from "../utils";

export const useGameStateStore = create(set => ({
  gameState: [
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank'],
    ['blank','blank','blank','blank','blank','blank','blank','blank']
  ],
  setGameState: (newState:any) => set((state:any) => ({ gameState: newState })),

  mineCoordinates: generateMineCoordinates(),
  setMineCoordinates: (newState:any) => set((state:any) => ({ mineCoordinates: newState })),

  isGameOver: false,
  setGameOver: (newState:boolean) => set((state:any) => ({ isGameOver: newState })),

  newGame: false,
  setNewGame: () => set((state:any) => ({ newGame: !state.newGame })),
}))

function generateMineCoordinates(){
  // Create empty array for coordinate pairs
  let tempMineLocations = []
  // Generate 8 pairs of coordinates
  for (let i=0; i<8; i++){
    const rndIntPair = [randomIntFromInterval(0, 7),randomIntFromInterval(0, 7)]
    // Push pair into temp array
    tempMineLocations.push(rndIntPair)
  }
  return tempMineLocations
}