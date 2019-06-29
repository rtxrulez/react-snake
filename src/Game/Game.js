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

  walkSnake(to = 3) {
    const { snake } = this.state;
    let len = snake.length - 1;
    // console.log(snake[len])
    let newCord = [];

    if (to === 3) {
      for (let i = 0; i < snake.length; i++) {
        if (snake[i][1] >= 9) {
          snake[i][1] = 0;
        } else {
          snake[i][1] = snake[i][1] + 1;
        }
      }
    } else if (to === 9) {
      for (let i = 0; i < snake.length; i++) {
        if (snake[i][1] <= 0) {
          snake[i][1] = 9;
        } else {
          snake[i][1] = snake[i][1] - 1;
        }
      }
      
    } else if (to === 6) {
      for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] >= 9) {
          snake[i][0] = 0;
        } else {
          snake[i][0] = snake[i][0] + 1;
        }
      }
    } else if (to === 12) {
      for (let i = 0; i < snake.length; i++) {
        if (snake[i][0] <= 0) {
          snake[i][0] = 9;
        } else {
          snake[i][0] = snake[i][0] - 1;
        }
      }
    }
    console.log("snake", snake);
    // } else if (to === 9) {
    //   newCord = [snake[len][0], snake[len][1] - 1];

    //   if (newCord[1] < 0) {
    //     newCord = [snake[len][0], 10];
    //   }
    // } else if (to == 6) {
    //   newCord = [snake[len][0] + 1, snake[len][1]];

    //   if (newCord[0] >= 10) {
    //     newCord = [1, snake[len][0]];
    //   }
    // }
    // snake.push(newCord);
    this.setState({
      snake: snake
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
    // this.walkSnake(this.state.headAngle);
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
                  if (x === snake[i][0] && y === snake[i][1]) {
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
