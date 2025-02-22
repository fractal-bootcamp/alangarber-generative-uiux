// src/components/Character.tsx
import React from "react";

interface CharacterProps {
  imageUrl: string;
}

const Character: React.FC<CharacterProps> = ({ imageUrl }) => {
  return (
    <img
      id="character"
      src={imageUrl}
      alt="Generated Character"
      style={{
        width: "100px",
        height: "100px",
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  );
};

export default Character;
