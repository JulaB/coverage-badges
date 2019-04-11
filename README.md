# Coverage Badges &nbsp;&nbsp;&nbsp;&nbsp; [![Codeship Status for JulaB/coverage-badges](https://app.codeship.com/projects/47896600-3c8e-0137-3504-0a50e0cdf939/status?branch=master)](https://app.codeship.com/projects/334699) ![Coverage](./badges/coverage.svg)

Create coverage badges from different coverage reports.

Coverage badge examples:

![Coverage](./badges_examples/coverage.svg) ![Ruby coverage](./badges_examples/ruby_coverage.svg) ![JS coverage](./badges_examples/js_coverage.svg)

## Installation
```
yarn add --dev coverage-badges
```

or

```
npm install --save-dev coverage-badges
```

## Configuration

Create `.coveragebadgesrc` file in JSON format.

### Simple config example (for jest coverage)

#### `.coveragebadgesrc` example
```json
{
  "source": "./coverage/coverage-summary.json",
  "attribute": "total.statements.pct"
}
```

#### `packadge.json` example
```json
"scripts": {
    "premake-badge": "$(yarn bin)/jest --coverage",
    "make-badge": "$(yarn bin)/coverage-badges",
},
"jest": {
  "coverageReporters": [
      "text",
      "lcov",
      "json-summary"
    ],
}
```

Run
```
  yarn make-badge
```

This config creates a coverage badge in a default directory `./badges`.

You can add `![Coverage](./badges/coverage.svg)` to your README.md after the badge creation.


### Advanced config example (using multiple coverage report from jest coverage and simplecov coverage for ruby)

#### `.coveragebadgesrc` example
```json
[
  {
    "label": "JS coverage",
    "source": "./coverage/coverage-summary.json",
    "attribute": "total.statements.pct",
    "outputDir": "./my_badges_dir"
  },
  {
    "label": "Ruby coverage",
    "source": "./coverage/.last_run.json",
    "attribute": "result.covered_percent",
    "outputDir": "./my_badges_dir"
  }
]
```

#### `packadge.json` example
```json
"scripts": {
  "premake-badges": "$(yarn bin)/jest --coverage && COVERAGE=true rails test",
  "make-badges": "$(yarn bin)/coverage-badges",
},
"jest": {
  "coverageReporters": [
    "text",
    "lcov",
    "json-summary"
  ],
}
```

Run
```
yarn make-badges
```

This config creates coverage badges in the custom directory `./my_badges_dir`.

You can add `![JS coverage](./my_badges_dir/js_coverage.svg)` and `![Ruby coverage](./my_badges_dir/ruby_coverage.svg)` to your README.md after badges creation.


## Author
[Julia Bazhukhina](https://github.com/JulaB)

## License
MIT
