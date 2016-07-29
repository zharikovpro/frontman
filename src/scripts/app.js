'use strict';

/*
	Helpers functions start
*/

var isset = (variables) => typeof variables !== "undefined";

var path = (mainMatrix, startX, startY, finishX, finishY) => {
	/* Initialize start */

	var W = mainMatrix.length, // Количестов сторк в матрице
		H = mainMatrix[0].length, // Количество ячеек в строке
		badCell = -2, // Непроходимая ячейка
		goodCell = -3, // Проходимая ячейка
		startCell = 0, // Начальная ячейка
		finishCell = -1; // Конечная ячейка
		
	var matrix = new Array(W); // Новая матрица в которой будут проходить все изменения

	for (let i = 0; i < W; i++) {
		matrix[i] = new Array(H);

		for (let j = 0; j < matrix[i].length; j++) {
			if (mainMatrix[i][j] === 0) {
				matrix[i][j] = goodCell;
			} else {
				matrix[i][j] = badCell;
			}
		}
	}

	matrix[startX][startY] = startCell;

	/* Initialize end */
	/* Wave propagation start */

	if (matrix[startX][startY] == -2 || matrix[finishX][finishY] == -2) {
		return false;
	}

	var iter = 0,
		iterk = W * H;

	while (iter < iterk) {

		if (matrix[finishX][finishY] !== goodCell) {
			break;
		}

		for (let i = 0; i < W; i++) {
			for (let j = 0; j < H; j++) {
				if (matrix[i][j] === iter) {
					if (isset(matrix[i + 1])) {
						if (matrix[i + 1][j] == goodCell) {
							matrix[i + 1][j] = iter + 1;
						}
					}

					if (isset(matrix[i - 1])) {
						if (matrix[i - 1][j] == goodCell) {
							matrix[i - 1][j] = iter + 1;
						}
					}
			
					if (matrix[i][j + 1] == goodCell) {
						matrix[i][j + 1] = iter + 1;
					}

					if (matrix[i][j - 1] == goodCell) {
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

	var d = matrix[finishX][finishY],
		resultPath = [],
		activeX = finishX,
		activeY = finishY;

	while (true) {
		
		if (d == 0) {
			break;
		}

		if (isset( matrix[activeX + 1] )) {
			if (matrix[activeX + 1][activeY] === d - 1) {
				resultPath.push({
					x: activeX + 1,
					y: activeY
				});
				activeX++;
			}
		}
		if (isset( matrix[activeX - 1] )) {
			if (matrix[activeX - 1][activeY] === d - 1) {
				resultPath.push({
					x: activeX - 1,
					y: activeY
				});
				activeX = activeX - 1;
			}
		}
		if (matrix[activeX][activeY + 1] === d - 1) {
			resultPath.push({
				x: activeX,
				y: activeY + 1
			});
			activeY = activeY + 1;
		}
		if (matrix[activeX][activeY - 1] === d - 1) {
			resultPath.push({
				x: activeX,
				y: activeY - 1
			});
			activeY = activeY - 1;
		}

		d--;
	}

	resultPath = resultPath.reverse();

	resultPath.pop({
		x: startX,
		y: startY
	});

	resultPath.push({
		x: finishX,
		y: finishY
	});

	return resultPath.reverse();
	
	/* Восстановление пути finish*/
}

var getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

var randomEmptyCell = (matrix) => {

	var emptyCells = [];


	// Выбрали всё пустые ячейки
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			if (matrix[i][j] === 0) {
				emptyCells.push({x: i, y: j});
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
	}

};

/*
	Helpers functions end
*/

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