const { resolve, join } = require('path');
const CoverageBadge = require('../src/CoverageBadge');
const makeBadges = require('../src/index');

jest.mock('../src/CoverageBadge');
const mockDir = resolve('./__tests__/__mocks__');

describe('makeBadges', () => {
  beforeEach(() => {
    console.log = jest.fn();
    console.error = jest.fn();
    CoverageBadge.mockClear();
  });

  describe('success cases', () => {
    it('creates one coverage badge from single config', () => {
      expect.assertions(1);
      return makeBadges(join(mockDir, 'config_single.json')).then(() => {
        expect(CoverageBadge).toHaveBeenCalledTimes(1);
      });
    });

    it('creates two coverage badges from multi-config', () => {
      expect.assertions(1);
      return makeBadges(join(mockDir, 'config_multi.json')).then(() => {
        expect(CoverageBadge).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('failed cases', () => {
    it('fails to create badges when the config file parameter is not passed', () => {
      expect.assertions(1);
      return expect(makeBadges()).resolves
        .toThrow(/The "path" argument must be one of type string/);
    });

    it('fails to create badges when the config file is not found', () => {
      expect.assertions(1);
      return expect(makeBadges('non-existed-file')).resolves
        .toThrow(/ENOENT: no such file or directory/);
    });

    it('fails to create badges when the config file is not JSON', () => {
      expect.assertions(1);
      return expect(makeBadges(join(mockDir, 'invalid_config.txt'))).resolves
        .toThrow(/Unexpected token.+in JSON/);
    });
  });
});
