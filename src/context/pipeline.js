const { loadContext } = require('./loader');
const { selectContextFiles } = require('./selector');
const { retrieveDecisions } = require('./decisionRetriever');

function buildContext(dataPath, task = {}) {
  const context = loadContext(dataPath);

  const selectedFiles = selectContextFiles(task.type);

  context.selectedFiles = selectedFiles;

  if (task.query) {
    context.decisions = retrieveDecisions(dataPath, task.query);
  }

  return context;
}

module.exports = { buildContext };
