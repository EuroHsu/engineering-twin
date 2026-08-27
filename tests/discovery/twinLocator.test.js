const fs = require("fs");
const os = require("os");
const path = require("path");
const { findTwinData } = require("../../src/discovery/twinLocator");

describe("findTwinData", () => {
  test("finds configured path", () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), "twin-"));

    const result = findTwinData({
      configuredPath: temp,
    });

    expect(result.found).toBe(true);
    expect(result.source).toBe("configured");
  });

  test("returns not found when unavailable", () => {
    const result = findTwinData({});

    expect(result.found).toBe(false);
  });
});
