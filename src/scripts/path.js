const isset = (variables) => typeof variables !== 'undefined';

class Path {

  /**
   * Find the shortest path in the matrix
   *
   * @author Govorov Nikolay
   *
   * @param {array} passabilityMatrix parameter accepts a two-dimensional matrix, bull type,
   *                where true is the presence of the way, and the false is its absence.
   *                Example: [ 1, 1, 1 ]
   *                         [ 0, 0, 1 ]
   *                         [ 1, 0, 1 ]
   *
   * @return the function returns nothing.
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

  short(startX, startY, finishX, finishY) {
    if (!isset(this.matrix[startX][startY])) {
      throw new Error('Incorrect coordinates of starting cell');
    }

    if (!isset(this.matrix[finishX][finishY])) {
      throw new Error('Incorrect coordinates of finishing cell');
    }

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

    if (this.matrix[finishX][finishY] === this.FINISH_CELL) {
      return null;
    }

    let resultPath = [];
    let activeX = finishX;
    let activeY = finishY;

    const addStep = (x, y) => {
      resultPath.push({ x, y });
    };

    for (let step = this.matrix[finishX][finishY]; step >= 0; step--) {
      if (isset(this.matrix[activeX + 1])) {
        if (this.matrix[activeX + 1][activeY] === step - 1) {
          addStep(activeX + 1, activeY);
          activeX++;
        }
      }

      if (isset(this.matrix[activeX - 1])) {
        if (this.matrix[activeX - 1][activeY] === step - 1) {
          addStep(activeX - 1, activeY);
          activeX = activeX - 1;
        }
      }

      if (this.matrix[activeX][activeY + 1] === step - 1) {
        addStep(activeX, activeY + 1);
        activeY = activeY + 1;
      }

      if (this.matrix[activeX][activeY - 1] === step - 1) {
        addStep(activeX, activeY - 1);
        activeY = activeY - 1;
      }
    }

    resultPath = resultPath.reverse();

    addStep(finishX, finishY);

    return resultPath;
  }
}

module.exports = Path;
