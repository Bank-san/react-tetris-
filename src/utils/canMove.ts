import { Tetromino } from "../types/Tetromino";

export function canMove(
  board: (string | number)[][],
  piece: Tetromino,
  position: { x: number; y: number }
): boolean {
  const { shape } = piece;

  for (let y = 0; y < shape.length; y++) {
    for (let x = 0; x < shape[y].length; x++) {
      if (shape[y][x]) {
        const newX = position.x + x;
        const newY = position.y + y;

        if (
          newX < 0 || // 左に壁を越える
          newX >= board[0].length || // 右に壁を越える
          newY >= board.length || // 下に壁を越える
          (newY >= 0 && board[newY][newX]) // 他のブロックと衝突
        ) {
          return false;
        }
      }
    }
  }
  return true;
}
