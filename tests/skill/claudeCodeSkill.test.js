const fs = require('fs');
const path = require('path');

const SKILL_PATH = path.join(
  __dirname,
  '../../.claude/skills/engineering-twin/SKILL.md'
);

test('Claude Code skill has valid frontmatter and runtime instructions', () => {
  const content = fs.readFileSync(SKILL_PATH, 'utf8');

  expect(content.startsWith('---\n')).toBe(true);
  expect(content).toMatch(/\nname:\s*engineering-twin\n/);
  expect(content).toMatch(/\ndescription:\s*.+\n/);
  expect(content).toMatch(/## Runtime\n/);
  expect(content).toMatch(/node skill\/runtime\.js/);
  expect(content).toMatch(/## Loading Rules\n/);
  expect(content).toMatch(/## Knowledge Safety\n/);
});
