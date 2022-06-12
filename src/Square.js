class Square {
  constructor(id, canvasWidth, squareSize) {
    this.id = id;
    this.canvasWidth = canvasWidth;
    this.squareSize = squareSize;
    this.left = Math.random() * (this.canvasWidth - this.squareSize);
    this.speed = 1.5 + Math.random();
    this.color = Math.floor(Math.random()*16777215).toString(16);
  }
  
  render() {
    const { id, squareSize, left, speed, color } = this;
    let div = document.createElement("div");
    div.className = "square";
    div.id = id;
    div.style.cssText = `
      background-color: #${color};
      width: ${squareSize}px;
      height: ${squareSize}px;
      position: relative;
      top: 0px;
      left: ${left}px;
      border: 1px solid black;
      animation: square-fall ${speed}s cubic-bezier(0, 0, 0, 0);
      `;
    return div;
  }
}

export default Square;