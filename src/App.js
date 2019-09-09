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
  speed: 200,
  food: [6, 8],
  direction: "RIGHT",
  snakeDots: [[0, 0], [2, 0]],
  score: 0
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
    this.checkIfCollased();
    this.checkIfEat();
  }

  onkeydown = (e, id) => {
    e = e || window.event;
    switch (e.keyCode || id) {
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

  checkIfCollased() {
    let snake = this.state.snakeDots.slice();
    let head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    });
  }

  checkIfEat() {
    let snakeDots = this.state.snakeDots.slice();
    let head = snakeDots[snakeDots.length - 1];
    let food = this.state.food;
    if (head[0] === food[0] && head[1] === food[1]) {
      this.setState({ food: getRandomCoordinates() });
      this.enlargeSnake();
      this.increaseSpeed();
      this.setState({ score: this.state.score + 10 });
    }
  }

  enlargeSnake() {
    let newSnake = this.state.snakeDots.slice();
    newSnake.unshift([]);
    this.setState({ snakeDots: newSnake });
  }

  increaseSpeed() {
    if (this.state.speed > 10) {
      this.setState({ speed: this.state.speed + 10 });
    }
  }
  onGameOver() {
    alert("Game Over");
    this.setState(initialState);
  }
  render() {
    window.state = this.state;
    const { snakeDots, food, score } = this.state;
    return (
      <div>
        <div className="btn-container">
          <button
            className="up"
            onClick={e => {
              this.onkeydown(e, 38);
            }}
          >
            UP
          </button>
          <button
            className="left"
            onClick={e => {
              this.onkeydown(e, 37);
            }}
          >
            LEFT
          </button>
          <button
            className="down"
            onClick={e => {
              this.onkeydown(e, 40);
            }}
          >
            DOWN
          </button>
          <button
            className="right"
            onClick={e => {
              this.onkeydown(e, 39);
            }}
          >
            RIGHT
          </button>
        </div>
        <h1 className="score">Score: {score}</h1>
        <div className="game-area">
          <Snake snakeDots={snakeDots} />
          <Food dot={food} />
        </div>
      </div>
    );
  }
}
export default App;
