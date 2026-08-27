const fs = require("fs");
const os = require("os");
const path = require("path");
const { validateTwinData } = require("../../src/validator/twinValidator");

function createTwinFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "twin-"));

  [
    "identity",
    "principles",
    "decisions",
    "projects",
  ].forEach((dir) => fs.mkdirSync(path.join(root, dir)));

  fs.writeFileSync(path.join(root, "twin.yaml"), "version: 0.1");

  return root;
}

describe("validateTwinData", () => {
  test("validates supported structure", () => {
    expect(validateTwinData(createTwinFixture()).valid).toBe(true);
  });

  test("detects missing files", () => {
    const result = validateTwinData(os.tmpdir());

    expect(result.valid).toBe(false);
  });
});
