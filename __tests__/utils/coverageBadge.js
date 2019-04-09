const { resolve, join } = require('path');
const CoverageBadge = require('../../src/CoverageBadge');

const coverageBadge = (options = {}, tmpPath = './tmp') => {
  const mockDir = resolve('./__tests__/__mocks__');
  const defOptions = {
    label: 'Coverage',
    source: 'coverage_report.json',
    attribute: 'total.statements.pct',
    outputDir: `${tmpPath}/badges`,
  };
  const mergedOptions = { ...defOptions, ...options };
  mergedOptions.source = join(mockDir, mergedOptions.source);
  return new CoverageBadge(mergedOptions);
};

module.exports = coverageBadge;
