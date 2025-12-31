import { useState, useCallback, useEffect } from 'react';
import { GameStatus, Direction, Point, GameState, KeyPadButton } from '../types';
import { INITIAL_SNAKE, INITIAL_FOOD, SCREEN_WIDTH, SCREEN_HEIGHT, GAME_SPEED } from '../constants';
import useInterval from './useInterval';

const generateFood = (snake: Point[]): Point => {
  let newFood: Point;
  while (true) {
    newFood = {
      x: Math.floor(Math.random() * SCREEN_WIDTH),
      y: Math.floor(Math.random() * SCREEN_HEIGHT),
    };
    const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    if (!isOnSnake) break;
  }
  return newFood;
};

export const useSnakeGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: INITIAL_FOOD,
    direction: Direction.RIGHT,
    status: GameStatus.IDLE,
    score: 0,
    highScore: 0,
  });

  // Track the next direction to prevent quick double-turns causing self-collision
  const [nextDirection, setNextDirection] = useState<Direction>(Direction.RIGHT);

  const resetGame = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: Direction.RIGHT,
      status: GameStatus.PLAYING,
      score: 0,
    }));
    setNextDirection(Direction.RIGHT);
  }, []);

  const moveSnake = useCallback(() => {
    if (gameState.status !== GameStatus.PLAYING) return;

    const { snake, direction, score, highScore } = gameState;
    const head = snake[0];
    const newHead = { ...head };

    // Use current processed direction
    switch (direction) {
      case Direction.UP: newHead.y -= 1; break;
      case Direction.DOWN: newHead.y += 1; break;
      case Direction.LEFT: newHead.x -= 1; break;
      case Direction.RIGHT: newHead.x += 1; break;
    }

    // Wall Collision (Wrap around or Die? Classic usually died on walls or wrapped in Snake II)
    // Implementing Wall Death for stricter gameplay like original Snake 1
    if (
      newHead.x < 0 || 
      newHead.x >= SCREEN_WIDTH || 
      newHead.y < 0 || 
      newHead.y >= SCREEN_HEIGHT ||
      snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
    ) {
      setGameState(prev => ({ 
        ...prev, 
        status: GameStatus.GAME_OVER,
        highScore: Math.max(score, highScore)
      }));
      return;
    }

    const newSnake = [newHead, ...snake];
    
    // Check Food
    if (newHead.x === gameState.food.x && newHead.y === gameState.food.y) {
      // Ate food
      const newScore = score + 10;
      setGameState(prev => ({
        ...prev,
        snake: newSnake,
        score: newScore,
        food: generateFood(newSnake),
        direction: nextDirection, // update direction for next frame
      }));
    } else {
      // Didn't eat, remove tail
      newSnake.pop();
      setGameState(prev => ({
        ...prev,
        snake: newSnake,
        direction: nextDirection, // update direction for next frame
      }));
    }
  }, [gameState, nextDirection]);

  useInterval(moveSnake, gameState.status === GameStatus.PLAYING ? GAME_SPEED : null);

  const handleInput = useCallback((input: KeyPadButton | string) => {
    if (gameState.status === GameStatus.GAME_OVER) {
      if (input === 'MENU') resetGame();
      return;
    }

    if (gameState.status === GameStatus.IDLE) {
      if (input === 'MENU') resetGame();
      return;
    }

    // Playing controls
    if (gameState.status === GameStatus.PLAYING) {
      let requestedDir: Direction | null = null;

      // Mapping 2,4,6,8 and Arrow keys
      if (input === '2' || input === 'ArrowUp') requestedDir = Direction.UP;
      if (input === '8' || input === 'ArrowDown') requestedDir = Direction.DOWN;
      if (input === '4' || input === 'ArrowLeft') requestedDir = Direction.LEFT;
      if (input === '6' || input === 'ArrowRight') requestedDir = Direction.RIGHT;

      if (requestedDir) {
        setGameState(prev => {
          const currentDir = prev.direction;
          // Prevent 180 turns
          const isOpposite = 
            (currentDir === Direction.UP && requestedDir === Direction.DOWN) ||
            (currentDir === Direction.DOWN && requestedDir === Direction.UP) ||
            (currentDir === Direction.LEFT && requestedDir === Direction.RIGHT) ||
            (currentDir === Direction.RIGHT && requestedDir === Direction.LEFT);
          
          if (!isOpposite) {
             setNextDirection(requestedDir);
          }
          return prev;
        });
      }
      
      if (input === 'C') {
         setGameState(prev => ({ ...prev, status: GameStatus.PAUSED }));
      }
    } else if (gameState.status === GameStatus.PAUSED) {
        if (input === 'MENU' || input === 'C') {
             setGameState(prev => ({ ...prev, status: GameStatus.PLAYING }));
        }
    }
  }, [gameState.status, resetGame]);

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
        // Map arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            handleInput(e.key);
        }
        // Map common letters
        if (e.key.toLowerCase() === 'w') handleInput('2');
        if (e.key.toLowerCase() === 's') handleInput('8');
        if (e.key.toLowerCase() === 'a') handleInput('4');
        if (e.key.toLowerCase() === 'd') handleInput('6');
        if (e.key === 'Enter') handleInput('MENU');
        if (e.key === 'Backspace' || e.key === 'Escape') handleInput('C');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleInput]);

  return { gameState, handleInput };
};
