const TETROMINO_KEYS = ["I", "O", "T", "S", "Z", "J", "L"];

export function generateQueue(): string[] {
  const bag = [...TETROMINO_KEYS];
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [bag[i], bag[j]] = [bag[j], bag[i]];
  }
  return bag;
}
