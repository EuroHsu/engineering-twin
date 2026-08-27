const { selectContextFiles } = require('../../src/context');

test('select architecture context', () => {
  expect(selectContextFiles('architecture')).toContain('principles/architecture.md');
});

test('select coding context', () => {
  expect(selectContextFiles('coding')).toContain('principles/coding.md');
});
