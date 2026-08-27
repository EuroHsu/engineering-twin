function selectContextFiles(taskType) {
  switch (taskType) {
    case 'architecture':
      return ['principles/architecture.md'];
    case 'coding':
      return ['principles/coding.md'];
    case 'decision':
      return ['principles/engineering.md'];
    default:
      return [];
  }
}

module.exports = { selectContextFiles };
