import React, { useRef, useEffect } from 'react';
import { GameState, GameStatus } from '../types';
import { SCREEN_WIDTH, SCREEN_HEIGHT, COLOR_SCREEN_BG, COLOR_PIXEL_ON, COLOR_PIXEL_OFF } from '../constants';

interface PixelCanvasProps {
  gameState: GameState;
}

const PixelCanvas: React.FC<PixelCanvasProps> = ({ gameState }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Increased scale for crisper rendering on high DPI screens
  const SCALE = 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear Screen
    ctx.fillStyle = COLOR_SCREEN_BG;
    ctx.fillRect(0, 0, SCREEN_WIDTH * SCALE, SCREEN_HEIGHT * SCALE);

    // Optional: Draw faint pixel grid for retro feel (very subtle)
    // ctx.fillStyle = COLOR_PIXEL_OFF;
    // for(let y = 0; y < SCREEN_HEIGHT; y++) {
    //     for(let x = 0; x < SCREEN_WIDTH; x++) {
    //         ctx.fillRect(x * SCALE + SCALE - 1, y * SCALE + SCALE - 1, 1, 1);
    //     }
    // }

    // Helper to draw pixel
    const drawPixel = (x: number, y: number, color: string = COLOR_PIXEL_ON) => {
        ctx.fillStyle = color;
        // Drawing slightly smaller than full scale to create grid separation effect
        const padding = 0; // Set to 0.5 for grid effect, 0 for solid
        ctx.fillRect(
            Math.floor(x * SCALE + padding), 
            Math.floor(y * SCALE + padding), 
            Math.ceil(SCALE - padding * 2), 
            Math.ceil(SCALE - padding * 2)
        );
    };

    // Draw Snake
    gameState.snake.forEach(segment => drawPixel(segment.x, segment.y));

    // Draw Food
    // Make food flash or look distinct? For now, just a pixel.
    drawPixel(gameState.food.x, gameState.food.y);

    // Draw UI Text
    ctx.fillStyle = COLOR_PIXEL_ON;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const centerX = (SCREEN_WIDTH * SCALE) / 2;
    const centerY = (SCREEN_HEIGHT * SCALE) / 2;

    if (gameState.status === GameStatus.IDLE) {
        ctx.font = `bold ${14 * SCALE}px "VT323", monospace`;
        ctx.fillText("SNAKE", centerX, centerY - 8 * SCALE);
        
        ctx.font = `${6 * SCALE}px "VT323", monospace`;
        ctx.fillText("Press MENU", centerX, centerY + 6 * SCALE);
    }

    if (gameState.status === GameStatus.GAME_OVER) {
        ctx.font = `bold ${10 * SCALE}px "VT323", monospace`;
        ctx.fillText("GAME OVER", centerX, centerY - 4 * SCALE);
        
        ctx.font = `${6 * SCALE}px "VT323", monospace`;
        ctx.fillText(`Score: ${gameState.score}`, centerX, centerY + 6 * SCALE);
    }
    
    if (gameState.status === GameStatus.PAUSED) {
        // Draw a semi-transparent box behind text for readability
        ctx.fillStyle = COLOR_SCREEN_BG;
        ctx.fillRect(centerX - 30 * SCALE, centerY - 8 * SCALE, 60 * SCALE, 16 * SCALE);
        
        ctx.fillStyle = COLOR_PIXEL_ON;
        ctx.font = `bold ${10 * SCALE}px "VT323", monospace`;
        ctx.fillText("PAUSED", centerX, centerY);
    }

    // Draw Score in top-left corner during play
    if (gameState.status === GameStatus.PLAYING) {
       ctx.textAlign = 'left';
       ctx.textBaseline = 'top';
       ctx.font = `bold ${6 * SCALE}px "VT323", monospace`;
       ctx.fillText(`${gameState.score}`, 2 * SCALE, 1 * SCALE);
    }

  }, [gameState]);

  return (
    <canvas
      ref={canvasRef}
      width={SCREEN_WIDTH * SCALE}
      height={SCREEN_HEIGHT * SCALE}
      className="w-full h-full object-contain"
      style={{ 
        imageRendering: 'pixelated',
        backgroundColor: COLOR_SCREEN_BG 
      }}
    />
  );
};

export default PixelCanvas;