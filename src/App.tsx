// src/App.tsx
import React, { useState } from "react";
import LandingPage from "./components/LandingPage";
import AnimationScene from "./components/AnimationScene";

interface GeneratedAssets {
  characterImage: string;
  backgroundImage: string;
  font: string;
}

const App: React.FC = () => {
  const [assets, setAssets] = useState<GeneratedAssets | null>(null);

  return (
    <div>
      {!assets ? (
        <LandingPage onSubmit={(data) => setAssets(data)} />
      ) : (
        <AnimationScene assets={assets} />
      )}
    </div>
  );
};

export default App;
