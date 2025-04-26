import React from "react";

type Props = {
  onStart: () => void;
};

const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#111",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "3rem", marginBottom: "2rem" }}>React Tetris</h1>
      <button
        onClick={onStart}
        style={{
          padding: "1rem 2rem",
          fontSize: "1.5rem",
          backgroundColor: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "transform 0.2s, background-color 0.2s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        Start Game
      </button>

      <div style={{ marginTop: "2rem", fontSize: "1rem", color: "#aaa" }}>
        <p>操作方法：</p>
        <p>← → 移動</p>
        <p>↓ ソフトドロップ</p>
        <p>Space 回転</p>
        <p>↑ ハードドロップ</p>
        <p>Shift ホールド</p>

        <p>▶ Enterキーまたはボタンクリックでスタート！</p>
      </div>
    </div>
  );
};

export default StartScreen;
