import React, { useReducer, useEffect } from "react";
import TetrisBoard from "./components/TetrisBoard";
import { gameReducer, initialGameState } from "./reducers/gameReducer";
import { useGameLoop } from "./hooks/useGameLoop";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  useGameLoop(() => {
    dispatch({ type: "TICK" });
  }, 1000);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        dispatch({ type: "MOVE", direction: "left" });
      } else if (e.key === "ArrowRight") {
        dispatch({ type: "MOVE", direction: "right" });
      } else if (e.key === "ArrowDown") {
        dispatch({ type: "MOVE", direction: "down" });
      } else if (e.key === "ArrowUp") {
        dispatch({ type: "ROTATE" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <h1>React Tetris</h1>
      {state.isGameOver && <h2 style={{ color: "red" }}>💀 GAME OVER 💀</h2>}
      <TetrisBoard gameState={state} />
    </div>
  );
};

export default App;
