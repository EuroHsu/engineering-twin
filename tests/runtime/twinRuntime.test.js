const fs = require("fs");
const os = require("os");
const path = require("path");
const { runTwinRuntime } = require("../../src/runtime");

function createTwinFixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "twin-runtime-"));

  fs.mkdirSync(path.join(root, "identity"));
  fs.mkdirSync(path.join(root, "principles"));
  fs.mkdirSync(path.join(root, "decisions"));
  fs.mkdirSync(path.join(root, "projects"));

  fs.writeFileSync(
    path.join(root, "twin.yaml"),
    "version: 0.2\nname: Test Engineering Twin\n"
  );

  fs.writeFileSync(
    path.join(root, "identity", "profile.md"),
    "# Profile\n\nBackend Engineer\n"
  );

  fs.writeFileSync(
    path.join(root, "principles", "architecture.md"),
    "# Architecture Principles\n\nPrefer explicit architecture boundaries.\n"
  );

  fs.writeFileSync(
    path.join(root, "decisions", "0001-architecture.md"),
    "# Decision 0001\n\nArchitecture: prefer explicit boundaries.\n"
  );

  return root;
}

describe("runTwinRuntime", () => {
  test("discovers, validates, loads, and returns context", () => {
    const root = createTwinFixture();

    const result = runTwinRuntime({
      configuredPath: root,
      task: {
        type: "architecture",
        query: "architecture boundaries",
      },
    });

    expect(result.ok).toBe(true);
    expect(result.stage).toBe("completed");
    expect(result.schemaVersion).toBe("0.2");
    expect(result.source).toBe("configured");
    expect(result.context.identity).toContain("Backend Engineer");
    expect(result.context.principles).toEqual([
      {
        file: "principles/architecture.md",
        content: "# Architecture Principles\n\nPrefer explicit architecture boundaries.\n",
      },
    ]);
    expect(result.context.decisions[0].file).toBe("0001-architecture.md");
  });

  test("returns a discovery failure when Twin Data is not found", () => {
    const result = runTwinRuntime({
      configuredPath: path.join(os.tmpdir(), "missing-engineering-twin"),
    });

    expect(result).toEqual({
      ok: false,
      stage: "discovery",
      code: "TWIN_DATA_NOT_FOUND",
    });
  });

  test("returns validation failure for unsupported schema", () => {
    const root = createTwinFixture();
    fs.writeFileSync(
      path.join(root, "twin.yaml"),
      "version: 9.9\nname: Test Engineering Twin\n"
    );

    const result = runTwinRuntime({
      configuredPath: root,
    });

    expect(result.ok).toBe(false);
    expect(result.stage).toBe("validation");
    expect(result.code).toBe("INVALID_TWIN_DATA");
    expect(result.errors).toContain("Unsupported schema version: 9.9");
  });
});
