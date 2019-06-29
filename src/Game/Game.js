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
    // let fieldSnake = this.state.field;
    // let { snake, field } = this.state;
    // console.log("f", field);
    // for (let i = 0; i < this.state.width; i++) {
    //   for (let y = 0; y < this.state.height; y++) {
    //     for (let s = 0; s < snake.length; s++) {
    //       let snakeX = snake[s][0];
    //       let snakeY = snake[s][1];
    //       if (i === snakeX && y === snakeY) {
    //         fieldSnake[snakeX][snakeY] = 2;
    //         console.log(snake[s]);
    //       }
    //     }
    //   }
    // }
    // console.log("ffff", fieldSnake);
  }
  render() {
    let { snake, field } = this.state;
    return (
      <div className="stock">
        {this.state.field.map((column, x) => {
          return (
            <div key={x}>
              {column.map((el, y) => {
                for (let i = 0; i < snake; i++) {
                  if (x == snake[i][0] && y == snake[y][1]) {
                    return <span key={y} className="active" />;
                  }
                }
                return (
                  <span key={y}>
                    |{x}-{y}|
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
