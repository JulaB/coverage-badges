const {
  readFile,
  createWriteStream,
  mkdir,
  unlink,
} = require('fs');
const { get } = require('https');
const Badge = require('./Badge');

class CoverageBadge {
  constructor(options) {
    this.options = options;
  }

  make() {
    return new Promise((resolve, reject) => this.readSourceFile(resolve, reject))
      .then(data => this.fetchCoverageFrom(data))
      .then(total => this.createBadge(total))
      .then(() => this.mkOutputDir())
      .then(() => this.downloadBadge())
      .then(() => this.printMessage())
      .catch(err => Promise.reject(err));
  }

  readSourceFile(resolve, reject) {
    readFile(this.options.source, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  }

  mkOutputDir() {
    return new Promise((resolve, reject) => {
      mkdir(this.options.outputDir, { recursive: true }, (err) => {
        if (err && err.code !== 'EEXIST') {
          reject(err);
        }
        resolve();
      });
    });
  }

  downloadBadge() {
    return new Promise((resolve, reject) => {
      const destination = this.badge.filePath;
      const file = createWriteStream(destination);
      get(this.badge.url, (res) => {
        if (res.statusCode !== 200) {
          this.constructor.unlinkFile(destination, reject);
          reject(new Error('Cannot download the coverage badge.'));
        }

        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            resolve();
          });
        });
      }).on('error', (err) => {
        this.constructor.unlinkFile(destination, reject);
        reject(err);
      });
    });
  }

  fetchCoverageFrom(data) {
    return new Promise((resolve, reject) => {
      try {
        const value = this.getAttribute(JSON.parse(data));
        const total = parseFloat(value);
        if (Number.isNaN(total)) {
          reject(new Error('Invalid coverage report.'));
        }
        resolve(total);
      } catch (err) {
        reject(err);
      }
    });
  }

  printMessage() {
    const messages = [
      `${this.badge.label} badge was created.`,
      `You can add '![${this.badge.label}](${this.badge.filePath})' to README.md`,
    ];
    console.log(messages.join('\n'));
  }

  createBadge(total) {
    this.badge = new Badge(total, this.options);
  }

  getAttribute(obj) {
    const paths = this.options.attribute.split('.');
    return paths.reduce((value, path) => (value && value[path]), obj);
  }

  static unlinkFile(path, reject) {
    unlink(path, (err) => {
      if (err) {
        reject(err);
      }
    });
  }
}

module.exports = CoverageBadge;
