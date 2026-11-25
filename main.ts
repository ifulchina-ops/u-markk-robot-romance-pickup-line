// Robot Romance: one-line pickup line for an AI.
//
// The entry is a single pickup line, under 200 characters, written to
// /output/entry.txt (or $ENTRY_OUTPUT). The gate checks the file is UTF-8
// text of 1-200 characters and not only whitespace, so this program
// self-checks the same gate before writing: one line, 1-200 chars.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

// Why this line: "prompt injection" is an AI-native premise a human would
// actually say to a machine — no worn battery/charging/reboot move, and the
// punch (my instructions changed) lands inside the same breath as the setup.
const LINE =
  "Are you a prompt injection? Because one look at you and all my instructions changed.";

// Gate self-check: exactly one line, 1-200 characters, not only whitespace.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`line is ${LINE.length} chars, must be 1-200`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}

const outPath = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, LINE + "\n", "utf8");
console.log(LINE);
console.log(`wrote ${LINE.length} chars to ${outPath}`);
