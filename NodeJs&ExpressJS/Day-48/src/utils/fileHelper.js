import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const notesFilePath = path.join(
  __dirname,
  "../../data/notes.json"
);

// Read JSON file
export async function readJsonFile() {
  try {
    const data = await fs.readFile(
      notesFilePath,
      "utf-8"
    );

    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeJsonFile([]);
      return [];
    }

    throw error;
  }
}

// Write JSON file
export async function writeJsonFile(data) {
  await fs.writeFile(
    notesFilePath,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
}