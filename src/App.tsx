import React, { useReducer, useEffect } from "react";
import { gameReducer, initialGameState } from "./reducers/gameReducer";
import HoldPiece from "./components/HoldPiece";
import NextPieces from "./components/NextPieces";
import GameStats from "./components/GameStats";
import TetrisBoard from "./components/TetrisBoard";
import StartScreen from "./components/StartScreen";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);

  const speed = Math.max(1000 - (state.level - 1) * 100, 100);

  // 落下タイマー
  useEffect(() => {
    if (state.isGameOver || !state.isStarted) return;

    const fallTimer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, speed);

    return () => clearInterval(fallTimer);
  }, [state.isGameOver, state.level, state.isStarted]);

  // 経過時間タイマー
  useEffect(() => {
    if (state.isGameOver || !state.isStarted) return;

    const timeTimer = setInterval(() => {
      dispatch({ type: "TIME_TICK" });
    }, 1000);

    return () => clearInterval(timeTimer);
  }, [state.isGameOver, state.isStarted]);

  // キー操作
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.isGameOver || !state.isStarted) return;

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
        case " ":
          dispatch({ type: "ROTATE" });
          break;
        case "Shift":
          dispatch({ type: "HOLD" });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.isGameOver, state.isStarted]);

  const { holdPiece, queue, score, lines, level, time } = state;

  if (!state.isStarted) {
    return <StartScreen onStart={() => dispatch({ type: "START_GAME" })} />;
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "3rem",
        height: "100vh",
      }}
    >
      {/* 左: HOLD */}
      <div>
        <h2>HOLD</h2>
        <HoldPiece piece={holdPiece} />
      </div>

      {/* 中央: メインボード */}
      <div>
        <h1 style={{ color: "#fff" }}>React Tetris</h1>
        <TetrisBoard gameState={state} />
      </div>

      {/* 右: NEXTとSTATS */}
      <div>
        <h2>NEXT</h2>
        <NextPieces queue={queue} />

        <h2>STATS</h2>
        <GameStats lines={lines} level={level} time={time} score={score} />
      </div>
    </div>
  );
};

export default App;
