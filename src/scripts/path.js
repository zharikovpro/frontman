const isset = (variables) => typeof variables !== 'undefined';

module.exports = (sourceMatrix, startX, startY, finishX, finishY) => {
  /* Initialize start */

  const MATRIX_WIDTH = sourceMatrix.length;
  const MATRIX_HEIGHT = sourceMatrix[0].length;
  const badCell = -2;
  const goodCell = -3;
  const START_CELL = 0;

  const matrix = new Array(MATRIX_WIDTH); // Новая матрица в которой будут проходить все изменения

  for (let i = 0; i < MATRIX_WIDTH; i++) {
    matrix[i] = new Array(MATRIX_HEIGHT);

    for (let j = 0; j < matrix[i].length; j++) {
      if (sourceMatrix[i][j] === 0) {
        matrix[i][j] = goodCell;
      } else {
        matrix[i][j] = badCell;
      }
    }
  }

  matrix[startX][startY] = START_CELL;

  /* Initialize end */
  /* Wave propagation start */

  if (matrix[startX][startY] === badCell || matrix[finishX][finishY] === badCell) {
    return false;
  }

  let iter = 0;
  const iterLimit = MATRIX_WIDTH * MATRIX_HEIGHT;

  while (iter < iterLimit && matrix[finishX][finishY] !== goodCell) {
    for (let i = 0; i < MATRIX_WIDTH; i++) {
      for (let j = 0; j < MATRIX_HEIGHT; j++) {
        if (matrix[i][j] === iter) {
          if (isset(matrix[i + 1])) {
            if (matrix[i + 1][j] === goodCell) {
              matrix[i + 1][j] = iter + 1;
            }
          }

          if (isset(matrix[i - 1])) {
            if (matrix[i - 1][j] === goodCell) {
              matrix[i - 1][j] = iter + 1;
            }
          }

          if (matrix[i][j + 1] === goodCell) {
            matrix[i][j + 1] = iter + 1;
          }

          if (matrix[i][j - 1] === goodCell) {
            matrix[i][j - 1] = iter + 1;
          }
        }
      }
    }

    iter++;
  }

  /* Wave propagation end */
  /* Восстановление пути start*/

  if (matrix[finishX][finishY] === goodCell) {
    return false;
  }

  let d = matrix[finishX][finishY];
  let resultPath = [];
  let activeX = finishX;
  let activeY = finishY;

  while (d === 0) {
    if (isset(matrix[activeX + 1])) {
      if (matrix[activeX + 1][activeY] === d - 1) {
        resultPath.push({
          x: activeX + 1,
          y: activeY,
        });
        activeX++;
      }
    }

    if (isset(matrix[activeX - 1])) {
      if (matrix[activeX - 1][activeY] === d - 1) {
        resultPath.push({
          x: activeX - 1,
          y: activeY,
        });
        activeX = activeX - 1;
      }
    }

    if (matrix[activeX][activeY + 1] === d - 1) {
      resultPath.push({
        x: activeX,
        y: activeY + 1,
      });
      activeY = activeY + 1;
    }

    if (matrix[activeX][activeY - 1] === d - 1) {
      resultPath.push({
        x: activeX,
        y: activeY - 1,
      });
      activeY = activeY - 1;
    }

    d--;
  }

  resultPath = resultPath.reverse();

  resultPath.pop({
    x: startX,
    y: startY,
  });

  resultPath.push({
    x: finishX,
    y: finishY,
  });

  return resultPath;
};
