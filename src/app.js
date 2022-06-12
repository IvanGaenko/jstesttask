import View, { DOM_ELEMENTS } from "./View";
import Square from "./Square";

class Application {
  constructor() {
    this.score = 0;
    this.squareId = 0;
    this.canvasWidth = 0;
    this.squareWidth = 35;
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
    this.squareId++;
    const id = `square-${this.squareId}`;
    const square = new Square(id, this.canvasWidth, this.squareWidth).render();
    View.addSquare(square);
    this.toggleSquareEvents(eventType.add, id);
  }
  
  toggleSquareEvents(type, id) {
    const squareNode = document.querySelector(`#${id}`);
    if (type === eventType.add) {
      squareNode.addEventListener("click", (e) => {
        this.removeSquare(e.target.id);
      });
      squareNode.addEventListener("animationend", (e) => {
        this.removeSquare(e.target.id);
      });
    }
    
    if (type === eventType.remove) {
      squareNode.removeEventListener("click", (e) => {
        this.removeSquare(e.target.id);
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
}

const eventType = {
  add: "add",
  remove: "remove"
};

const app = new Application();
export default app;