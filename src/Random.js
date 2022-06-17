class Random {
  constructor() {
    this.sec = this.getSec();
    this.appear = 0;
    this.speed = 0;
    this.leftOffset = 0;
    this.color = "";
    this.appearKoef = [0.1, 0.25, 0.5, 0.75, 0.9];
  }
  
  getSec(add = 1, mult = 1) {
    return (add + Math.random() * mult).toFixed(1);
  }
  
  getAppear(score) {
    switch (true) {
      case score >= 5 && score < 9:
        this.appear = this.sec - this.appearKoef[0];
        break;
      case score >= 10 && score < 15:
        this.appear = this.sec - this.appearKoef[1];
        break;
      case score >= 15 && score < 19:
        this.appear = this.sec - this.appearKoef[2];
        break;
      case score >= 20 && score < 29:
        this.appear = this.sec - this.appearKoef[3];
        break;
      case score >= 30 && score < 49:
        this.appear = this.sec - this.appearKoef[4];
        break;
      case score >= 50:
        this.appear = 0.3;
        break;
      default:
        this.appear = this.sec;
    }
    this.sec = this.getSec();
  }
  
  getSpeed() {
    this.speed = this.getSec(0.6, 1.5);
  }
  
  getSquare(squareArr, params) {
    const randomIndex = Math.floor(Math.random() + (squareArr.length - 1.7));
    return new squareArr[randomIndex](params);
  }
  
  getLeftOffset(canvasWidth, squareSize) {
    this.leftOffset = (Math.random() * (canvasWidth-squareSize)).toFixed(1);
  }
  
  getColor() {
    this.color = Math.floor(Math.random()*16777215).toString(16);
  }
}

export default Random;