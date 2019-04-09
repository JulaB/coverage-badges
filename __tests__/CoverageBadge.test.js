const nock = require('nock');
const { resolve, join } = require('path');
const { existsSync, lstatSync } = require('fs');
const CoverageBadge = require('../src/CoverageBadge');
const TmpDir = require('./utils/TmpDir');

describe('Coverage Badge', () => {
  const tmpDirPath = './tmp';
  const tmpDir = new TmpDir(tmpDirPath);
  const mockDir = resolve('./__tests__/__mocks__');

  beforeEach(() => {
    tmpDir.create();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    tmpDir.remove();
  });

  it('creates the badge successfully', () => {
    const options = {
      label: 'Coverage',
      source: join(mockDir, 'coverage_report.json'),
      attribute: 'total.statements.pct',
      outputDir: `${tmpDirPath}/badges`,
    };
    const coverage = new CoverageBadge(options);


    expect.assertions(2);
    nock('https://img.shields.io/badge')
      .get('/Coverage-69.14%25-red.svg?style=flat')
      .reply(200, 'test content');
    return coverage.make().then(() => {
      expect(existsSync(`${tmpDirPath}/badges/coverage.svg`)).toBe(true);
      expect(lstatSync(`${tmpDirPath}/badges/coverage.svg`).size).toBeGreaterThan(0);
    });
  });
});
