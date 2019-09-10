import React from "react";
import UIfx from "uifx";
import Snake from "./Snake";
import Food from "./Food";
import eat from "./eat.mp3";
import gameOver from "./gameover.mp3";
import Speed from "./components/Speed";

const beep = new UIfx(eat, { volume: 0.1 });
const over = new UIfx(gameOver, { volume: 0.1 });
const playSound = () => {
  beep.play();
};

const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

  return [x, y];
};
const initialState = {
  speed: 100,
  food: [6, 8],
  direction: "RIGHT",
  snakeDots: [[0, 0], [2, 0]],
  score: 0,
  interval: null
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    this.setState({ food: getRandomCoordinates() });

    let interval = setInterval(this.moveSnake, this.state.speed);
    this.setState({ interval });
    document.onkeydown = this.onkeydown;
  }
  componentDidUpdate() {
    // setInterval(this.moveSnake, this.state.speed);
    this.checkIfOutofBorders();
    this.checkIfCollapsed();
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
    let tail = dots[0];
    if (head[0] > 100) {
      head[0] = 0;
      // changeState
      this.changeState(dots, head);
    }
    if (head[0] < 0) {
      head[0] = 98;
      //changeState
      this.changeState(dots, head);
    }
    if (head[1] > 100) {
      head[1] = 0;
      this.changeState(dots, head);
    }

    if (head[1] < 0) {
      head[1] = 100;
      this.changeState(dots, head);
    }
  }
  changeState(dots, head) {
    dots.push(head);
    dots.shift();
    this.setState({ snakeDots: dots });
  }

  checkIfCollapsed() {
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
      playSound();
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
    // over.play();
    // alert("Game Over");
    // this.setState(initialState);
  }
  handleSpeed = e => {
    let { name, value } = e.target;
    clearInterval(this.state.interval);
    let speed = (10 - value) * 100;
    let interval = setInterval(this.moveSnake, speed);

    this.setState({ speed: speed, interval });
  };

  render() {
    window.state = this.state;
    const { snakeDots, food, score, speed, interval } = this.state;
    const { handleSpeed } = this;
    return (
      <div className="App">
        <h3 className="score">Score: {score}</h3>
        <div className="game-area">
          <Snake snakeDots={snakeDots} />
          <Food dot={food} />
        </div>
        <Speed speed={10 - speed / 100} handleChange={handleSpeed} />
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
      </div>
    );
  }
}
export default App;
