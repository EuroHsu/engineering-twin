const { findTwinData } = require("./discovery/twinLocator");
const { validateTwinData } = require("./validator/twinValidator");

module.exports = {
  findTwinData,
  validateTwinData,
};
