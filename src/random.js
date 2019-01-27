import { canvas } from './domVariables';
import brickInit from './brickInit';

export const randomPos = () => {
  return Math.round(Math.random() * (canvas.width - brickInit.width));
};

export const randomColor = () => {
  const randomCol = () => Math.round(Math.random() * 255);
  return `rgb(${randomCol()},${randomCol()},${randomCol()})`;
};

export const randomSpeed = () => Math.ceil(Math.random() * 5);

export const randomAppear = () => Math.round(Math.random() * 3) * 1000;
