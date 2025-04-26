import { Tetromino } from "../types/Tetromino";
import { canMove } from "./canMove";

export function getGhostPosition(
  board: (string | 0)[][],
  piece: Tetromino,
  position: { x: number; y: number }
): { x: number; y: number } {
  let ghostY = position.y;

  while (true) {
    const nextY = ghostY + 1;
    if (!canMove(board, piece, { x: position.x, y: nextY })) {
      break;
    }
    ghostY = nextY;
  }

  return { x: position.x, y: ghostY };
}
