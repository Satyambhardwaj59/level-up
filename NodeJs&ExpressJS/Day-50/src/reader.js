import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(
  __dirname,
  "../data/input.txt"
);

export function createReader() {
  return fs.createReadStream(inputPath, {
    encoding: "utf-8",
    highWaterMark: 64 * 1024
  });
}