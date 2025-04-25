import React, { useReducer } from "react";
import TetrisBoard from "./components/TetrisBoard";
import { gameReducer, initialGameState } from "./reducers/gameReducer";
import { useGameLoop } from "./hooks/useGameLoop";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  useGameLoop(() => {
    dispatch({ type: "TICK" });
  }, 1000);

  return (
    <div>
      <h1>React Tetris</h1>
      <TetrisBoard gameState={state} />
    </div>
  );
};

export default App;
