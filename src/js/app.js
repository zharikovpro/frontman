require('../css/app.css');

const Board = require('./board.js');

if (NODE_ENV === 'development') {
  module.exports = { Board };
}
