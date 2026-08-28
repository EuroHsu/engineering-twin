const { findTwinData } = require("../discovery/twinLocator");
const { validateTwinData } = require("../validator/twinValidator");
const { buildContext } = require("../context/pipeline");
const { buildContextOutput } = require("../context/contextBuilder");

function runTwinRuntime(options = {}) {
  const discoveryResult = findTwinData({
    workspacePath: options.workspacePath,
    configuredPath: options.configuredPath,
    defaultPath: options.defaultPath,
  });

  if (!discoveryResult.found) {
    return {
      ok: false,
      stage: "discovery",
      code: "TWIN_DATA_NOT_FOUND",
    };
  }

  const validationResult = validateTwinData(discoveryResult.path, {
    supportedVersions: options.supportedVersions,
  });

  if (!validationResult.valid) {
    return {
      ok: false,
      stage: "validation",
      code: "INVALID_TWIN_DATA",
      path: discoveryResult.path,
      errors: validationResult.errors,
      metadata: validationResult.metadata || null,
    };
  }

  const context = buildContext(discoveryResult.path, options.task || {});
  const output = buildContextOutput(context);

  return {
    ok: true,
    stage: "completed",
    path: discoveryResult.path,
    source: discoveryResult.source,
    schemaVersion: validationResult.version,
    context: output,
  };
}

module.exports = {
  runTwinRuntime,
};
