import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputPath = path.join(
  __dirname,
  "../data/output.txt"
);

export function createWriter() {
  return fs.createWriteStream(outputPath, {
    encoding: "utf-8"
  });
}