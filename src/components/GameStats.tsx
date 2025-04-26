import React from "react";

type Props = {
  lines: number;
  level: number;
  time: number;
  score: number;
};

const GameStats: React.FC<Props> = ({ lines, level, time, score }) => {
  return (
    <div style={{ color: "#fff", fontSize: "18px", marginTop: "1rem" }}>
      <p>Lines: {lines}</p>
      <p>Level: {level}</p>
      <p>Time: {time}s</p>
      <p>Score: {score}</p>
    </div>
  );
};

export default GameStats;
