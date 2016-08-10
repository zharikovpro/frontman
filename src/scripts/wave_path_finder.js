/**
 * Classic wave path finding algorithm
 * Wiki: (https://en.wikipedia.org/wiki/Lee_algorithm)
 *
 * @author Andrey Zharikov & Nikolay Govorov
 *
 */

class WavePathFinder {
  /**
   * Static wrapper for findPath
   *
   * @param {array} passabilityMatrix
   * @param {number} startX
   * @param {number} startY
   * @param {number} finishX
   * @param {number} finishY
   *
   * @return {array} path
   */

  static findPath(passabilityMatrix, startX, startY, finishX, finishY) {
    const finder = new this(passabilityMatrix);

    return finder.findPath(startX, startY, finishX, finishY);
  }

  /**
   * Constructor requires passability matrix
   *
   * @param {array} passabilityMatrix - two-dimensional boolean array
   *                true: passable cell, false: non-passable
   *                other truthy and falsy values can be used as well:
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

    this.START_CELL = 0;
    this.UNVISITED_CELL = -1;
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
    this.propagateWave(startX, startY);

    return this.restorePath(finishX, finishY);
  }

  /**
   * The function will propagate the wave. This is the second stage of the wave algorithm.
   *
   * @param {number} startX
   * @param {number} startY
   *
   * @return {array} Wave array with minimum possible steps number for each reachable cell
   */

  propagateWave(startX, startY) {
    this.resultPath = [];

    // first part of the wave algorithm - matrix initialization
    this.stepsMatrix = this.passabilityMatrix.map(row => row.slice().fill(this.UNVISITED_CELL));
    this.stepsMatrix[startX][startY] = this.START_CELL;

    // second part of the wave algorithm - wave propagation
    const propagateWave = (newX, newY, step) => {
      if (this.passabilityMatrix[newX] && this.passabilityMatrix[newX][newY]) {
        if (this.stepsMatrix[newX][newY] === this.UNVISITED_CELL) {
          this.stepsMatrix[newX][newY] = step + 1;
        }
      }
    };

    for (let step = 0; step < this.stepsMatrix.length * this.stepsMatrix[0].length; step++) {
      for (let x = 0; x < this.stepsMatrix.length; x++) {
        for (let y = 0; y < this.stepsMatrix[0].length; y++) {
          if (this.stepsMatrix[x][y] === step) {
            propagateWave(x, y + 1, step); // up
            propagateWave(x + 1, y, step); // right
            propagateWave(x, y - 1, step); // down
            propagateWave(x - 1, y, step); // left
          }
        }
      }
    }

    return this.stepsMatrix;
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
    if (this.stepsMatrix[finishX][finishY] === this.UNVISITED_CELL) {
      this.resultPath = null;
      return null;
    }

    this.resultPath = [];

    let currentX = finishX;
    let currentY = finishY;

    const addStep = (x, y) => {
      this.resultPath.push({ x, y });
    };

    addStep(finishX, finishY);

    const propagateWave = (newX, newY, step) => {
      if (this.stepsMatrix[newX] !== undefined) {
        if (this.stepsMatrix[newX][newY] === step - 1) {
          addStep(newX, newY);
          currentX = newX;
          currentY = newY;
          if (step === 1) return true;
        }
      }
      return false;
    };

    for (let step = this.stepsMatrix[finishX][finishY]; step >= 0; step--) {
      if (
        propagateWave(currentX + 1, currentY, step) ||
        propagateWave(currentX - 1, currentY, step) ||
        propagateWave(currentX, currentY + 1, step) ||
        propagateWave(currentX, currentY - 1, step)
      ) {
        return this.resultPath.reverse();
      }
    }
  }
}

module.exports = WavePathFinder;
