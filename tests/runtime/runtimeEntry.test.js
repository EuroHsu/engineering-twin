const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

function createTwinFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "engineering-twin-"));

  fs.mkdirSync(path.join(root, "identity"));
  fs.mkdirSync(path.join(root, "principles"));
  fs.mkdirSync(path.join(root, "decisions"));
  fs.mkdirSync(path.join(root, "projects"));

  fs.writeFileSync(
    path.join(root, "twin.yaml"),
    "version: 0.2\nname: Test Twin\n"
  );

  fs.writeFileSync(
    path.join(root, "identity", "profile.md"),
    "# Profile\n\n## Role\n\nBackend Engineer\n"
  );

  fs.writeFileSync(
    path.join(root, "principles", "architecture.md"),
    "# Architecture Principles\n\nPrefer explicit boundaries.\n"
  );

  return root;
}

test("runs the runtime and returns structured context", () => {
  const twinPath = createTwinFixture();
  const scriptPath = path.join(__dirname, "../../skill/runtime.js");

  const output = execFileSync(
    process.execPath,
    [
      scriptPath,
      JSON.stringify({
        configuredPath: twinPath,
        supportedVersions: ["0.2"],
        task: { type: "architecture", query: "architecture" },
      }),
    ],
    { encoding: "utf8" }
  );

  const result = JSON.parse(output);

  expect(result.ok).toBe(true);
  expect(result.stage).toBe("completed");
  expect(result.schemaVersion).toBe("0.2");
  expect(result.context.identity).toContain("Backend Engineer");
  expect(result.context.principles).toHaveLength(1);
});

test("returns a structured error when Twin Data is not found", () => {
  const scriptPath = path.join(__dirname, "../../skill/runtime.js");

  const output = execFileSync(
    process.execPath,
    [scriptPath, JSON.stringify({ configuredPath: "/path/that/does/not/exist" })],
    { encoding: "utf8" }
  );

  const result = JSON.parse(output);

  expect(result.ok).toBe(false);
  expect(result.stage).toBe("discovery");
  expect(result.code).toBe("TWIN_DATA_NOT_FOUND");
});
