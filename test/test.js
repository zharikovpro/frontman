import chai from 'chai';

chai.should();

const test = require('../src/js/test.js');

describe('Test', () => {
  describe('test()', () => {
    it('returns true', () => {
      test().should.equal(true);
    });
  });
});
