const PathFinder = require('wave-pathfinder');

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomEmptyCell = (matrix) => {
  const emptyCells = [];

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
  constructor(cells = 9, rows = 9, busyCells = [], colors) {
    if (!cells || typeof cells !== 'number') {
      throw new Error('Incorrect first argument!');
    }

    if (!rows || typeof rows !== 'number') {
      throw new Error('Incorrect two argument!');
    }

    this.score = 0;
    this.emptyCell = -1;
    this.colors = colors || ['#000', '#f00', '#0f0', '#00f', '#ff0', '#f0f', '#0ff', '#fff'];
    this.matrix = new Array(this.columns);

    for (let i = 0; i < cells; i++) {
      this.matrix[i] = new Array(rows);

      for (let j = 0; j < rows; j++) this.matrix[i][j] = 0;
    }

    if (busyCells.length) {
      busyCells.forEach(cell => {
        this.matrix[cell.rRow][cell.rCell] = cell.colorIndex;
      });
    }
  }

  createBall([x, y] = randomEmptyCell(this.matrix)) {
    this.matrix[x][y] = 1;
  }

  deleteBall(x, y) {
    this.matrix[x][y] = 0;
  }

  moveBall(oldX, oldY, newX, newY) {
    if (this.matrix[oldX][oldY] === 0) return false;

    if (this.matrix[newX][newY] !== 0) return false;

    const path = new PathFinder(this.matrix.map(row => row.map(cell => (!cell ? 1 : 0))));

    const localePath = path.findPath(oldX, oldY, newX, newY);

    if (typeof localePath !== 'object') return false;

    this.matrix[oldX][oldY] = 0;
    this.matrix[newX][newY] = 1;

    return true;
  }

  deleteBalls() {
    for (let x = 0; x < this.matrix.length; x++) {
      let sequenceCount = 0;
      for (let y = 0; y < this.matrix[x].length; y++) {
        if (this.matrix[x][y]) {
          sequenceCount++;
        }

        if (!this.matrix[x][y] || (y === this.matrix[x].length - 1)) {
          if (sequenceCount < 5) {
            sequenceCount = 0;
          } else {
            for (let i = 1; i <= sequenceCount; i++) {
              this.matrix[x][y - i] = 0;
              this.score++;
            }
            sequenceCount = 0;
          }
        }
      }
    }

    for (let y = 0; y < this.matrix[0].length; y++) {
      let sequenceCount = 0;
      for (let x = 0; x < this.matrix.length; x++) {
        if (this.matrix[x][y]) {
          sequenceCount++;
        }

        if (!this.matrix[x][y] || (y === this.matrix[x].length - 1)) {
          if (sequenceCount < 5) {
            sequenceCount = 0;
          } else {
            for (let i = 1; i <= sequenceCount; i++) {
              this.matrix[x - i][y] = 0;
              this.score++;
            }
            sequenceCount = 0;
          }
        }
      }
    }
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
