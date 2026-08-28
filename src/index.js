const { findTwinData } = require("./discovery/twinLocator");
const { validateTwinData } = require("./validator/twinValidator");
const { runTwinRuntime } = require("./runtime");

module.exports = {
  findTwinData,
  validateTwinData,
  runTwinRuntime,
};
