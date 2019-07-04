import React from "react";
import "./Game.css";

const defaultData = {
  width: 10,
  height: 10,
  snake: [[1, 1], [1, 2], [1, 3]],
  headAngle: 3,
  apples: [[2, 3], [8, 1], [7, 5], [4, 9]],
  field: Array(10).fill(Array(10).fill(1))
};

class Game extends React.Component {
  state = defaultData;

  stopGame = () => {
    alert("Игра приостановлена!");
    this.setState(defaultData);
  };

  maxMap = cord => {
    const map = this.state.width;
    if (cord >= map) {
      return 0;
    } else if (cord < 0) {
      return map;
    }
    return cord;
  };

  ifApple = (x, y) => {
    let apples = [...this.state.apples];
    for (let a = 0; a < apples.length; a++) {
      if (x == apples[a][0] && y == apples[a][1]) {
        apples.splice(a, 1);
        this.setState({
          apples: apples
        });
        return true;
      }
    }
    return false;
  };

  goSnake(x, y) {
    let { snake } = this.state;
    x = this.maxMap(x);
    y = this.maxMap(y);
    if (this.ifApple(x, y)) {
      console.info("apple");
    } else {
      snake.shift();
    }
    snake.push([x, y]);
    return snake;
  }

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

    return this.goSnake(x, y);
  };

  prependSnake = (axis = "x") => {
    let { snake } = this.state;
    let { x, y } = 0;

    let headX = snake[snake.length - 1][0];
    let headY = snake[snake.length - 1][1];

    if (axis === "x") {
      x = headX - 1;
      y = headY;
    } else if (axis === "y") {
      x = headX;
      y = headY - 1;
    }

    return this.goSnake(x, y);
  };

  walkSnake(to = 3) {
    const { snake } = this.state;
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

      if (this.state.apples.length === 0 && this.state.snake.length >= 9) {
        this.stopGame();
      }
    }, 500);
  }

  componentWillMount() {
    document.addEventListener("keydown", e => {
      const { keyCode } = e;
      if (keyCode === 38) {
        this.onTop();
      } else if (keyCode === 40) {
        this.onBottom();
      } else if (keyCode === 39) {
        this.onRight();
      } else if (keyCode === 37) {
        this.onLeft();
      }
    });
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", e => {});
  }

  render() {
    let { snake, field, apples } = this.state;
    return (
      <div className="stock">
        {field.map((column, y) => {
          return (
            <div className="row" key={y}>
              {column.map((el, x) => {
                for (let i = 0; i < snake.length; i++) {
                  if (x === snake[i][0] && y === snake[i][1]) {
                    return <span key={x} className="box active" />;
                  }
                }
                for (let a = 0; a < apples.length; a++) {
                  if (x === apples[a][0] && y === apples[a][1]) {
                    return <span key={x} className="box apple" />;
                  }
                }
                return <span className="box" key={x} />;
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Game;
