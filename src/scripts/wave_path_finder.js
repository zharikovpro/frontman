const isset = (variables) => typeof variables !== 'undefined';

class WavePathFinder {

  /**
   * Find the shortest path in the matrix
   *
   * @author Govorov Nikolay
   *
   * @param {array} passabilityMatrix parameter accepts a two-dimensional boolean matrix
   *                where true is passable cell, false is unpassable
   *                Example: [ 1, 1, 1 ]
   *                         [ 0, 0, 1 ]
   *                         [ 1, 0, 1 ]
   *
   * @return {undefined}
   */

  constructor(passabilityMatrix) {
    if (typeof passabilityMatrix !== 'object') {
      throw new Error('Incorrect matrix!');
    }

    this.UNPASSABLE_CELL = -2;
    this.PASSABLE_CELL = -3;

    this.START_CELL = 0;
    this.FINISH_CELL = -1;

    this.matrix = passabilityMatrix.map(row => row.map(
      cell => (cell ? this.PASSABLE_CELL : this.UNPASSABLE_CELL)
    ));
  }

  findPath(startX, startY, finishX, finishY) {
    this.spreadWave(startX, startY, finishX, finishY);

    this.restorationPath(finishX, finishY);

    return this.resultPath;
  }

  spreadWave(startX, startY, finishX, finishY) { // Распространение волны
    this.resultPath = [];

    if (!isset(this.matrix[startX][startY])) {
      throw new Error('Incorrect coordinates of starting cell');
    }

    if (!isset(this.matrix[finishX][finishY])) {
      throw new Error('Incorrect coordinates of finishing cell');
    }

    this.matrix = this.matrix.map(row => row.map(
      cell => ((cell === this.UNPASSABLE_CELL) ? this.UNPASSABLE_CELL : this.PASSABLE_CELL)
    ));

    this.matrix[startX][startY] = this.START_CELL;
    this.matrix[finishX][finishY] = this.FINISH_CELL;

    for (let iter = 0; iter < this.matrix.length * this.matrix[0].length; iter++) {
      for (let x = 0; x < this.matrix.length; x++) {
        for (let y = 0; y < this.matrix[0].length; y++) {
          if (this.matrix[x][y] === iter) {
            if (isset(this.matrix[x + 1])) {
              if (this.matrix[x + 1][y] === this.PASSABLE_CELL) {
                this.matrix[x + 1][y] = iter + 1;
              }
              if (this.matrix[x + 1][y] === this.FINISH_CELL) {
                this.matrix[x + 1][y] = iter + 1;
                break;
              }
            }

            if (isset(this.matrix[x - 1])) {
              if (this.matrix[x - 1][y] === this.PASSABLE_CELL) {
                this.matrix[x - 1][y] = iter + 1;
              }
              if (this.matrix[x - 1][y] === this.FINISH_CELL) {
                this.matrix[x - 1][y] = iter + 1;
                break;
              }
            }

            if (this.matrix[x][y + 1] === this.PASSABLE_CELL) {
              this.matrix[x][y + 1] = iter + 1;
            }
            if (this.matrix[x][y + 1] === this.FINISH_CELL) {
              this.matrix[x][y + 1] = iter + 1;
              break;
            }

            if (this.matrix[x][y - 1] === this.PASSABLE_CELL) {
              this.matrix[x][y - 1] = iter + 1;
            }
            if (this.matrix[x][y - 1] === this.FINISH_CELL) {
              this.matrix[x][y - 1] = iter + 1;
              break;
            }
          }
        }
        if (this.matrix[finishX][finishY] !== this.FINISH_CELL) break;
      }
      if (this.matrix[finishX][finishY] !== this.FINISH_CELL) break;
    }
  }

  restorationPath(finishX, finishY) {
    if (this.matrix[finishX][finishY] === this.FINISH_CELL) {
      this.resultPath = null;
      return null;
    }

    this.resultPath = [];

    let currentX = finishX;
    let currentY = finishY;

    const addStep = (x, y) => {
      this.resultPath.push({ x, y });
    };

    for (let step = this.matrix[finishX][finishY]; step >= 0; step--) {
      if (isset(this.matrix[currentX + 1])) {
        if (this.matrix[currentX + 1][currentY] === step - 1) {
          addStep(currentX + 1, currentY);
          currentX++;
        }
      }

      if (isset(this.matrix[currentX - 1])) {
        if (this.matrix[currentX - 1][currentY] === step - 1) {
          addStep(currentX - 1, currentY);
          currentX = currentX - 1;
        }
      }

      if (this.matrix[currentX][currentY + 1] === step - 1) {
        addStep(currentX, currentY + 1);
        currentY = currentY + 1;
      }

      if (this.matrix[currentX][currentY - 1] === step - 1) {
        addStep(currentX, currentY - 1);
        currentY = currentY - 1;
      }
    }

    this.resultPath = this.resultPath.reverse();

    addStep(finishX, finishY);

    return this.resultPath;
  }
}

module.exports = WavePathFinder;
