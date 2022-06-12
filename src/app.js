import View, { DOM_ELEMENTS } from "./View";

class Application {
  constructor() {
    this.score = 0;
  }
  
  init() {
    this.setupEventListeners();
  }
  
  setupEventListeners() {
    //document
    //.querySelector(DOM_ELEMENTS.btn)
    //.addEventListener("click", (e) => {
      //console.log(e);
      //this.startGame();
    //})
    console.log(document);
  }
  
  startGame() {}
}

console.log("hi")
const app = new Application();
export default app;