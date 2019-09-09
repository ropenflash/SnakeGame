import React from "react";
import Snake from "./Snake";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snakeDots: [[0, 0], [2, 0]]
    };
  }
  render() {
    const { snakeDots } = this.state;
    return (
      <div className="game-area">
        <Snake snakeDots={snakeDots} />
      </div>
    );
  }
}
export default App;
