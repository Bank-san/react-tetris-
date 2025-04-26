import React, { useEffect, useRef } from "react";
import { Tetromino } from "../types/Tetromino";

type Props = {
  tetromino: Tetromino;
};

const CELL_SIZE = 20;
const CANVAS_SIZE = 100;

const NextPiece: React.FC<Props> = ({ tetromino }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const { shape, color } = tetromino;

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
  }, [tetromino]);

  return (
    <div
      style={{
        width: `${CANVAS_SIZE}px`,
        height: `${CANVAS_SIZE}px`,
        backgroundColor: "#222", // 👈 内側の背景を暗く
        border: "2px solid #888", // 👈 外枠を明るめに
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(255, 255, 255, 0.3)",
      }}
    >
      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        style={{
          backgroundColor: "transparent", // canvas自体は透明
        }}
      />
    </div>
  );
};

export default NextPiece;
