export function clearLines(board: (string | number)[][]): {
  newBoard: (string | number)[][];
  cleared: number;
} {
  const isComplete = (row: (string | number)[]) =>
    row.every((cell) => typeof cell === "string" && cell !== "");

  const remainingRows = board.filter((row) => !isComplete(row));

  const cleared = board.length - remainingRows.length;

  const newBoard = [
    ...Array(cleared)
      .fill(null)
      .map(() => Array(board[0].length).fill(0)),
    ...remainingRows,
  ];

  return { newBoard, cleared };
}
