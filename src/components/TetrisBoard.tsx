import React from "react";
import { GameState } from "../types/GameState";
import "../styles/Tetris.css";
import { getGhostPosition } from "../utils/getGhostPosition";

type Props = {
  gameState: GameState;
};

const TetrisBoard: React.FC<Props> = ({ gameState }) => {
  const { board, currentPiece, position } = gameState;

  const renderBoard = () => {
    const display = board.map((row) => [...row]);

    // ゴースト位置を先に計算！
    let ghostPosition = position;
    if (currentPiece) {
      ghostPosition = getGhostPosition(board, currentPiece, position);

      // ゴーストを先に書き込む（3番とかにする）
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (
            value &&
            display[y + ghostPosition.y]?.[x + ghostPosition.x] === 0
          ) {
            display[y + ghostPosition.y][x + ghostPosition.x] = 3;
          }
        });
      });
    }

    // 現在のピースを上書きする（2番にする）
    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (
            value &&
            display[y + position.y]?.[x + position.x] !== undefined
          ) {
            display[y + position.y][x + position.x] = 2;
          }
        });
      });
    }

    return display;
  };

  const renderedBoard = renderBoard();

  return (
    <div className="board">
      {renderedBoard.flat().map((cell, i) => (
        <div
          key={i}
          className="cell"
          style={{
            backgroundColor:
              typeof cell === "string"
                ? cell // 固定済みピースはそのままの色
                : cell === 2
                ? gameState.currentPiece?.color
                : cell === 3
                ? `${gameState.currentPiece?.color}55`
                : "#111",
          }}
        />
      ))}
    </div>
  );
};

export default TetrisBoard;
