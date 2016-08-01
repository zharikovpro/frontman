const Path = require('./path.js');

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomEmptyCell = (matrix) => {
  const emptyCells = [];

  // Выбрали всё пустые ячейки
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }

  if (!emptyCells[0]) return false;

  const d = getRandomInt(1, emptyCells.length) - 1;

  return [
    emptyCells[d].x,
    emptyCells[d].y,
  ];
};

class Board {
  constructor(col = 9, row = 9) {
    this.columns = col;
    this.rows = row;

    this.matrix = new Array(this.columns);

    for (let i = 0; i < this.columns; i++) {
      this.matrix[i] = new Array(this.rows);

      for (let j = 0; j < this.rows; j++) {
        this.matrix[i][j] = 0;
      }
    }
  }

  deleteBall(x, y) {
    this.matrix[x][y] = 0;
  }

  createBall([x, y] = randomEmptyCell(this.matrix)) {
    this.matrix[x][y] = 1;
  }

  teleport(oldX, oldY, newX, newY) {
    this.matrix[newX][newY] = this.matrix[oldX][oldY];

    this.matrix[oldX][oldY] = 0;

    return true;
  }

  transition(oldX, oldY, newX, newY) {
    if (this.matrix[oldX][oldY] === 0) return false;

    if (this.matrix[newX][newY] !== 0) return false;

    const path = new Path(this.matrix);

    const localePath = path.short(oldX, oldY, newX, newY);

    if (typeof localePath !== 'object') return false;

    for (let i = 0; i < localePath.length - 1; i++) {
      this.teleport(localePath[i].x, localePath[i].y, localePath[i + 1].x, localePath[i + 1].y);
    }

    return true;
  }

  render() {
    let str = '';

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        str += (this.matrix[i][j] === 0) ? '+ ' : '- ';
      }
      str += '\n';
    }

    console.log(str);
  }
}

module.exports = Board;
