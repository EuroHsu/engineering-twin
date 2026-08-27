const fs = require('fs');
const path = require('path');

function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ');
}

function tokenize(value) {
  return normalize(value)
    .split(/\s+/)
    .filter(Boolean);
}

function loadDecisionFiles(dataPath) {
  const decisionsPath = path.join(dataPath, 'decisions');

  if (!fs.existsSync(decisionsPath)) return [];

  return fs.readdirSync(decisionsPath)
    .filter((file) => file.endsWith('.md'))
    .map((file) => ({
      file,
      content: fs.readFileSync(path.join(decisionsPath, file), 'utf8')
    }));
}

function scoreDecision(decision, query) {
  const decisionTokens = tokenize(decision.content);
  const queryTokens = tokenize(query);

  return queryTokens.reduce((score, token) => {
    return score + (decisionTokens.includes(token) ? 1 : 0);
  }, 0);
}

function retrieveDecisions(dataPath, query, limit = 5) {
  return loadDecisionFiles(dataPath)
    .map((decision) => ({
      ...decision,
      score: scoreDecision(decision, query)
    }))
    .filter((decision) => decision.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

module.exports = {
  retrieveDecisions
};
