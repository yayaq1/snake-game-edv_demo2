export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  GAME_OVER = 'GAME_OVER',
}

export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  snake: Point[];
  food: Point;
  direction: Direction;
  status: GameStatus;
  score: number;
  highScore: number;
}

export type KeyPadButton = 
  | '1' | '2' | '3' 
  | '4' | '5' | '6' 
  | '7' | '8' | '9' 
  | '*' | '0' | '#'
  | 'MENU' | 'C' | 'UP' | 'DOWN';
