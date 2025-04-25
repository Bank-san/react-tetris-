import React from "react";
import { GameState } from "../types/GameState";
import "../styles/Tetris.css";

type Props = {
  gameState: GameState;
};

const TetrisBoard: React.FC<Props> = ({ gameState }) => {
  const { board, currentPiece, position } = gameState;

  const renderBoard = () => {
    const display = board.map((row) => [...row]);

    if (currentPiece) {
      currentPiece.shape.forEach((row, y) => {
        row.forEach((value, x) => {
          if (
            value &&
            display[y + position.y]?.[x + position.x] !== undefined
          ) {
            display[y + position.y][x + position.x] = 2; // 落下中ピースは一時的に「2」に
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
              typeof cell === "string" // ← 色が入ってたらその色を使う
                ? cell
                : cell === 2
                ? gameState.currentPiece?.color
                : "#111",
          }}
        />
      ))}
    </div>
  );
};

export default TetrisBoard;
