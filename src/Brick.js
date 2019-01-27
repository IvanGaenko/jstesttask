export default class Brick {
  constructor(pos, startPos, currentPos, color, id, width, height) {
    this.id = id;
    this.pos = pos;
    this.startPos = startPos;
    this.currentPos = currentPos;
    this.color = color;
    this.width = width;
    this.height = height;
  }
}
