// src/components/HoldPiece.tsx
import React from "react";
import NextPieceSimple from "./NextPieceSimple";
import { Tetromino } from "../types/Tetromino";

type Props = {
  piece: Tetromino | null;
};

const HoldPiece: React.FC<Props> = ({ piece }) => {
  return (
    <div>
      {piece ? (
        <NextPieceSimple type={piece.name} />
      ) : (
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#222",
            border: "2px solid #888",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
            fontSize: "14px",
          }}
        >
          EMPTY
        </div>
      )}
    </div>
  );
};

export default HoldPiece;
