import React from "react";
import UIfx from "uifx";
import Snake from "./Snake";
import eat from "./eat.mp3";
import gameOver from "./gameover.mp3";

const beep = new UIfx(eat, { volume: 0.1 });
const over = new UIfx(gameOver, { volume: 0.1 });
const playSound = () => {
  beep.play();
};

const initialState = {
  snakeDots: [[0, 0], [2, 0]],
  interval: null
};

class GameArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    let { speed } = this.props;
    let interval = setInterval(this.moveSnake, speed);
    this.setState({ interval });
    document.onkeydown = this.onkeydown;
  }
  componentDidUpdate(prevProps, prevState) {
    this.checkIfOutofBorders();
    this.checkIfCollapsed();
    this.checkIfEat();

    if (prevProps.speed !== this.props.speed) {
      let { interval } = prevState;
      clearInterval(interval);
      let newInterval = setInterval(this.moveSnake, this.props.speed);
      this.setState({ interval: newInterval });
    }
  }

  onkeydown = e => {
    this.props.changeDirection(e);
  };

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];

    switch (this.props.direction) {
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
    let food = this.props.food;

    if (head[0] === food[0] && head[1] === food[1]) {
      this.props.changeFoodCoordinates();
      this.enlargeSnake();
      this.increaseSpeed();
      playSound();
      this.props.updateScore();
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

  render() {
    const { snakeDots } = this.state;

    return (
      <div>
        <Snake snakeDots={snakeDots} />
      </div>
    );
  }
}
export default GameArea;
