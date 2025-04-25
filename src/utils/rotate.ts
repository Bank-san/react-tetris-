export function rotate(matrix: number[][]): number[][] {
  const N = matrix.length;
  return matrix[0].map((_, i) => matrix.map((row) => row[N - 1 - i]));
}
