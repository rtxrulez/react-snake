import React from "react";
import "./Game.css";

class Game extends React.Component {
  state = {
    width: 10,
    height: 10,
    snake: [[1, 1], [1, 2], [1, 3]],
    headAngle: 0,
    apples: [[5, 2], [8, 1]],
    field: Array(10).fill(Array(10).fill(1))
  };
  componentDidMount() {
    
  }
  render() {
    let { snake, field } = this.state;
    return (
      <div className="stock">
        {this.state.field.map((column, x) => {
          return (
            <div className="row" key={x}>
              {column.map((el, y) => {
                for (let i = 0; i < snake.length; i++) {
                  if (x === snake[i][0] && y === snake[i][1]) {
                    return <span key={y} className="box active" ></span>;
                  }
                }
                return (
                  <span className="box" key={y}>
                    
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Game;
