const fs = require("fs");
const path = require("path");

const REQUIRED_DIRECTORIES = ["identity", "principles"];
const OPTIONAL_DIRECTORIES = ["decisions", "projects"];
const DEFAULT_SUPPORTED_VERSIONS = ["0.2"];

function isDirectory(targetPath) {
  try {
    return fs.statSync(targetPath).isDirectory();
  } catch {
    return false;
  }
}

function readTwinMetadata(twinPath) {
  const metadataPath = path.join(twinPath, "twin.yaml");

  if (!fs.existsSync(metadataPath)) {
    return {
      metadata: null,
      errors: ["Missing twin.yaml"],
    };
  }

  const content = fs.readFileSync(metadataPath, "utf8");
  const versionMatch = content.match(/^version:\s*(\S+)\s*$/m);
  const nameMatch = content.match(/^name:\s*(.+?)\s*$/m);

  const errors = [];

  if (!versionMatch) errors.push("Missing version in twin.yaml");
  if (!nameMatch) errors.push("Missing name in twin.yaml");

  return {
    metadata: {
      version: versionMatch ? versionMatch[1] : null,
      name: nameMatch ? nameMatch[1].trim() : null,
    },
    errors,
  };
}

function validateTwinData(twinPath, options = {}) {
  if (!twinPath || typeof twinPath !== "string") {
    return {
      valid: false,
      errors: ["Twin Data path is required"],
    };
  }

  if (!isDirectory(twinPath)) {
    return {
      valid: false,
      errors: ["Twin Data path is not a directory"],
    };
  }

  const errors = [];
  const supportedVersions = options.supportedVersions || DEFAULT_SUPPORTED_VERSIONS;
  const metadataResult = readTwinMetadata(twinPath);

  errors.push(...metadataResult.errors);

  for (const directory of REQUIRED_DIRECTORIES) {
    if (!isDirectory(path.join(twinPath, directory))) {
      errors.push(`Missing ${directory} directory`);
    }
  }

  if (metadataResult.metadata?.version && !supportedVersions.includes(metadataResult.metadata.version)) {
    errors.push(`Unsupported schema version: ${metadataResult.metadata.version}`);
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
      metadata: metadataResult.metadata,
    };
  }

  return {
    valid: true,
    version: metadataResult.metadata.version,
    metadata: metadataResult.metadata,
    optionalDirectories: OPTIONAL_DIRECTORIES.filter((directory) =>
      isDirectory(path.join(twinPath, directory))
    ),
  };
}

module.exports = {
  validateTwinData,
};
