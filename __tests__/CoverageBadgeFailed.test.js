const { existsSync } = require('fs');
const TmpDir = require('./utils/TmpDir');
const coverageBadge = require('./utils/coverageBadge');


const tmpDirPath = './tmp-failed';
const tmpDir = new TmpDir(tmpDirPath);

describe('Coverage Badge Failed', () => {
  beforeEach(() => {
    tmpDir.create();
    console.log = jest.fn();
    console.error = jest.fn();
  });

  afterEach(() => {
    tmpDir.remove();
  });

  it('fails to create badge when a coverage report does not exist', () => {
    const options = {
      label: 'not_found',
      source: 'not-found.json',
    };

    expect.assertions(2);
    return coverageBadge(options, tmpDirPath).make().catch((err) => {
      expect(err.code).toEqual('ENOENT');
      expect(existsSync('./tmp-failed/badges/not_found.svg')).toBe(false);
    });
  });

  it('fails to create badge when a coverage report is not valid JSON', () => {
    const options = {
      label: 'invalid_json',
      source: 'invalid_json_report.txt',
    };

    expect.assertions(2);
    return coverageBadge(options, tmpDirPath).make().catch((err) => {
      expect(err.message).toMatch(/Unexpected token/);
      expect(existsSync('./tmp-failed/badges/invalid_json.svg')).toBe(false);
    });
  });

  it('fails to create badge when coverage value is not a valid number', () => {
    const options = {
      label: 'invalid_number',
      source: 'coverage_report.json',
      attribute: 'total.statements',
    };

    expect.assertions(2);
    return coverageBadge(options, tmpDirPath).make().catch((err) => {
      expect(err.message).toMatch(/Invalid coverage report/);
      expect(existsSync('./tmp-failed/badges/invalid_number.svg')).toBe(false);
    });
  });

  it('fails to create badge when coverage value is not found', () => {
    const options = {
      label: 'not_found_coverage',
      source: 'coverage_report.json',
      attribute: 'not_found_coverage',
    };

    expect.assertions(2);
    return coverageBadge(options, tmpDirPath).make().catch((err) => {
      console.log(err.message);
      expect(err.message).toMatch(/Invalid coverage report/);
      expect(existsSync('./tmp-failed/badges/not_found_coverage.svg')).toBe(false);
    });
  });
});
