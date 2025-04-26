import React, { useReducer, useEffect } from "react";
import TetrisBoard from "./components/TetrisBoard";
import { gameReducer, initialGameState } from "./reducers/gameReducer";
import { useGameLoop } from "./hooks/useGameLoop";
import HoldPiece from "./components/HoldPiece";
import NextPieces from "./components/NextPieces";
import GameStats from "./components/GameStats";

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
        case "Shift":
          dispatch({ type: "HOLD" });
          break;
        case " ":
          dispatch({ type: "HARD_DROP" });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.isGameOver]);

  const { holdPiece, queue, score } = state;

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
      {/* --- 左：HOLD --- */}
      <div>
        <h2>HOLD</h2>
        <HoldPiece piece={holdPiece} />
      </div>

      {/* --- 中央：メインボード --- */}
      <div>
        <h1 style={{ color: "#fff" }}>React Tetris</h1>
        <TetrisBoard gameState={state} />
      </div>

      {/* --- 右：NEXTとSTATS --- */}
      <div>
        <h2>NEXT</h2>
        <NextPieces queue={queue} />
        <GameStats
          lines={0} // ← あとでステート追加してOK
          level={1} // ← ここも後で
          time={0} // ← タイマー機能追加で入れる
          score={score}
        />
      </div>
    </div>
  );
};

export default App;
