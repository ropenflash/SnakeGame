import React from "react";
import Snake from "./Snake";
import Food from "./Food";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      food: [6, 8],
      snakeDots: [[0, 0], [2, 0]]
    };
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
