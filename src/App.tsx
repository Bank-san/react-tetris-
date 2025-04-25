import React from "react";
import TetrisBoard from "./components/TetrisBoard.tsx";

const App: React.FC = () => {
  return (
    <div>
      <h1>テトリス</h1>
      <TetrisBoard />
    </div>
  );
};

export default App;
