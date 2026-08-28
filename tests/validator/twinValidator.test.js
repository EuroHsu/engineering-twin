const fs = require("fs");
const os = require("os");
const path = require("path");
const { validateTwinData } = require("../../src/validator/twinValidator");

function createTwinFixture({ includeOptionalDirectories = true } = {}) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "twin-"));

  ["identity", "principles"].forEach((dir) =>
    fs.mkdirSync(path.join(root, dir))
  );

  if (includeOptionalDirectories) {
    ["decisions", "projects"].forEach((dir) =>
      fs.mkdirSync(path.join(root, dir))
    );
  }

  fs.writeFileSync(
    path.join(root, "twin.yaml"),
    "version: 0.2\nname: Test Engineering Twin\n"
  );

  return root;
}

describe("validateTwinData", () => {
  test("validates supported structure", () => {
    expect(validateTwinData(createTwinFixture()).valid).toBe(true);
  });

  test("allows optional directories to be absent", () => {
    const result = validateTwinData(
      createTwinFixture({ includeOptionalDirectories: false })
    );

    expect(result.valid).toBe(true);
    expect(result.optionalDirectories).toEqual([]);
  });

  test("rejects unsupported schema version", () => {
    const root = createTwinFixture();
    fs.writeFileSync(
      path.join(root, "twin.yaml"),
      "version: 9.9\nname: Test Engineering Twin\n"
    );

    const result = validateTwinData(root);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Unsupported schema version: 9.9");
  });

  test("detects invalid Twin Data path", () => {
    const result = validateTwinData(path.join(os.tmpdir(), "missing-twin-data"));

    expect(result.valid).toBe(false);
    expect(result.errors).toContain("Twin Data path is not a directory");
  });
});
