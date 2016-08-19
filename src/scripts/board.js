const PathFinder = require('wave-pathfinder');

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const randomEmptyCell = ({ matrix, colors, emptyCell }) => {
  const emptyCells = [];

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === emptyCell) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }

  if (!emptyCells[0]) return false;

  const d = getRandomInt(1, emptyCells.length) - 1;

  return [
    emptyCells[d].x,
    emptyCells[d].y,
    getRandomInt(0, colors.length - 1),
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

      for (let j = 0; j < rows; j++) this.matrix[i][j] = this.emptyCell;
    }

    if (busyCells.length) {
      busyCells.forEach(cell => {
        this.createBall([cell.rRow, cell.rCell, cell.colorIndex]);
      });
    }
  }

  createBall([x, y, color] = randomEmptyCell(this)) {
    if (this.matrix[x][y] === this.emptyCell) {
      this.matrix[x][y] = color;
    }
  }

  deleteBall(x, y) {
    this.matrix[x][y] = this.emptyCell;
  }

  moveBall(oldX, oldY, newX, newY) {
    if (this.matrix[oldX][oldY] === this.emptyCell) return false;

    if (this.matrix[newX][newY] !== this.emptyCell) return false;

    const path = new PathFinder(this.matrix.map(row => row.map(cell => (
      (cell === this.emptyCell) ? 1 : 0
    ))));

    const localePath = path.findPath(oldX, oldY, newX, newY);

    if (typeof localePath !== 'object') return false;

    this.matrix[newX][newY] = this.matrix[oldX][oldY];
    this.matrix[oldX][oldY] = this.emptyCell;

    return true;
  }

  render() {
    let str = '';

    for (let i = 0; i < this.matrix.length; i++) {
      for (let j = 0; j < this.matrix.length; j++) {
        str += (this.matrix[i][j] !== this.emptyCell) ? `${this.matrix[i][j]} ` : '- ';
      }
      if (i !== this.matrix.length - 1) str += '\n';
    }

    console.log(str);
  }

  deleteBallsByColors(color) {
    for (let x = 0; x < this.matrix.length; x++) {
      let sequenceCount = 0;
      for (let y = 0; y <= this.matrix[x].length; y++) {
        const c = +this.matrix[x][y];
        if (c === color) {
          sequenceCount++;
        }

        if (c !== color || typeof this.matrix[x][y] === undefined) {
          if (sequenceCount < 5) {
            sequenceCount = 0;
          } else {
            for (let i = 1; i <= sequenceCount; i++) {
              this.matrix[x][y - i] = this.emptyCell;
              this.score++;
            }
            sequenceCount = 0;
          }
        }
      }
    }

    for (let y = 0; y < this.matrix[0].length; y++) {
      let sequenceCount = 0;
      for (let x = 0; x <= this.matrix.length; x++) {
        if (this.matrix[x]) {
          const c = +this.matrix[x][y];
          if (c === color) {
            sequenceCount++;
          }
        }

        if (!this.matrix[x] || +this.matrix[x][y] !== color) {
          if (sequenceCount < 5) {
            sequenceCount = 0;
          } else {
            for (let i = 1; i <= sequenceCount; i++) {
              this.matrix[x - i][y] = this.emptyCell;
              this.score++;
            }
            sequenceCount = 0;
          }
        }
      }
    }
  }

  deleteAllCombinationBalls() {
    for (let i = 0; i < this.colors.length; i++) {
      this.deleteBallsByColors(i);
    }
  }
}

module.exports = Board;
