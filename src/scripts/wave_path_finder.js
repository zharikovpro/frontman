const isset = (variables) => typeof variables !== 'undefined';

  /**
   * This class is an implementation of the wave algorithm
   * Wiki: (https://ru.wikipedia.org/wiki/Алгоритм_Ли)
   *
   * @author Andrey Zharikov & Nikolay Govorov
   *
   * */

class WavePathFinder {

  /**
   * Find the shortest path in the matrix
   *
   * @param {array} passabilityMatrix parameter accepts a two-dimensional boolean matrix
   *                where true is passable cell, false is non-passable
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

  /**
   * The function is a wrapper over functions propagateWave and restorePath.
   *
   * @param {number} startX
   * @param {number} startY
   * @param {number} finishX
   * @param {number} finishY
   *
   * @return {array} If there is a way the function will return an array of objects with
   *                 two fields (x and y), including the start and end points.
   *                 Example: [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 },
   *                            { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 } ]
   *                 If there is no way it will return null.
   */

  findPath(startX, startY, finishX, finishY) {
    this.propagateWave(startX, startY, finishX, finishY);

    this.restorePath(finishX, finishY);

    return this.resultPath;
  }

  /**
   * The function will propagate the wave. This is the second stage of the wave algorithm.
   *
   * @param {number} startX
   * @param {number} startY
   * @param {number} finishX
   * @param {number} finishY
   *
   * @return {undefined}
   */

  propagateWave(startX, startY, finishX, finishY) {
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

  /**
   * This method will restore the path on the basis of waves from a point which came to zero.
   * Execute this method after method propagateWave. This is the third step of the wave algorithm.
   *
   * @param {number} finishX
   * @param {number} finishY
   *
   * @return {array} If path was found, function will return path
   *                 as an array of objects with cell coordinates,
   *                 including the start and end points.
   *                 Example: [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 },
   *                            { x: 0, y: 4 }, { x: 1, y: 4 }, { x: 2, y: 4 }, { x: 3, y: 4 } ]
   *                 Returns null if there is no path.
   */

  restorePath(finishX, finishY) {
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
