import React from "react";

type Props = {
  onStart: () => void;
};

const StartScreen: React.FC<Props> = ({ onStart }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#111",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "1rem",
      }}
    >
      <h1>React Tetris</h1>
      <p>【操作方法】</p>
      <p>← →：移動</p>
      <p>↓：ソフトドロップ</p>
      <p>↑：ハードドロップ</p>
      <p>スペース：回転</p>
      <p>Shift：ホールド</p>
      <button
        onClick={onStart}
        style={{ padding: "10px 20px", fontSize: "18px" }}
      >
        ゲームスタート！
      </button>
    </div>
  );
};

export default StartScreen;
