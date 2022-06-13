class Square {
  constructor(id, canvasWidth, squareSize) {
    this.id = id;
    this.canvasWidth = canvasWidth;
    this.squareSize = squareSize;
    this.left = (Math.random() * (this.canvasWidth - this.squareSize)).toFixed(1);
    this.speed = (1 + Math.random()).toFixed(1);
    this.color = Math.floor(Math.random()*16777215).toString(16);
    this.score = 1;
    this.superSquare = Math.random() > 0.3 ? false : true;
  }
  
  render() {
    const { id, squareSize, left, speed, color, score, superSquare } = this;
    let div = document.createElement("span");
    div.className = "square";
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
    
    if (superSquare) {
      div.className += " superSquare";
      div.score = 2;
    }
    
    return div;
  }
}

export default Square;