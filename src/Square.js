class Square {
  constructor({ id = "default-1", squareSize = 40, speed = 1, left = 100, color }) {
    this.id = id;
    this.squareSize = squareSize;
    this.color = color;
    this.left = left;
    this.speed = speed;
    this.score = 1;
    this.className = "square";
  }
  
  render() {
    const { id, squareSize, left, speed, color, score, className } = this;
    let div = document.createElement("div");
    div.className = className;
    div.id = id;
    div.score = score;
    div.style.cssText = `
      background-color: #${color};
      width: ${squareSize}px;
      height: ${squareSize}px;
      position: absolute;
      top: 0%;
      left: ${left}px;
      border: 1px solid black;
      animation: square-fall ${speed}s cubic-bezier(0, 0, 0, 0);
      `;
    
    return div;
  }
}

export default Square;