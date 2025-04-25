import { Tetromino } from "./Tetromino";

export type GameState = {
  board: number[][]; // 盤面（20×10）
  currentPiece: Tetromino | null; // 今操作しているピース
  position: { x: number; y: number }; // ピースの位置
  isGameOver: boolean; // ゲームオーバーフラグ
};

export type Action =
  | { type: "TICK" } // 1マス落下
  | { type: "MOVE"; direction: "left" | "right" | "down" } // 横or下に動く
  | { type: "ROTATE" } // 回転
  | { type: "NEW_PIECE" }; // 新しいピース出現
