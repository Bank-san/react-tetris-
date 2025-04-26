// 時計回り（右回転）
export function rotateRight(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      rotated[x][rows - 1 - y] = matrix[y][x];
    }
  }
  return rotated;
}

// 反時計回り（左回転）
export function rotateLeft(matrix: number[][]): number[][] {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rotated = Array.from({ length: cols }, () => Array(rows).fill(0));
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      rotated[cols - 1 - x][y] = matrix[y][x];
    }
  }
  return rotated;
}
