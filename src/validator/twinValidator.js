const fs = require("fs");
const path = require("path");

const REQUIRED_PATHS = [
  "twin.yaml",
  "identity",
  "principles",
  "decisions",
  "projects",
];

function validateTwinData(twinPath) {
  const errors = [];

  for (const requiredPath of REQUIRED_PATHS) {
    const target = path.join(twinPath, requiredPath);

    if (!fs.existsSync(target)) {
      errors.push(`Missing ${requiredPath}`);
    }
  }

  if (errors.length > 0) {
    return {
      valid: false,
      errors,
    };
  }

  return {
    valid: true,
  };
}

module.exports = {
  validateTwinData,
};
