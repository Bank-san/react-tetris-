import { Tetromino } from "../types/Tetromino";

export const TETROMINOES: Record<string, Tetromino> = {
  I: {
    name: "I",
    shape: [[1, 1, 1, 1]],
    color: "#00f0f0",
  },
  J: {
    name: "J",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
    ],
    color: "#0000f0",
  },
  L: {
    name: "L",
    shape: [
      [0, 0, 1],
      [1, 1, 1],
    ],
    color: "#f0a000",
  },
  O: {
    name: "O",
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "#f0f000",
  },
  S: {
    name: "S",
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "#00f000",
  },
  T: {
    name: "T",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "#a000f0",
  },
  Z: {
    name: "Z",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "#f00000",
  },
};
