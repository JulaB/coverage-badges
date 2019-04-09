const { readFile } = require('fs');
const CoverageBadge = require('./CoverageBadge');
const Options = require('./Options');

const loadConfig = path => (
  new Promise((resolve, reject) => {
    readFile(path, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }
      try {
        let obj = JSON.parse(data);
        if (!Array.isArray(obj)) {
          obj = [obj];
        }
        return resolve(obj);
      } catch (exp) {
        return reject(exp);
      }
    });
  })
);

loadConfig('.coveragebadgesrc')
  .then(configs => (
    Promise.all(
      configs.map(config => new CoverageBadge(new Options(config)).make()),
    )
  ))
  .then(() => console.log('Done.'))
  .catch(err => console.error(err));
