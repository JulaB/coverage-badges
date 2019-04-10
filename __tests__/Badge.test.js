const Badge = require('../src/Badge');

describe('Badge', () => {
  describe('badge color', () => {
    it('returns red color for badge coverage < 80', () => {
      const badge = new Badge(79.99, {});
      expect(badge.color).toEqual('red');
    });

    it('returns yellow color for badge 80 <= coverage < 90', () => {
      let badge = new Badge(89.99, {});
      expect(badge.color).toEqual('yellow');

      badge = new Badge(80, {});
      expect(badge.color).toEqual('yellow');
    });

    it('returns light green color for badge coverage >= 90', () => {
      let badge = new Badge(100, {});
      expect(badge.color).toEqual('green');

      badge = new Badge(90, {});
      expect(badge.color).toEqual('green');
    });
  });

  describe('badge getters', () => {
    let badge;
    const label = 'Coverage-1 with ☀"symbols"♥ *&/ ';
    const filePath = './some-dir/coverage_1_with___symbols_______.svg';

    beforeAll(() => {
      badge = new Badge(99.56, {
        label,
        outputDir: './some-dir',
      });
    });

    it('returns the badge label', () => {
      expect(badge.label).toEqual(label);
    });

    it('returns the badge safe file path', () => {
      expect(badge.filePath).toEqual(filePath);
    });

    it('returns the badge markup', () => {
      const expectedMarkup = `![${label}](${filePath})`;
      expect(badge.markup).toEqual(expectedMarkup);
    });

    it('returns the correct img.shields.io url for badge', () => {
      const expectedParams = `${encodeURIComponent(label)}-99.56%25-green`;
      expect(badge.url).toEqual(`https://img.shields.io/badge/${expectedParams}.svg?style=flat`);
    });
  });
});
