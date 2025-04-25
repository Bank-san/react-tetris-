import { useState, useEffect } from "react";
import { TETROMINOES } from "../data/tetrominoes";
import { Tetromino } from "../types/Tetromino";

const TETROMINO_KEYS = Object.keys(TETROMINOES);

function shuffle<T>(array: T[]): T[] {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export function usePieceQueue(): [Tetromino, () => void] {
  const [queue, setQueue] = useState<string[]>([]);

  useEffect(() => {
    if (queue.length < 7) {
      setQueue((prev) => [...prev, ...shuffle(TETROMINO_KEYS)]);
    }
  }, [queue]);

  const next = () => {
    setQueue((prev) => prev.slice(1));
  };

  const current = TETROMINOES[queue[0]];

  return [current, next];
}
