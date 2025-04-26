export function rotate(matrix: number[][]): number[][] {
  const N = matrix.length;
  return matrix.map((_, i) => matrix.map((row) => row[i]).reverse());
}
