const Color = require('../src/Color');

describe('Color', () => {
  it('wraps the content in green color', () => {
    expect(Color.green('text')).toEqual('\u001b[32mtext\u001b[39m');
  });

  it('wraps the content in red color', () => {
    expect(Color.red('text')).toEqual('\u001b[31mtext\u001b[39m');
  });
});
