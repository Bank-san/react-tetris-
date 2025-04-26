import { GameState, Action } from "../types/GameState";
import { canMove } from "../utils/canMove";
import { clearLines } from "../utils/clearLines";
import { rotate } from "../utils/rotate";
import { generateQueue } from "../utils/generateQueue";
import { TETROMINOES } from "../data/Tetrominoes";
import { getGhostPosition } from "../utils/getGhostPosition";

// 最初に7個 ×2 を用意
const queue = [...generateQueue(), ...generateQueue()];

export const initialGameState: GameState = {
  board: Array(20)
    .fill(null)
    .map(() => Array(10).fill(0)),
  position: { x: 3, y: 0 },
  currentPiece: TETROMINOES[queue[0]],
  queue: queue.slice(1),
  isGameOver: false,
  isStarted: false,
  score: 0,
  holdPiece: null,
  holdUsed: false,
  lines: 0,
  level: 1,
  time: 0,
};

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "TICK": {
      if (!state.currentPiece) return state;

      const newPosition = { ...state.position, y: state.position.y + 1 };

      if (canMove(state.board, state.currentPiece, newPosition)) {
        return { ...state, position: newPosition };
      }

      // 落下できなかったら固定
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
              newBoard[boardY][boardX] = state.currentPiece!.color;
            }
          }
        });
      });

      const { newBoard: clearedBoard, cleared } = clearLines(newBoard);
      const scoreDelta = cleared * 100;
      const newLines = state.lines + cleared;
      const newLevel = Math.floor(newLines / 10) + 1;

      let newQueue = [...state.queue];
      if (newQueue.length === 7) {
        newQueue.push(...generateQueue());
      }
      const nextKey = newQueue[0];
      const nextPiece = TETROMINOES[nextKey];
      newQueue = newQueue.slice(1);

      const startPos = { x: 3, y: 0 };
      const gameOver = !canMove(clearedBoard, nextPiece, startPos);

      return {
        ...state,
        board: clearedBoard,
        currentPiece: gameOver ? null : nextPiece,
        position: startPos,
        isGameOver: gameOver,
        score: state.score + scoreDelta,
        queue: newQueue,
        holdUsed: false,
        lines: newLines,
        level: newLevel,
      };
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

    case "ROTATE": {
      if (!state.currentPiece) return state;

      const rotatedShape = rotate(state.currentPiece.shape);
      const rotatedPiece = {
        ...state.currentPiece,
        shape: rotatedShape,
      };

      if (canMove(state.board, rotatedPiece, state.position)) {
        return {
          ...state,
          currentPiece: rotatedPiece,
        };
      } else {
        return state;
      }
    }

    case "HOLD": {
      if (!state.currentPiece || state.holdUsed) {
        return state;
      }

      if (state.holdPiece) {
        return {
          ...state,
          currentPiece: state.holdPiece,
          holdPiece: state.currentPiece,
          position: { x: 3, y: 0 },
          holdUsed: true,
        };
      } else {
        let newQueue = [...state.queue];
        if (newQueue.length === 7) {
          newQueue.push(...generateQueue());
        }
        const nextKey = newQueue[0];
        const nextPiece = TETROMINOES[nextKey];
        newQueue = newQueue.slice(1);

        return {
          ...state,
          currentPiece: nextPiece,
          holdPiece: state.currentPiece,
          position: { x: 3, y: 0 },
          queue: newQueue,
          holdUsed: true,
        };
      }
    }

    case "HARD_DROP": {
      if (!state.currentPiece) return state;

      const ghostPos = getGhostPosition(
        state.board,
        state.currentPiece,
        state.position
      );
      const newPosition = { x: ghostPos.x, y: ghostPos.y };

      const newBoard = [...state.board.map((row) => [...row])];
      const { shape } = state.currentPiece;

      shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value) {
            const boardY = newPosition.y + y;
            const boardX = newPosition.x + x;
            if (
              boardY >= 0 &&
              boardY < newBoard.length &&
              boardX >= 0 &&
              boardX < newBoard[0].length
            ) {
              newBoard[boardY][boardX] = state.currentPiece!.color;
            }
          }
        });
      });

      const { newBoard: clearedBoard, cleared } = clearLines(newBoard);
      const scoreDelta = cleared * 100;
      const linesDelta = cleared;

      let newQueue = [...state.queue];
      if (newQueue.length === 7) {
        newQueue.push(...generateQueue());
      }
      const nextKey = newQueue[0];
      const nextPiece = TETROMINOES[nextKey];
      newQueue = newQueue.slice(1);

      const startPos = { x: 3, y: 0 };
      const gameOver = !canMove(clearedBoard, nextPiece, startPos);

      return {
        ...state,
        board: clearedBoard,
        currentPiece: gameOver ? null : nextPiece,
        position: startPos,
        isGameOver: gameOver,
        score: state.score + scoreDelta,
        queue: newQueue,
        holdUsed: false,
        lines: state.lines + linesDelta,
        level: Math.floor((state.lines + linesDelta) / 10) + 1,
      };
    }

    case "TIME_TICK": {
      return {
        ...state,
        time: state.time + 1,
      };
    }
    case "START_GAME": {
      return {
        ...initialGameState,
        isStarted: true,
      };
    }

    default:
      return state;
  }
}
