import { useEffect } from "react";

export function useGameLoop(callback: () => void, interval: number) {
  useEffect(() => {
    const id = setInterval(callback, interval);
    return () => clearInterval(id);
  }, [callback, interval]);
}
