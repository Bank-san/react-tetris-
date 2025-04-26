import React, { useEffect, useRef } from "react";

// 表示専用のミニテトリミノデータ
const NEXT_SHAPES: { [key: string]: { shape: number[][]; color: string } } = {
  I: {
    shape: [[1, 1, 1, 1]],
    color: "#00f0f0",
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#f0f000",
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
    ],
    color: "#a000f0",
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#0000f0",
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#f0a000",
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#00f000",
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#f00000",
  },
};

type Props = {
  type: keyof typeof NEXT_SHAPES;
};

const CELL_SIZE = 20; // セルのサイズ
const CANVAS_SIZE = 80; // キャンバスの正方形サイズ

const NextPieceSimple: React.FC<Props> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const { shape, color } = NEXT_SHAPES[type];

    const pieceWidth = Math.max(...shape.map((row) => row.length)) * CELL_SIZE;
    const pieceHeight = shape.length * CELL_SIZE;

    const offsetX = (CANVAS_SIZE - pieceWidth) / 2;
    const offsetY = (CANVAS_SIZE - pieceHeight) / 2;

    shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          ctx.fillStyle = color;
          ctx.fillRect(
            offsetX + x * CELL_SIZE,
            offsetY + y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
          ctx.strokeStyle = "#333";
          ctx.strokeRect(
            offsetX + x * CELL_SIZE,
            offsetY + y * CELL_SIZE,
            CELL_SIZE,
            CELL_SIZE
          );
        }
      });
    });
  }, [type]);

  return (
    <div
      style={{
        width: `${CANVAS_SIZE}px`,
        height: `${CANVAS_SIZE}px`,
        backgroundColor: "#222", // 枠の内側の暗い色
        border: "2px solid #888", // 枠線
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px", // 角を少し丸くしてオシャレに
        boxShadow: "0 0 8px rgba(255,255,255,0.2)", // ふわっとした影
      }}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};

export default NextPieceSimple;
