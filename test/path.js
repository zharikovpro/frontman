'use strict';

const assert = require('chai').assert;
const path = require('../src/scripts/path.js');

describe('Path', function() {
  it('no path', () => {
    assert.equal(path([
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0]
    ], 0, 0, 3, 3), null);
  });
  it('there is one path', () => {
    assert.deepEqual(path([
      [0, 0, 0, 0, 0],
      [1, 1, 1, 1, 0],
      [0, 0, 0, 1, 0],
      [0, 0, 0, 1, 0]
    ], 0, 0, 0, 1), [
      {x: 0, y: 0},
      {x: 0, y: 1}
    ]);
  });
});
