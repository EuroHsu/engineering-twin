const fs = require("fs");
const path = require("path");
const { loadContext } = require("./loader");
const { selectContextFiles } = require("./selector");
const { retrieveDecisions } = require("./decisionRetriever");

function loadSelectedFiles(dataPath, selectedFiles) {
  return selectedFiles
    .map((file) => ({
      file,
      content: fs.readFileSync(path.join(dataPath, file), "utf8"),
    }))
    .filter((entry) => entry.content.trim().length > 0);
}

function buildContext(dataPath, task = {}) {
  const context = loadContext(dataPath);
  const selectedFiles = selectContextFiles(task.type);

  context.selectedFiles = selectedFiles;
  context.principles = loadSelectedFiles(dataPath, selectedFiles);

  if (task.query) {
    context.decisions = retrieveDecisions(dataPath, task.query);
  }

  return context;
}

module.exports = {
  buildContext,
};
