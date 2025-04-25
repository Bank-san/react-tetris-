import { Tetromino } from "./Tetromino";

export type GameState = {
  board: (string | 0)[][]; // ← 色付きにする（0 or '#ff0000'など）
  currentPiece: Tetromino | null;
  position: { x: number; y: number };
  isGameOver: boolean;
  score: number;
};

export type Action =
  | { type: "TICK" } // 1マス落下
  | { type: "MOVE"; direction: "left" | "right" | "down" } // 横or下に動く
  | { type: "ROTATE" } // 回転
  | { type: "NEW_PIECE" }; // 新しいピース出現
