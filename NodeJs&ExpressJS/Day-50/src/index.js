import { createReader } from "./reader.js";
import { createProcessor } from "./processor.js";
import { createWriter } from "./writer.js";


const stats = {
  chunks: 0,
  lines: 0,
  words: 0,
  characters: 0
};


const reader = createReader();

const processor =
  createProcessor(stats);

const writer = createWriter();


// Handle errors

reader.on("error", (error) => {
  console.error(
    "❌ Reader Error:",
    error.message
  );
});

processor.on("error", (error) => {
  console.error(
    "❌ Processor Error:",
    error.message
  );
});

writer.on("error", (error) => {
  console.error(
    "❌ Writer Error:",
    error.message
  );
});


// Start processing

console.log(
  "\n🚀 Starting large file processing...\n"
);


reader
  .pipe(processor)
  .pipe(writer);


// Processing completed

writer.on("finish", () => {
  console.log(
    "\n✅ File processing completed!\n"
  );

  console.log(
    "=============================="
  );

  console.log(
    "📊 Processing Statistics"
  );

  console.log(
    "=============================="
  );

  console.log(
    `📦 Total Chunks: ${stats.chunks}`
  );

  console.log(
    `📄 Total Lines: ${stats.lines}`
  );

  console.log(
    `📝 Total Words: ${stats.words}`
  );

  console.log(
    `🔤 Total Characters: ${stats.characters}`
  );

  console.log(
    "==============================\n"
  );

  console.log(
    "📁 Output: data/output.txt\n"
  );
});