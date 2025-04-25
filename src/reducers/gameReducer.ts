import { GameState, Action } from "../types/GameState";
import { getRandomTetromino } from "../utils/randomTetromino";
import { canMove } from "../utils/canMove";
import { clearLines } from "../utils/clearLines";
import { rotate } from "../utils/rotate";

export const initialGameState: GameState = {
  board: Array(20)
    .fill(null)
    .map(() => Array(10).fill(0)),
  position: { x: 3, y: 0 },
  currentPiece: getRandomTetromino(),
  isGameOver: false,
};

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "TICK": {
      const newPosition = { ...state.position, y: state.position.y + 1 };
      if (
        state.currentPiece &&
        canMove(state.board, state.currentPiece, newPosition)
      ) {
        return { ...state, position: newPosition };
      } else {
        if (!state.currentPiece) return state;

        const newBoard = [...state.board.map((row) => [...row])];
        const { shape } = state.currentPiece;

        shape.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value) {
              const boardY = state.position.y + y;
              const boardX = state.position.x + x;
              if (
                boardY >= 0 &&
                boardY < newBoard.length &&
                boardX >= 0 &&
                boardX < newBoard[0].length
              ) {
                newBoard[boardY][boardX] = 1; // 固定！
              }
            }
          });
        });

        const { newBoard: clearedBoard } = clearLines(newBoard);

        // ✅ 新しいピースを生成
        const nextPiece = getRandomTetromino();
        const startPos = { x: 3, y: 0 };

        // ✅ 新しいピースを置けなかったら終了！
        const gameOver = !canMove(clearedBoard, nextPiece, startPos);

        return {
          ...state,
          board: clearedBoard,
          currentPiece: gameOver ? null : nextPiece,
          position: startPos,
          isGameOver: gameOver,
        };
      }
    }

    case "MOVE": {
      const delta = { x: 0, y: 0 };
      if (action.direction === "left") delta.x = -1;
      if (action.direction === "right") delta.x = 1;
      if (action.direction === "down") delta.y = 1;

      const newPosition = {
        x: state.position.x + delta.x,
        y: state.position.y + delta.y,
      };
      if (
        state.currentPiece &&
        canMove(state.board, state.currentPiece, newPosition)
      ) {
        return { ...state, position: newPosition };
      } else {
        return state;
      }
    }
    case "NEW_PIECE":
      return {
        ...state,
        currentPiece: getRandomTetromino(),
        position: { x: 3, y: 0 },
      };
    default:
      return state;

    case "ROTATE": {
      if (!state.currentPiece) return state;

      const rotatedShape = rotate(state.currentPiece.shape);
      const rotatedPiece = {
        ...state.currentPiece,
        shape: rotatedShape,
      };

      // 衝突判定（位置そのままで回転できるか）
      if (canMove(state.board, rotatedPiece, state.position)) {
        return {
          ...state,
          currentPiece: rotatedPiece,
        };
      } else {
        return state; // 回転できなければ無視
      }
    }
  }
}
