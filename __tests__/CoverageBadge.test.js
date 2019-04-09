const nock = require('nock');
const { existsSync, lstatSync } = require('fs');
const TmpDir = require('./utils/TmpDir');
const coverageBadge = require('./utils/coverageBadge');

const tmpDir = new TmpDir('./tmp');

describe('Coverage Badge', () => {
  beforeEach(() => {
    tmpDir.create();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    tmpDir.remove();
  });

  it('creates the badge successfully', () => {
    expect.assertions(2);
    nock('https://img.shields.io/badge')
      .get('/Coverage-69.14%25-red.svg?style=flat')
      .reply(200, 'test content');

    return coverageBadge().make().then(() => {
      const path = './tmp/badges/coverage.svg';
      expect(existsSync(path)).toBe(true);
      expect(lstatSync(path).size).toBeGreaterThan(0);
    });
  });

  it('saves the badge to existing directory', () => {
    new TmpDir('./tmp/badges').create();
    expect.assertions(2);
    nock('https://img.shields.io/badge')
      .get('/Coverage-69.14%25-red.svg?style=flat')
      .reply(200, 'test content');

    return coverageBadge().make().then(() => {
      const path = './tmp/badges/coverage.svg';
      expect(existsSync(path)).toBe(true);
      expect(lstatSync(path).size).toBeGreaterThan(0);
    });
  });
});
