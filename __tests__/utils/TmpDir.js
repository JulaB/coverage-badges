const {
  mkdirSync,
  rmdirSync,
  existsSync,
  unlinkSync,
  lstatSync,
  readdirSync,
} = require('fs');
const { join } = require('path');

class TmpDir {
  constructor(dirName = './tmp') {
    this.dirName = dirName;
  }

  create() {
    if (!existsSync(this.dirName)) {
      mkdirSync(this.dirName);
    }
  }

  remove() {
    this.constructor.clear(this.dirName);
  }

  static clear(dirName) {
    if (!existsSync(dirName)) {
      return;
    }
    readdirSync(dirName).forEach((file) => {
      const path = join(dirName, file);
      if (lstatSync(path).isDirectory()) {
        this.clear(path);
      } else {
        unlinkSync(path);
      }
    });
    rmdirSync(dirName);
  }
}

module.exports = TmpDir;
