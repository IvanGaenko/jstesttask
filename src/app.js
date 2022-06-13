import View, { DOM_ELEMENTS } from "./View";
import Square from "./Square";

class Application {
  constructor() {
    this.score = 0;
    this.squareId = 0;
    this.canvasWidth = 0;
    this.squareWidth = 35;
    this.isPlayed = false;
    this.timeout;
    this.timeKoefOne = 0.5;
    this.timeKoefTwo = 2;
  }
  
  init() {
    this.getInitValues();
    this.setupEventListeners();
  }
  
  getInitValues() {
    this.canvasWidth = document.querySelector(DOM_ELEMENTS.canvas).offsetWidth;
    this.squareWidth = this.canvasWidth / (Math.floor(this.canvasWidth / this.squareWidth));
  }
  
  setupEventListeners() {
    document.querySelector(DOM_ELEMENTS.btn).addEventListener("click", () => {
      this.toggleGame();
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
    const time = this.timeKoefOne + (Math.random() * this.timeKoefTwo);
    
    if (this.score >= 10) {
      if (this.timeKoefOne !== 0) {
        this.timeKoefOne = 0;
      }
      if (this.timeKoefTwo !== 1) {
        this.timeKoefTwo = 1;
      }
    }
    
    const square = new Square(id, this.canvasWidth, this.squareWidth).render();
    View.addSquare(square);
    this.toggleSquareEvents(eventType.add, id);
    
    if (this.isPlayed) {
      this.timeout = setTimeout(() => this.squareGen(), time*1000);
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
}

const eventType = {
  add: "add",
  remove: "remove"
};

const app = new Application();
export default app;