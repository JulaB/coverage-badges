class Color {
  static green(content) {
    return `\u001b[32m${content}\u001b[39m`;
  }

  static red(content) {
    return `\u001b[31m${content}\u001b[39m`;
  }
}

module.exports = Color;
