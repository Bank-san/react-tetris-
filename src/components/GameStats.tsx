// components/GameStats.tsx
import React from "react";

type Props = {
  lines: number;
  level: number;
  time: number;
  score: number;
};

const GameStats: React.FC<Props> = ({ lines, level, time, score }) => {
  const formatTime = (t: number) => {
    const seconds = (t / 1000).toFixed(2);
    return `${seconds}s`;
  };

  return (
    <div style={{ marginTop: "2rem", fontSize: "14px", color: "#fff" }}>
      <div>LINES: {lines}</div>
      <div>LEVEL: {level}</div>
      <div>TIME: {formatTime(time)}</div>
      <div>SCORE: {score}</div>
    </div>
  );
};

export default GameStats;
