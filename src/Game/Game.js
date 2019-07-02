import React from "react";
import "./Game.css";

class Game extends React.Component {
  state = {
    width: 10,
    height: 10,
    snake: [[1, 1], [1, 2], [1, 3]],
    headAngle: 3,
    apples: [[5, 2], [8, 1]],
    field: Array(10).fill(Array(10).fill(1))
  };

  appendSnake = (axis = "x") => {
    let { snake } = this.state;
    let { x, y } = 0;

    let headX = snake[snake.length - 1][0];
    let headY = snake[snake.length - 1][1];

    if (axis === "x") {
      x = headX + 1;
      y = headY;
    } else if (axis === "y") {
      x = headX;
      y = headY + 1;
    }

    snake.push([x, y]);
    snake.shift();
    return snake;
  };

  prependSnake = (axis = "x") => {
    let { snake } = this.state;
    let { x, y } = 0;

    let headX = snake[0][0];
    let headY = snake[0][1];

    if (axis === "x") {
      x = headX - 1;
      y = headY;
    } else if (axis === "y") {
      x = headX;
      y = headY - 1;
    }

    snake.unshift([x, y]);
    snake.pop();
    return snake;
  };

  walkSnake(to = 3) {
    const { snake } = this.state;
    let len = snake.length - 1;
    // console.log(snake[len])
    let newCord = [];

    if (to === 3) {
      newCord = this.appendSnake("x");
    } else if (to === 9) {
      newCord = this.prependSnake("x");
    } else if (to === 6) {
      newCord = this.appendSnake("y");
    } else if (to === 12) {
      newCord = this.prependSnake("y");
    }
    this.setState({
      snake: newCord
    });
  }

  onTop = e => {
    this.setState({
      headAngle: 12
    });
  };

  onBottom = e => {
    this.setState({
      headAngle: 6
    });
  };

  onRight = e => {
    this.setState({
      headAngle: 3
    });
  };

  onLeft = e => {
    this.setState({
      headAngle: 9
    });
    // this.walkSnake(this.state.headAngle);
  };
  componentDidMount() {
    this.walkSnake(this.state.headAngle);
    setInterval(() => {
      this.walkSnake(this.state.headAngle);
    }, 1000);
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
                  if (x === snake[i][1] && y === snake[i][0]) {
                    return <span key={y} className="box active" />;
                  }
                }
                return <span className="box" key={y} />;
              })}
            </div>
          );
        })}
        <button onClick={this.onRight}>Right</button>
        <button onClick={this.onLeft}>Left</button>
        <button onClick={this.onTop}>Top</button>
        <button onClick={this.onBottom}>Bottom</button>
      </div>
    );
  }
}

export default Game;
