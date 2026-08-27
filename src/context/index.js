const { loadContext } = require('./loader');
const { selectContextFiles } = require('./selector');
const { retrieveDecisions } = require('./decisionRetriever');
const { buildContext } = require('./pipeline');
const { buildContextOutput } = require('./contextBuilder');

module.exports = {
  loadContext,
  selectContextFiles,
  retrieveDecisions,
  buildContext,
  buildContextOutput
};
