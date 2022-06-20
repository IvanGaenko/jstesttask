export const DOM_ELEMENTS = {
  canvas: ".canvas",
  score: ".score",
  btn: ".btn",
  checkbox: ".checkbox"
};

class View {
  static clearAllSquares() {
    const squareNode = document.querySelector(DOM_ELEMENTS.canvas);
    while (squareNode.firstChild) {
      squareNode.firstChild.remove();
    }
  }
  
  static addSquare(square) {
    document.querySelector(DOM_ELEMENTS.canvas).appendChild(square);
  }
  
  static removeSquare(id) {
    document.querySelector(`#${id}`).remove();
  }
  
  static updateScore(score) {
    document.querySelector(DOM_ELEMENTS.score).innerHTML = score;
  }
  
  static updateButton(isPlayed) {
    document.querySelector(DOM_ELEMENTS.btn).innerHTML = isPlayed ? "Stop" : "Play";
  }
  
  static updateTheme(theme) {
    document.querySelector("body").className = theme === true ? "dark-mode" : "light-mode";
  }
}

export default View;
