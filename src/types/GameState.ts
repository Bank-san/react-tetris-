import { Tetromino } from "./Tetromino";

export type GameState = {
  board: (string | number)[][]; // ← 色付きにする（0 or '#ff0000'など）
  currentPiece: Tetromino | null;
  position: { x: number; y: number };
  isGameOver: boolean;
  isStarted: boolean;
  score: number;
  queue: string[];
  holdPiece: Tetromino | null;
  holdUsed: boolean;
  lines: number;
  level: number;
  time: number;
};

export type Action =
  | { type: "TICK" } // 1マス落下
  | { type: "MOVE"; direction: "left" | "right" | "down" }
  | { type: "LEFT_ROTATE" }
  | { type: "RIGHT_ROTATE" }
  | { type: "NEW_PIECE" }
  | { type: "HOLD" }
  | { type: "HARD_DROP" }
  | { type: "TIME_TICK" }
  | { type: "START_GAME" }
  | { type: "START" };
