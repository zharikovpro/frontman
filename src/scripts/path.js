const isset = (variables) => typeof variables !== 'undefined';

class Path {

  /**
   * Find the shortest path in the matrix
   *
   * @author Govorov Nikolay
   *
   * @param {array} sourceMatrix The original matrix to be given to the search path
   */

  constructor(sourceMatrix) {
    if (typeof sourceMatrix !== 'object') {
      throw new Error('Incorrect matrix!');
    }

    this.MATRIX_WIDTH = sourceMatrix.length;
    this.MATRIX_HEIGHT = sourceMatrix[0].length;
    this.PATHLESS_CELL = -2;
    this.PASSABLE_CELL = -3;
    this.START_CELL = 0;
    this.FINISH_CELL = -1;
    this.AMOUNT_CELLS = this.MATRIX_WIDTH * this.MATRIX_HEIGHT;

    this.matrix = sourceMatrix.map((row) => row.map(
        cell => (cell === 0 ? this.PASSABLE_CELL : this.PATHLESS_CELL)
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

    for (let iter = 0; iter < this.AMOUNT_CELLS; iter++) {
      for (let i = 0; i < this.MATRIX_WIDTH; i++) {
        for (let j = 0; j < this.MATRIX_HEIGHT; j++) {
          if (this.matrix[i][j] === iter) {
            if (isset(this.matrix[i + 1])) {
              if (this.matrix[i + 1][j] === this.PASSABLE_CELL) {
                this.matrix[i + 1][j] = iter + 1;
              }
              if (this.matrix[i + 1][j] === this.FINISH_CELL) {
                this.matrix[i + 1][j] = iter + 1;
                break;
              }
            }

            if (isset(this.matrix[i - 1])) {
              if (this.matrix[i - 1][j] === this.PASSABLE_CELL) {
                this.matrix[i - 1][j] = iter + 1;
              }
              if (this.matrix[i - 1][j] === this.FINISH_CELL) {
                this.matrix[i - 1][j] = iter + 1;
                break;
              }
            }

            if (this.matrix[i][j + 1] === this.PASSABLE_CELL) {
              this.matrix[i][j + 1] = iter + 1;
            }
            if (this.matrix[i][j + 1] === this.FINISH_CELL) {
              this.matrix[i][j + 1] = iter + 1;
              break;
            }

            if (this.matrix[i][j - 1] === this.PASSABLE_CELL) {
              this.matrix[i][j - 1] = iter + 1;
            }
            if (this.matrix[i][j - 1] === this.FINISH_CELL) {
              this.matrix[i][j - 1] = iter + 1;
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
