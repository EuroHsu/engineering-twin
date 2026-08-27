const fs = require("fs");
const path = require("path");

function isDirectory(target) {
  try {
    return fs.statSync(target).isDirectory();
  } catch {
    return false;
  }
}

function findTwinData({
  workspacePath,
  configuredPath,
  defaultPath,
}) {
  const candidates = [
    { path: configuredPath, source: "configured" },
    {
      path: workspacePath
        ? path.join(workspacePath, "engineering-twin-data")
        : null,
      source: "workspace",
    },
    { path: defaultPath, source: "default" },
  ];

  for (const candidate of candidates) {
    if (candidate.path && isDirectory(candidate.path)) {
      return {
        found: true,
        path: candidate.path,
        source: candidate.source,
      };
    }
  }

  return {
    found: false,
  };
}

module.exports = {
  findTwinData,
};
