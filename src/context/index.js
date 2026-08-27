const { loadContext } = require('./loader');
const { selectContextFiles } = require('./selector');
const { retrieveDecisions } = require('./decisionRetriever');

module.exports = {
  loadContext,
  selectContextFiles,
  retrieveDecisions
};
