const fs = require('fs');
const path = require('path');

function loadMarkdown(filePath) {
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, 'utf8');
}

function loadContext(dataPath, options = {}) {
  const context = {
    metadata: null,
    identity: null,
    principles: [],
    decisions: [],
    projects: []
  };

  context.metadata = loadMarkdown(path.join(dataPath, 'twin.yaml'));

  if (options.identity !== false) {
    context.identity = loadMarkdown(path.join(dataPath, 'identity', 'profile.md'));
  }

  return context;
}

module.exports = { loadContext };
