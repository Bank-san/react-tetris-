// src/utils/wallKick.ts

import { Tetromino } from "../types/Tetromino";
import { canMove } from "./canMove";

export function tryWallKick(
  board: (string | number)[][],
  piece: Tetromino,
  position: { x: number; y: number }
): { x: number; y: number } | null {
  const offsets = [
    { x: 1, y: 0 }, // 右1マス
    { x: -1, y: 0 }, // 左1マス
    { x: 2, y: 0 }, // 右2マス
    { x: -2, y: 0 }, // 左2マス
  ];

  for (const offset of offsets) {
    const newPosition = { x: position.x + offset.x, y: position.y + offset.y };
    if (canMove(board, piece, newPosition)) {
      return newPosition;
    }
  }

  return null;
}
