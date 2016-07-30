const summ = (x, y) => x + y;
const path = require('../src/scripts/path.js');

var assert = require('chai').assert;

describe('Path', function() {
  it('don`t path', () => {
    assert.equal(path([
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0]
    ], 0, 0, 2, 2), false);
  });
});
