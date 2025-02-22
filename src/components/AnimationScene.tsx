// src/components/AnimationScene.tsx
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import Character from './Character';
import ChatField from './ChatField';

interface AnimationSceneProps {
  assets: {
    characterImage: string;
    backgroundImage: string;
    font: string;
  };
}

const AnimationScene: React.FC<AnimationSceneProps> = ({ assets }) => {
  useEffect(() => {
    const timeline = gsap.timeline();
    timeline.to('#character', {
      duration: 2,
      x: -window.innerWidth / 2 + 50,
      y: -window.innerHeight / 2 + 50,
      ease: 'power1.inOut',
    });
    timeline.to('#character', {
      duration: 0.3,
      scale: 0.9,
      ease: 'power1.inOut',
    });
    timeline.to('#character', {
      duration: 0.3,
      scale: 1,
      ease: 'power1.inOut',
    });
    timeline.call(() => {
      const urlBox = document.getElementById('urlBox');
      if (urlBox) {
        urlBox.textContent = '';
      }
    });
    timeline.to({}, {
      duration: 0.1,
      onUpdate: function () {
        const progress = this.progress();
        const fullText = 'amazon.com';
        const numChars = Math.floor(progress * fullText.length);
        const urlBox = document.getElementById('urlBox');
        if (urlBox) {
          urlBox.textContent = fullText.substring(0, numChars);
        }
      },
      ease: 'none',
    });
  }, []);

  // Apply the generated background image via inline styles or CSS
  const containerStyle = {
    position: 'relative' as 'relative',
    height: '100vh',
    backgroundImage: `url(${assets.backgroundImage})`,
    backgroundRepeat: 'repeat',
  };

  return (
    <div style={containerStyle}>
      <div
        id="urlBox"
        style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px',
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          width: '200px',
        }}
      />
      <Character imageUrl={assets.characterImage} />
      <ChatField characterDescription="Your character description goes here" fontFamily={assets.font} />
    </div>
  );
};

export default AnimationScene;
