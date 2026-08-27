function buildContextOutput(context = {}) {
  return {
    metadata: context.metadata || null,
    identity: context.identity || null,
    principles: context.principles || [],
    decisions: context.decisions || [],
    projects: context.projects || []
  };
}

module.exports = {
  buildContextOutput
};
