const isset = (variables) => typeof variables !== 'undefined';

/**
 * Find the shortest path in the matrix
 *
 * @author Govorov Nikolay
 *
 * @param {array} sourceMatrix The original matrix to be given to the search path
 * @param {number} startX The x coordinate of the start of the path
 * @param {number} startY The y coordinate of the start of the path
 * @param {number} finishX The x coordinate of the finish of the path
 * @param {number} finishY The y coordinate of the finish of the path
 *
 * @return {null} if no path
 * @return {array} if there is path
 * @return {string} if error
 */

module.exports = (sourceMatrix, startX, startY, finishX, finishY) => {
  /* Initialize start */

  const MATRIX_WIDTH = sourceMatrix.length;
  const MATRIX_HEIGHT = sourceMatrix[0].length;
  const PATHLESS_CELL = -2;
  const PASSABLE_CELL = -3;
  const START_CELL = 0;
  const FINISH_CELL = -1;
  const AMOUNT_CELLS = MATRIX_WIDTH * MATRIX_HEIGHT;

  const matrix = sourceMatrix.map((row) => {
    const allRows = row.map(cell => {
      let temp;

      if (cell === 0) {
        temp = PASSABLE_CELL;
      } else {
        temp = PATHLESS_CELL;
      }

      return temp;
    });

    return allRows;
  });

  if (!isset(matrix[startX][startY])) {
    console.error('Incorrect coordinates of starting cell');
    return 'error';
  }

  if (!isset(matrix[finishX][finishY])) {
    console.error('Incorrect coordinates of finishing cell');
    return 'error';
  }

  matrix[startX][startY] = START_CELL;
  matrix[finishX][finishY] = FINISH_CELL;

  /* Initialize end */
  /* Wave propagation start */

  for (let iter = 0; iter < AMOUNT_CELLS; iter++) {
    for (let i = 0; i < MATRIX_WIDTH; i++) {
      for (let j = 0; j < MATRIX_HEIGHT; j++) {
        if (matrix[i][j] === iter) {
          if (isset(matrix[i + 1])) {
            if (matrix[i + 1][j] === PASSABLE_CELL) {
              matrix[i + 1][j] = iter + 1;
            }
            if (matrix[i + 1][j] === FINISH_CELL) {
              matrix[i + 1][j] = iter + 1;
              break;
            }
          }

          if (isset(matrix[i - 1])) {
            if (matrix[i - 1][j] === PASSABLE_CELL) {
              matrix[i - 1][j] = iter + 1;
            }
            if (matrix[i - 1][j] === FINISH_CELL) {
              matrix[i - 1][j] = iter + 1;
              break;
            }
          }

          if (matrix[i][j + 1] === PASSABLE_CELL) {
            matrix[i][j + 1] = iter + 1;
          }
          if (matrix[i][j + 1] === FINISH_CELL) {
            matrix[i][j + 1] = iter + 1;
            break;
          }

          if (matrix[i][j - 1] === PASSABLE_CELL) {
            matrix[i][j - 1] = iter + 1;
          }
          if (matrix[i][j - 1] === FINISH_CELL) {
            matrix[i][j - 1] = iter + 1;
            break;
          }
        }
      }
      if (matrix[finishX][finishY] !== FINISH_CELL) break;
    }
    if (matrix[finishX][finishY] !== FINISH_CELL) break;
  }

  /* Wave propagation end */
  /* Восстановление пути start*/

  if (matrix[finishX][finishY] === FINISH_CELL) {
    return null;
  }

  let resultPath = [];
  let activeX = finishX;
  let activeY = finishY;

  const addStep = (x, y) => {
    resultPath.push({ x, y });
  };

  let step = matrix[finishX][finishY];
  do {
    if (isset(matrix[activeX + 1])) {
      if (matrix[activeX + 1][activeY] === step - 1) {
        addStep(activeX + 1, activeY);
        activeX++;
      }
    }

    if (isset(matrix[activeX - 1])) {
      if (matrix[activeX - 1][activeY] === step - 1) {
        addStep(activeX - 1, activeY);
        activeX = activeX - 1;
      }
    }

    if (matrix[activeX][activeY + 1] === step - 1) {
      addStep(activeX, activeY + 1);
      activeY = activeY + 1;
    }

    if (matrix[activeX][activeY - 1] === step - 1) {
      addStep(activeX, activeY - 1);
      activeY = activeY - 1;
    }
    step--;
  } while (step >= 0);

  resultPath = resultPath.reverse();

  resultPath.push({
    x: finishX,
    y: finishY,
  });

  return resultPath;
};
