import React, { useReducer, useEffect, useState } from "react"; // ← useState追加！
import { gameReducer, initialGameState } from "./reducers/gameReducer";
import HoldPiece from "./components/HoldPiece";
import NextPieces from "./components/NextPieces";
import GameStats from "./components/GameStats";
import TetrisBoard from "./components/TetrisBoard";
import StartScreen from "./components/StartScreen"; // ← スタート画面！

const App: React.FC = () => {
  const [state, dispatch] = useReducer(gameReducer, initialGameState);
  const [started, setStarted] = useState(false); // ← スタート状態管理

  const speed = Math.max(1000 - (state.level - 1) * 100, 100);

  useEffect(() => {
    if (!started || state.isGameOver) return;

    const fallTimer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, speed);

    return () => clearInterval(fallTimer);
  }, [started, state.isGameOver, state.level]);

  useEffect(() => {
    if (!started || state.isGameOver) return;

    const timeTimer = setInterval(() => {
      dispatch({ type: "TIME_TICK" });
    }, 1000);

    return () => clearInterval(timeTimer);
  }, [started, state.isGameOver]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!started) {
        if (e.key === "Enter") {
          setStarted(true);
        }
        return;
      }

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
          dispatch({ type: "HARD_DROP" }); // 上キーでハードドロップ
          break;
        case " ":
          dispatch({ type: "ROTATE" }); // スペースで回転
          break;
        case "Shift":
          dispatch({ type: "HOLD" });
          break;
        case "Enter":
          dispatch({ type: "START" });
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [started, state.isGameOver]);

  const { holdPiece, queue, score, lines, level, time } = state;

  if (!started) {
    return <StartScreen onStart={() => setStarted(true)} />;
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "3rem" }}>
      {state.isGameOver ? (
        // スタート・リスタート画面
        <div
          className="start-screen"
          onClick={() => dispatch({ type: "START" })}
        >
          <h1>React Tetris</h1>
          <p>スペースキー：回転</p>
          <p>↑キー：ハードドロップ</p>
          <p>←→↓キー：移動</p>
          <p>Shiftキー：ホールド</p>
          <div className="start-hint">
            ▶ Enterキー または クリックでスタート！
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default App;
