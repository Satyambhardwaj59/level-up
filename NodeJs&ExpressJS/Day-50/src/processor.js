import { Transform } from "stream";

export function createProcessor(stats) {
  let remainingData = "";

  return new Transform({
    transform(chunk, encoding, callback) {
      const data = chunk.toString();

      // Count chunk
      stats.chunks++;

      // Count characters
      stats.characters += data.length;

      // Combine previous incomplete line
      // with the current chunk.
      const combined =
        remainingData + data;

      const lines = combined.split("\n");

      // Keep the last incomplete line
      remainingData =
        lines.pop() || "";

      // Count complete lines
      stats.lines += lines.length;

      // Count words
      for (const line of lines) {
        const words = line
          .trim()
          .split(/\s+/)
          .filter(Boolean);

        stats.words += words.length;
      }

      // Pass processed data to next stream
      callback(null, data.toUpperCase());
    },

    flush(callback) {
      // Process remaining data
      if (remainingData.length > 0) {
        stats.lines++;

        const words = remainingData
          .trim()
          .split(/\s+/)
          .filter(Boolean);

        stats.words += words.length;
      }

      callback();
    }
  });
}