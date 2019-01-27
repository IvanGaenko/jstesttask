/* eslint-disable no-param-reassign */
import { randomPos, randomColor, randomSpeed, randomAppear } from './random';

import { start, stop, score, canvas, ctx, elemLeft, elemTop, clear } from './domVariables';

import brickInit from './brickInit';
import Brick from './Brick';
import './sass/style.scss';

let count = 0;
let arr = [];
let id = 1;
let brickInterval;
let animateInterval;
let isAnimating = false;

const addBrick = () => {
  const newBrick = new Brick(
    randomPos(),
    0,
    randomSpeed(),
    randomColor(),
    id,
    brickInit.width,
    brickInit.height
  );
  arr.push(newBrick);
  id += 1;
};

const animate = () => {
  if (!isAnimating) {
    return;
  }
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
  ctx.beginPath();
  arr.forEach(el => {
    el.startPos += el.currentPos;
    ctx.fillStyle = el.color;
    ctx.strokeStyle = 'black';
    ctx.fillRect(el.pos, el.startPos, el.width, el.height);
    ctx.strokeRect(el.pos, el.startPos, el.width, el.height);
    if (el.startPos >= canvas.clientHeight) {
      delete arr[el.id - 1];
    }
  });
};

const play = () => {
  const getBrick = () => setTimeout(addBrick, randomAppear());
  brickInterval = setInterval(getBrick, 500);
  animateInterval = setInterval(animate, 20);
};

const stopPlay = () => {
  clearInterval(brickInterval);
  clearInterval(animateInterval);
};

const clearScore = () => {
  count = 0;
  score.innerHTML = count;
};

const startGame = () => {
  if (isAnimating) {
    return;
  }
  isAnimating = true;
  clearScore();
  arr = [];
  id = 1;
  play();
};

const stopGame = () => {
  isAnimating = false;
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientWidth);
  stopPlay();
};

const countWin = () => {
  count += 1;
  score.innerHTML = count;
};

start.addEventListener('click', startGame);
stop.addEventListener('click', stopGame);
clear.addEventListener('click', clearScore);

canvas.addEventListener('click', e => {
  const x = e.pageX - elemLeft;
  const y = e.pageY - elemTop;
  arr.forEach(el => {
    if (y > el.startPos && y < el.startPos + el.height && x > el.pos && x < el.pos + el.width) {
      delete arr[el.id - 1];
      countWin();
    }
  });
});
