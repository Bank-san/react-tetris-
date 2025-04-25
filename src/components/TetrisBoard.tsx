import React from "react";
import "../styles/Tetris.css";

const ROWS = 20;
const COLS = 10;

const TetrisBoard: React.FC = () => {
  const cells = [];

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      cells.push(<div key={`${row}-${col}`} className="cell" />);
    }
  }

  return <div className="board">{cells}</div>;
};

export default TetrisBoard;
