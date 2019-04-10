const { readFile } = require('fs');
const CoverageBadge = require('./CoverageBadge');
const Options = require('./Options');
const Color = require('./Color');

const loadConfig = path => (
  new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err);
      }
      try {
        let obj = JSON.parse(data);
        if (!Array.isArray(obj)) {
          obj = [obj];
        }
        resolve(obj);
      } catch (exp) {
        reject(exp);
      }
    });
  })
);

const makeBadges = configPath => (
  loadConfig(configPath)
    .then(configs => (
      Promise.all(
        configs.map(config => new CoverageBadge(new Options(config)).make()),
      )
    ))
    .then(() => console.log('Done.'))
    .catch((err) => {
      console.error(Color.red(err));
      return err;
    })
);

module.exports = makeBadges;
