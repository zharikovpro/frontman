require('../styles/app.styl');

const Board = require('./board.js');

const b = new Board();

b.createBall([0, 0]);
b.createBall([0, 1]);
b.createBall([0, 2]);
b.createBall([0, 3]);
b.createBall([0, 4]);

b.createBall([2, 0]);
b.createBall([3, 0]);
b.createBall([4, 0]);
b.createBall([5, 0]);
b.createBall([6, 0]);
b.createBall([7, 0]);

b.render();

b.deleteBalls();

b.render();

console.log(b.score);

if (NODE_ENV === 'development') {
  module.exports = { Board };
}
