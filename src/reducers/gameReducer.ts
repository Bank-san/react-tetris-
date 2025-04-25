import { GameState, Action } from "../types/GameState";
import { getRandomTetromino } from "../utils/RandomTetromino";

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
    case "TICK":
      return {
        ...state,
        position: { ...state.position, y: state.position.y + 1 },
      };
    case "NEW_PIECE":
      return {
        ...state,
        currentPiece: getRandomTetromino(),
        position: { x: 3, y: 0 },
      };
    default:
      return state;
  }
}
