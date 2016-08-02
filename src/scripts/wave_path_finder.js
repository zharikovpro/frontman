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
    } else {
      this.passabilityMatrix = passabilityMatrix.map(row => row.slice());
    }

    this.UNPASSABLE_CELL = -2;
    this.PASSABLE_CELL = -3;

    this.START_CELL = 0;
    this.FINISH_CELL = -1;
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
    if (!isset(this.passabilityMatrix[startX][startY])) {
      throw new Error('Incorrect coordinates of starting cell');
    }

    if (!isset(this.passabilityMatrix[finishX][finishY])) {
      throw new Error('Incorrect coordinates of finishing cell');
    }

    this.resultPath = [];

    this.initializeWaveMatrix(startX, startY, finishX, finishY);

    for (let step = 0; step < this.waveMatrix.length * this.waveMatrix[0].length; step++) {
      for (let x = 0; x < this.waveMatrix.length; x++) {
        for (let y = 0; y < this.waveMatrix[0].length; y++) {
          if (this.waveMatrix[x][y] === step) {
            const propagateWave = (newX, newY) => {
              if (isset(this.waveMatrix[newX]) && isset(this.waveMatrix[newX][newY])) {
                if (this.waveMatrix[newX][newY] === this.PASSABLE_CELL) {
                  this.waveMatrix[newX][newY] = step + 1;
                }

                if (this.waveMatrix[newX][newY] === this.FINISH_CELL) {
                  this.waveMatrix[newX][newY] = step + 1;
                }
              }
            };

            propagateWave(x, y + 1); // up
            propagateWave(x + 1, y); // right
            propagateWave(x, y - 1); // down
            propagateWave(x - 1, y); // left
          }
        }
      }
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
    if (this.waveMatrix[finishX][finishY] === this.FINISH_CELL) {
      this.resultPath = null;
      return null;
    }

    this.resultPath = [];

    let currentX = finishX;
    let currentY = finishY;

    const addStep = (x, y) => {
      this.resultPath.push({ x, y });
    };

    for (let step = this.waveMatrix[finishX][finishY]; step >= 0; step--) {
      if (isset(this.waveMatrix[currentX + 1])) {
        if (this.waveMatrix[currentX + 1][currentY] === step - 1) {
          addStep(currentX + 1, currentY);
          currentX++;
        }
      }

      if (isset(this.waveMatrix[currentX - 1])) {
        if (this.waveMatrix[currentX - 1][currentY] === step - 1) {
          addStep(currentX - 1, currentY);
          currentX = currentX - 1;
        }
      }

      if (this.waveMatrix[currentX][currentY + 1] === step - 1) {
        addStep(currentX, currentY + 1);
        currentY = currentY + 1;
      }

      if (this.waveMatrix[currentX][currentY - 1] === step - 1) {
        addStep(currentX, currentY - 1);
        currentY = currentY - 1;
      }
    }

    this.resultPath = this.resultPath.reverse();

    addStep(finishX, finishY);

    return this.resultPath;
  }

  initializeWaveMatrix(startX, startY, finishX, finishY) {
    this.waveMatrix = this.passabilityMatrix.map(row => row.map(
      cell => (cell ? this.PASSABLE_CELL : this.UNPASSABLE_CELL)
    ));

    this.waveMatrix[startX][startY] = this.START_CELL;
    this.waveMatrix[finishX][finishY] = this.FINISH_CELL;
  }
}

module.exports = WavePathFinder;
