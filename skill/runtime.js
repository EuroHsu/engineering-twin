#!/usr/bin/env node

const { runTwinRuntime } = require("../src/runtime/twinRuntime");

function readInput() {
  const input = process.argv[2];

  if (!input) {
    return {};
  }

  return JSON.parse(input);
}

function main() {
  try {
    const result = runTwinRuntime(readInput());
    process.stdout.write(`${JSON.stringify(result)}\n`);
  } catch (error) {
    process.stderr.write(`${error.message}\n`);
    process.exitCode = 1;
  }
}

main();
