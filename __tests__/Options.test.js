const Options = require('../src/Options');

const testOptionsValidation = (config, key) => {
  const error = new Error(`Missing required config attribute '${key}'`);
  expect(() => {
    new Options(config); // eslint-disable-line no-new
  }).toThrow(error);
};

describe('Options', () => {
  it('setups options with default values', () => {
    const options = new Options({
      source: 'some source',
      attribute: 'total.prc',
    });
    expect(options.label).toEqual('Coverage');
    expect(options.outputDir).toEqual('./badges');
  });

  it('throws error when required source parameter is missing', () => {
    testOptionsValidation(undefined, 'source');
  });

  it('throws error when require attribute parameter is missing', () => {
    testOptionsValidation({ source: 'test' }, 'attribute');
  });

  it('throws error when require label parameter is missing', () => {
    const config = { source: 'test', label: '', attribute: 'total' };
    testOptionsValidation(config, 'label');
  });

  it('throws error when require outputDir parameter is missing', () => {
    const config = {
      source: 'test',
      attribute: 'total',
      outputDir: '',
    };
    testOptionsValidation(config, 'outputDir');
  });
});
