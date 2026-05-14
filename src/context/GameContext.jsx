import { createContext, useContext } from 'react';
import useGameEngine from '../hooks/useGameEngine.js';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const game = useGameEngine();
  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used inside GameProvider');
  }
  return context;
}
