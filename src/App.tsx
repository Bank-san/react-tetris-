import React, { useReducer, useEffect } from "react";
import { gameReducer, initialGameState } from "./reducers/gameReducer";
import HoldPiece from "./components/HoldPiece";
import NextPieces from "./components/NextPieces";
import GameStats from "./components/GameStats";
import TetrisBoard from "./components/TetrisBoard";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const speed = Math.max(1000 - (state.level - 1) * 100, 100);

  // ピース落下タイマー
  useEffect(() => {
    if (state.isGameOver) return;
    const fallTimer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, speed);
    return () => clearInterval(fallTimer);
  }, [state.isGameOver, state.level]);

  // 経過時間タイマー
  useEffect(() => {
    if (state.isGameOver) return;
    const timeTimer = setInterval(() => {
      dispatch({ type: "TIME_TICK" });
    }, 1000);
    return () => clearInterval(timeTimer);
  }, [state.isGameOver]);

  // キー操作
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
          dispatch({ type: "HARD_DROP" });
          break;
        case "Shift":
          dispatch({ type: "HOLD" });
          break;
        case " ":
          dispatch({ type: "ROTATE" });
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.isGameOver]);

  const { holdPiece, queue, score, lines, level, time } = state;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "3rem",
        backgroundColor: "#111",
        color: "#fff",
      }}
    >
      {/* 左: HOLD */}
      <div style={{ textAlign: "center" }}>
        <h2>HOLD</h2>
        <HoldPiece piece={holdPiece} />
      </div>

      {/* 中央: メインボード */}
      <div style={{ textAlign: "center" }}>
        <h1 style={{ marginBottom: "1rem" }}>React Tetris</h1>
        <TetrisBoard gameState={state} />
      </div>

      {/* 右: NEXTとSTATS */}
      <div style={{ textAlign: "center" }}>
        <h2>NEXT</h2>
        <NextPieces queue={queue} />
        <h2 style={{ marginTop: "2rem" }}>STATS</h2>
        <GameStats lines={lines} level={level} time={time} score={score} />
      </div>
    </div>
  );
};

export default App;
