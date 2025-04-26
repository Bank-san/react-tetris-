import React, { useReducer, useEffect } from "react";
import TetrisBoard from "./components/TetrisBoard";
import NextPiece from "./components/NextPiece";
import { gameReducer, initialGameState } from "./reducers/gameReducer";
import { useGameLoop } from "./hooks/useGameLoop";
import { TETROMINOES } from "./data/Tetrominoes";
import NextPieceSimple from "./components/NextPieceSimple";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  useGameLoop(() => {
    if (!state.isGameOver) {
      dispatch({ type: "TICK" });
    }
  }, 1000);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isGameOver) return;

      switch (e.key) {
        case "ArrowLeft":
          dispatch({ type: "MOVE", direction: "left" });
          break;
        case "ArrowRight":
          dispatch({ type: "MOVE", direction: "right" });
          break;
        case "ArrowDown":
          dispatch({ type: "MOVE", direction: "down" });
          break;
        case "ArrowUp":
          dispatch({ type: "ROTATE" });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [state.isGameOver]);

  const nextKey = state.queue[0];
  const nextTetromino = TETROMINOES[nextKey];

  return (
    <div style={{ display: "flex", gap: "2rem" }}>
      <div>
        <h1>React Tetris</h1>
        <h2>Score: {state.score}</h2>
        {state.isGameOver && <h2 style={{ color: "red" }}>💀 GAME OVER 💀</h2>}
        <TetrisBoard gameState={state} />
      </div>
      <div>
        <h2>next</h2>
        {nextKey && <NextPieceSimple type={nextKey} />}
      </div>
    </div>
  );
};

export default App;
