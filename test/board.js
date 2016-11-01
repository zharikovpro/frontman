import chai from 'chai';
const { assert } = chai;

chai.should();

const Board = require('../src/js/board.js');

const renderMatrix = (drawing) => {
  const matrix = drawing.replace(/ /g, '').split('\n').map(line =>
    line.substr(1, (line.length - 2)
  ).split('|'));

  return matrix.map(row => row.map(
    cell => (
      (cell === '') ? -1 : +cell)
    )
  );
};

describe('Board', () => {
  describe('constructor()', () => {
    it('Incorrect all parameters', () => {
      (() => new Board('a', 'a')).should.throw(Error);
    });

    it('Incorrect first parameter (string)', () => {
      (() => new Board('bla-bla-bla')).should.throw(Error);
    });

    it('Incorrect two parameter (string)', () => {
      (() => new Board(2, 'bla-bla-bla')).should.throw(Error);
    });

    it('Default', () => {
      const b = new Board();

      assert.deepEqual(b.matrix, renderMatrix(`| | | | | | | | | |
                                               | | | | | | | | | |
                                               | | | | | | | | | |
                                               | | | | | | | | | |
                                               | | | | | | | | | |
                                               | | | | | | | | | |
                                               | | | | | | | | | |
                                               | | | | | | | | | |
                                               | | | | | | | | | |`));
    });

    it('Normal', () => {
      const b = new Board(4, 4);

      assert.deepEqual(b.matrix, renderMatrix(`| | | | |
                                               | | | | |
                                               | | | | |
                                               | | | | |`));
    });
  });

  describe('createBall()', () => {
    it('default(random)', () => {
      const b = new Board();

      b.createBall();

      let bells = 0;

      b.matrix.forEach(c => {
        c.forEach(r => {
          if (r !== -1) bells++;
        });
      });

      assert.equal(bells, 1);
    });
  });

  describe('deleteAllCombinationBalls()', () => {
    const tests = [{
      name: 'horizontal line',
      r: 6,
      c: 6,
      score: 5,
      drawingBefore: `|1|1|1|1|1| |
                      | | | | | | |
                      | | |1| | | |
                      | | | | | | |
                      | | | | | | |
                      | | | | | | |`,
      drawingAfter: `| | | | | | |
                     | | | | | | |
                     | | |1| | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |`,
    }, {
      name: 'vertical line',
      r: 9,
      c: 6,
      score: 6,
      drawingBefore: `| | | | | | |
                      | | | | | | |
                      |1| | | | | |
                      |1| | | | | |
                      |1| | | | | |
                      |1| | | | | |
                      |1| | | | | |
                      |1| | | | | |
                      | | | | | | |`,
      drawingAfter: `| | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |`,
    }, {
      name: 'mix line',
      r: 9,
      c: 6,
      score: 11,
      drawingBefore: `|1|1|1|1|1| |
                      | | | | | | |
                      |2| |4| | | |
                      |2| | | | | |
                      |2| | | | | |
                      |2| | | | | |
                      |2| | | | | |
                      |2| | | | | |
                      | | | | | | |`,
      drawingAfter: `| | | | | | |
                     | | | | | | |
                     | | |4| | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |`,
    }, {
      name: 'all line horizontal',
      r: 6,
      c: 6,
      score: 6,
      drawingBefore: `|1|1|1|1|1|1|
                      | | | | | | |
                      | | | | | | |
                      | | | | | | |
                      | | | | | | |
                      | | | | | | |`,
      drawingAfter: `| | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |`,
    }, {
      name: 'all line vertical',
      r: 6,
      c: 6,
      score: 6,
      drawingBefore: `|1| | | | | |
                      |1| | | | | |
                      |1| | | | | |
                      |1| | | | | |
                      |1| | | | | |
                      |1| | | | | |`,
      drawingAfter: `| | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |
                     | | | | | | |`,
    }];

    tests.forEach(test => {
      it(test.name, () => {
        const b = new Board(test.r, test.c);

        b.matrix = renderMatrix(test.drawingBefore);

        b.deleteAllCombinationBalls();

        assert.deepEqual(b.score, test.score);
        assert.deepEqual(b.matrix, renderMatrix(test.drawingAfter));
      });
    });
  });
});
