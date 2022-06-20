import View, { DOM_ELEMENTS } from "./View";
import Square from "./Square";
import Supersquare from "./Supersquare";
import Random from "./Random";

class Application {
  constructor() {
    this.score = 0;
    this.squareId = 0;
    this.canvasWidth = 0;
    this.squareWidth = 40;
    this.isPlayed = false;
    this.timeout;
    this.random = new Random();
    this.squareArr = [Square, Supersquare];
    this.darkMode = false;
  }
  
  init() {
    this.getInitValues();
    this.setupEventListeners();
    this.updateScore(0);
  }
  
  getInitValues() {
    this.canvasWidth = document.querySelector(DOM_ELEMENTS.canvas).offsetWidth;
    this.squareWidth = this.canvasWidth / (Math.floor(this.canvasWidth / this.squareWidth));
  }
  
  setupEventListeners() {
    document.querySelector(DOM_ELEMENTS.btn).addEventListener("click", () => {
      this.toggleGame();
    });
    document.querySelector(DOM_ELEMENTS.checkbox).addEventListener("click", (e) => {
      this.updateTheme();
    });
  }
  
  toggleGame() {
    this.isPlayed = !this.isPlayed;
    View.updateButton(this.isPlayed);
    
    if (this.isPlayed) {
      this.squareGen();
    } else {
      clearTimeout(this.timeout);
      View.clearAllSquares();
      this.updateScore(0);
    }
  }
  
  squareGen() {
    this.squareId++;
    const id = `square-${this.squareId}`;
    this.random.getSpeed();
    this.random.getLeftOffset(this.canvasWidth, this.squareWidth);
    this.random.getColor();
    
    const params = {
      id,
      squareSize: this.squareWidth,
      speed: this.random.speed,
      left: this.random.leftOffset,
      color: this.random.color
    };
    
    const square = this.random.getSquare(this.squareArr, params).render();
    View.addSquare(square);
    this.toggleSquareEvents(eventType.add, id);
    
    if (this.isPlayed) {
      this.random.getAppear(this.score);
      this.timeout = setTimeout(() => this.squareGen(), this.random.appear*1000);
    }
  }
  
  toggleSquareEvents(type, id) {
    const squareNode = document.querySelector(`#${id}`);
    if (type === eventType.add) {
      squareNode.addEventListener("click", (e) => {
        this.removeSquare(e.target.id);
        this.updateScore(e.target.score);
      });
      squareNode.addEventListener("animationend", (e) => {
        this.removeSquare(e.target.id);
      });
    }
    
    if (type === eventType.remove) {
      squareNode.removeEventListener("click", (e) => {
        this.removeSquare(e.target.id);
        this.updateScore(e.target.score);
      });
      squareNode.removeEventListener("animationend", (e) => {
        this.removeSquare(e.target.id);
      });
    }
  }
  
  removeSquare(id) {
    this.toggleSquareEvents(eventType.remove, id);
    View.removeSquare(id);
  }
  
  updateScore(score) {
    score === 0 ? this.score = 0 : this.score += score;
    View.updateScore(this.score);
  }
  
 updateTheme() {
    this.darkMode = !this.darkMode;
    View.updateTheme(this.darkMode);
  }
}

const eventType = {
  add: "add",
  remove: "remove"
};

const app = new Application();
export default app;