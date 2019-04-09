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
    return new Promise((resolve, reject) => {
      readFile(this.options.source, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    }).then(data => this.fetchCoverageFrom(data))
      .then(total => this.createBadge(total))
      .then(() => this.mkOutputDir())
      .then(() => this.downloadBadge())
      .then(() => this.printMessage())
      .catch(err => console.error(err));
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
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            resolve();
          });
        });
      }).on('error', (err) => {
        unlink(destination);
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
    console.log(`${this.badge.label} badge was created.
    You can add '![${this.badge.label}](${this.badge.filePath})' to README.md`);
  }

  createBadge(total) {
    this.badge = new Badge(total, this.options);
  }

  getAttribute(obj) {
    const paths = this.options.attribute.split('.');
    return paths.reduce((value, path) => (value && value[path]), obj);
  }
}

module.exports = CoverageBadge;
