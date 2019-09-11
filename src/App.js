import React from "react";
import GameArea from "./GameArea";
import Speed from "./components/Speed";
import Food from "./Food";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./components/sketch";

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
  score: 0,
  direction: "RIGHT",
  gameStatus: "PAUSE"
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  componentDidMount() {
    this.setState({ food: getRandomCoordinates() });
  }
  changeFoodCoordinates = () => {
    this.setState({ food: getRandomCoordinates() });
  };
  updateScore = () => {
    const { score } = this.state;
    this.setState({ score: score + 10 }, () => {
      if (score >= 100) {
        document.querySelector(".game-area").className += " score100";
      }
    });
  };
  changeDirection = (e, id) => {
    const { direction } = this.state;
    e = e || window.event;
    switch (e.keyCode || id) {
      case 38:
        if (direction !== "DOWN") this.setState({ direction: "UP" });
        break;
      case 40:
        if (direction !== "UP") this.setState({ direction: "DOWN" });
        break;
      case 37:
        if (direction !== "RIGHT") this.setState({ direction: "LEFT" });
        break;
      case 39:
        if (direction !== "LEFT") this.setState({ direction: "RIGHT" });
        break;
      default:
        return;
    }
  };
  handleSpeed = e => {
    let { value } = e.target;
    let speed = (10 - value) * 10;
    this.setState({ speed: speed });
  };

  resetScore = () => {
    this.setState({ score: 0 });
  };

  toggleGame = e => {
    let { gameStatus } = this.state;
    gameStatus = gameStatus === "PLAY" ? "PAUSE" : "PLAY";
    this.setState({ gameStatus });
  };

  render() {
    const { food, speed, score, direction, gameStatus } = this.state;
    const {
      changeFoodCoordinates,
      updateScore,
      changeDirection,
      handleSpeed,
      resetScore
    } = this;

    return (
      <div>
        <div className="head">
          <h2 className="score">Score: {score}</h2>
          <div>
            <P5Wrapper sketch={sketch} />
          </div>
          <button
            className="play"
            onClick={e => {
              this.toggleGame(e);
            }}
          >
            {gameStatus}
          </button>
        </div>
        <div className="game-area">
          <GameArea
            food={food}
            speed={speed}
            updateScore={updateScore}
            changeFoodCoordinates={changeFoodCoordinates}
            direction={direction}
            changeDirection={changeDirection}
            resetScore={resetScore}
            gameStatus={gameStatus}
          />
          <Food dot={food} />
        </div>
        <Speed
          className="speed-controller"
          speed={10 - speed / 10}
          handleChange={handleSpeed}
        />
        <div className="btn-container">
          <button
            className="up"
            onClick={e => {
              this.changeDirection(e, 38);
            }}
          >
            UP
          </button>
          <button
            className="left"
            onClick={e => {
              this.changeDirection(e, 37);
            }}
          >
            LEFT
          </button>
          <button
            className="down"
            onClick={e => {
              this.changeDirection(e, 40);
            }}
          >
            DOWN
          </button>
          <button
            className="right"
            onClick={e => {
              this.changeDirection(e, 39);
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
