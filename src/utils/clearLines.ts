export function clearLines(board: number[][]): {
  newBoard: number[][];
  cleared: number;
} {
  const newBoard = board.filter((row) => row.some((cell) => cell === 0));
  const cleared = board.length - newBoard.length;

  while (newBoard.length < board.length) {
    newBoard.unshift(new Array(board[0].length).fill(0));
  }

  return { newBoard, cleared };
}
