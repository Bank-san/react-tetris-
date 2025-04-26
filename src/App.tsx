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
    if (state.isGameOver) return;

    const timer = setInterval(() => {
      dispatch({ type: "TIME_TICK" });
    }, 1000); // 1秒ごとに time +1

    return () => clearInterval(timer);
  }, [state.isGameOver]);

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
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.isGameOver]);

  const { holdPiece, queue, score, lines, level, time } = state;

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

        <h2>STATS</h2>
        <h2>Time: {state.time}s</h2>

        <GameStats lines={lines} level={level} time={time} score={score} />
      </div>
    </div>
  );
};

export default App;
