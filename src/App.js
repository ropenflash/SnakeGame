import React from "react";
import Snake from "./Snake";
import Food from "./Food";

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

  return [x, y];
};
const initialState = {
  speed: 1000,
  food: [6, 8],
  direction: "RIGHT",
  snakeDots: [[0, 0], [2, 0]]
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    this.setState({ food: getRandomCoordinates() });

    setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onkeydown;
  }
  componentDidUpdate() {
    this.checkIfOutofBorders();
  }

  onkeydown = e => {
    e = e || window.event;
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: "UP" });
        break;
      case 40:
        this.setState({ direction: "DOWN" });
        break;
      case 37:
        this.setState({ direction: "LEFT" });
        break;
      case 39:
        this.setState({ direction: "RIGHT" });
        break;
    }
  };
  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.state.direction) {
      case "RIGHT":
        head = [head[0] + 2, head[1]];
        break;
      case "LEFT":
        head = [head[0] - 2, head[1]];
        break;
      case "DOWN":
        head = [head[0], head[1] + 2];
        break;
      case "UP":
        head = [head[0], head[1] - 2];
        break;
    }
    dots.push(head);
    dots.shift();
    this.setState({
      snakeDots: dots
    });
  };

  checkIfOutofBorders() {
    let dots = this.state.snakeDots.slice();
    let head = dots[dots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }
  onGameOver() {
    alert("Game Over");
    this.setState(initialState);
  }
  render() {
    const { snakeDots, food } = this.state;
    return (
      <div className="game-area">
        <Snake snakeDots={snakeDots} />
        <Food dot={food} />
      </div>
    );
  }
}
export default App;
