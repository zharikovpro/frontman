'use strict';

var path = require('./path.js');

var getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

var randomEmptyCell = (matrix) => {

  var emptyCells = [];

  // Выбрали всё пустые ячейки
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 0) {
        emptyCells.push({ x: i, y: j });
      }
    }
  }

  if (!emptyCells[0]) {
    return false;
  }

  let d = getRandomInt( 1, emptyCells.length ) - 1;

  return {
    x: emptyCells[d].x,
    y: emptyCells[d].y
  };

};

class Board {

  constructor (col = 9, row = 9) {
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

  newBall ({x, y} = randomEmptyCell(this.matrix)) {

    this.matrix[x][y] = 1;

  }

  teleport (oldX, oldY, newX, newY) {

    if (this.matrix[newX][newY] !== 0) {
      return false;
    }

    this.matrix[newX][newY] = this.matrix[oldX][oldY];

    this.matrix[oldX][oldY] = 0;

  }

  transition (oldX, oldY, newX, newY) {

    if (this.matrix[oldX][oldY] == 0) {
      return false;
    }

    if (this.matrix[newX][newY] !== 0) {
      return false;
    }

    var localePath = path(this.matrix, oldX, oldY, newX, newY);

    if (!localePath) {
      return false;
    }

    for (let i = 0; i < localePath.length - 1; i++) {
      this.teleport(localePath[i].x, localePath[i].y, localePath[i + 1].x, localePath[i + 1].y);
    }
  }

  render () {

    console.table(this.matrix);

  }

  matrix () {
    return this.matrix;
  }

};

var firstBoard = new Board();

// Просто для удобства
for (let i = 0; i < 20; i++) {
  firstBoard.newBall();
}

firstBoard.render();