export function clearLines(board: (string | 0)[][]): {
  newBoard: (string | 0)[][];
  cleared: number;
} {
  const isComplete = (row: (string | 0)[]) =>
    row.every((cell) => typeof cell === "string");

  const remainingRows = board.filter((row) => !isComplete(row));

  const cleared = board.length - remainingRows.length;

  const newBoard = [
    ...Array(cleared)
      .fill(null)
      .map(() => Array(board[0].length).fill(0)),
    ...remainingRows,
  ];

  return { newBoard, cleared: cleared || 0 };
}
