const nock = require('nock');
const { existsSync } = require('fs');

const TmpDir = require('./utils/TmpDir');
const coverageBadge = require('./utils/coverageBadge');

const tmpDirPath = './tmp-download';
const tmpDir = new TmpDir(tmpDirPath);

describe('Coverage Badge Failed Download', () => {
  beforeEach(() => {
    tmpDir.create();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    tmpDir.remove();
  });

  it('fails to create badge when download process has errors', () => {
    const options = {
      label: 'download_error',
    };

    nock('https://img.shields.io/badge')
      .get('/download_error-69.14%25-red.svg?style=flat')
      .reply(500);

    expect.assertions(2);
    return coverageBadge(options, tmpDirPath).make().catch((err) => {
      expect(err.message).toMatch(/Cannot download/);
      expect(existsSync('./tmp-download/badges/download_error.svg')).toBe(false);
    });
  });
});
