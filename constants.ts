import { Point } from "./types";

// Nokia 3310 Screen Resolution (roughly)
export const SCREEN_WIDTH = 84;
export const SCREEN_HEIGHT = 48;

export const INITIAL_SNAKE: Point[] = [
  { x: 10, y: 24 },
  { x: 9, y: 24 },
  { x: 8, y: 24 },
];

export const INITIAL_FOOD: Point = { x: 40, y: 24 };

export const GAME_SPEED = 100; // ms per tick

// Colors - High Contrast Mode
export const COLOR_SCREEN_BG = '#C6D68F'; // Brighter "backlit" green
export const COLOR_PIXEL_ON = '#1F2418';  // Nearly black for max contrast
export const COLOR_PIXEL_OFF = '#B5C480'; // Shadow/Grid color

export const PIXEL_SIZE = 4; // Visual multiplier for canvas rendering