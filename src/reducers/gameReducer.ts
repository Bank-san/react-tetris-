import { GameState, Action } from "../types/GameState";
import { getRandomTetromino } from "../utils/randomTetromino";
import { canMove } from "../utils/canMove";
import { clearLines } from "../utils/clearLines";
import { rotate } from "../utils/rotate";
import { generateQueue } from "../utils/generateQueue";
import { TETROMINOES } from "../data/Tetrominoes";

const queue = generateQueue();

export const initialGameState: GameState = {
  board: Array(20)
    .fill(null)
    .map(() => Array(10).fill(0)),
  position: { x: 3, y: 0 },
  currentPiece: TETROMINOES[queue[0]],
  queue: queue.slice(1),
  isGameOver: false,
  score: 0,
  holdPiece: null,
  holdUsed: false,
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
                newBoard[boardY][boardX] = state.currentPiece.color;
              }
            }
          });
        });

        const { newBoard: clearedBoard, cleared } = clearLines(newBoard);
        const scoreDelta = cleared * 100; //消した行数 × 100点

        let newQueue = [...state.queue];
        if (newQueue.length <= 1) {
          newQueue = [...newQueue, ...generateQueue()];
        }
        const nextKey = newQueue[0];
        newQueue = newQueue.slice(1);
        const nextPiece = TETROMINOES[nextKey];
        const startPos = { x: 3, y: 0 };
        const gameOver = !canMove(clearedBoard, nextPiece, startPos);

        return {
          ...state,
          board: clearedBoard,
          currentPiece: gameOver ? null : nextPiece,
          position: startPos,
          isGameOver: gameOver,
          score: state.score + scoreDelta, //スコア加算処理
          queue: newQueue,
          holdUsed: false,
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
    case "HOLD": {
      if (!state.currentPiece || state.holdUsed) {
        console.log("Hold無効: すでに使用済みかピースなし");
        return state;
      }

      if (state.holdPiece) {
        console.log(
          "Hold交換：",
          state.holdPiece.name,
          "<->",
          state.currentPiece.name
        );
        return {
          ...state,
          currentPiece: state.holdPiece,
          holdPiece: state.currentPiece,
          position: { x: 3, y: 0 },
          holdUsed: true,
        };
      } else {
        console.log("Hold初回：", state.currentPiece.name);
        const newQueue = [...state.queue];
        if (newQueue.length <= 1) {
          newQueue.push(...generateQueue());
        }
        const nextKey = newQueue[0];
        newQueue.shift();
        const nextPiece = TETROMINOES[nextKey];

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
  }
}
