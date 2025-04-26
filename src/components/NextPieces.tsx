// src/components/NextPieces.tsx
import React from "react";
import NextPieceSimple from "./NextPieceSimple";
import { generateQueue } from "../utils/generateQueue"; // ← これ必要！

type Props = {
  queue: string[];
};

const NextPieces: React.FC<Props> = ({ queue }) => {
  // もし足りなかったら、新しい7bagを補充して5個にする
  let displayQueue = [...queue];
  if (displayQueue.length < 5) {
    displayQueue = [...displayQueue, ...generateQueue()];
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {displayQueue.slice(0, 5).map((key, index) => (
        <div
          key={index}
          style={{
            transform: index === 0 ? "scale(1.2)" : "scale(1)",
            transformOrigin: "left center",
          }}
        >
          <NextPieceSimple type={key} />
        </div>
      ))}
    </div>
  );
};

export default NextPieces;
