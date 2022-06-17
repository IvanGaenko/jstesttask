import Square from "./Square";

class Supersquare extends Square {
  constructor({ id, squareSize, speed, left, color }) {
    super({ id, squareSize, speed, left, color });
    this.score = 2;
    this.className += " superSquare";
  }
}

export default Supersquare;