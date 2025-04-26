import React, { useReducer, useEffect } from "react";
import TetrisBoard from "./components/TetrisBoard";

import { gameReducer, initialGameState } from "./reducers/gameReducer";
import { useGameLoop } from "./hooks/useGameLoop";

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
          e.preventDefault();
          dispatch({ type: "MOVE", direction: "left" });
          break;
        case "ArrowRight":
          e.preventDefault();
          dispatch({ type: "MOVE", direction: "right" });
          break;
        case "ArrowDown":
          e.preventDefault();
          dispatch({ type: "MOVE", direction: "down" });
          break;
        case "ArrowUp":
          e.preventDefault();
          dispatch({ type: "ROTATE" });
          break;
        case "Shift":
          e.preventDefault(); // 🆕 ここ超大事！
          dispatch({ type: "HOLD" });
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

        <h2>hold</h2>
        {state.holdPiece ? (
          <NextPieceSimple type={state.holdPiece.name} />
        ) : (
          <div
            style={{
              width: "80px",
              height: "80px",
              backgroundColor: "#222",
              border: "2px solid #888",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              color: "#666",
              fontSize: "14px",
            }}
          >
            EMPTY
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
