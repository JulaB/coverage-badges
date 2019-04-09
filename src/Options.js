class Options {
  constructor({
    label = 'Coverage',
    source,
    attribute,
    outputDir = './badges',
  } = {}) {
    this.label = label;
    this.source = source;
    this.attribute = attribute;
    this.outputDir = outputDir;

    this.validate();
  }

  validate() {
    ['label', 'source', 'attribute', 'outputDir'].forEach((key) => {
      if (!this[key]) {
        this.constructor.missingArgument(key);
      }
    });
  }

  static missingArgument(key) {
    throw new Error(`Missing required config attribute '${key}'`);
  }
}

module.exports = Options;
