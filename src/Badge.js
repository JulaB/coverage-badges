class Badge {
  constructor(coverage, options) {
    this.coverage = coverage;
    this.options = options;
  }

  get color() {
    if (this.coverage < 80) {
      return 'red';
    }
    if (this.coverage < 90) {
      return 'yellow';
    }
    return 'green';
  }

  get label() {
    return this.options.label;
  }

  get markup() {
    return `![${this.label}](${this.filePath})`;
  }

  get filePath() {
    const fileSafeName = this.options.label.toLowerCase().replace(/\W/g, '_');
    return `${this.options.outputDir}/${fileSafeName}.svg`;
  }

  get url() {
    const params = `${this.label}-${this.coverage}%-${this.color}`;
    return `https://img.shields.io/badge/${encodeURIComponent(params)}.svg?style=flat`;
  }
}

module.exports = Badge;
