import { TETROMINOES } from "../data/Tetrominoes";
import { Tetromino } from "../types/Tetromino";

export function getRandomTetromino(): Tetromino {
  const keys = Object.keys(TETROMINOES);
  const rand = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOES[rand];
}
