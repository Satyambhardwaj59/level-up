import {
  readJsonFile,
  writeJsonFile
} from "../utils/fileHelper.js";


// Generate ID
function generateId(notes) {
  if (notes.length === 0) {
    return 1;
  }

  return Math.max(
    ...notes.map((note) => note.id)
  ) + 1;
}


// Add Note
export async function addNote(
  title,
  content
) {
  const notes = await readJsonFile();

  const newNote = {
    id: generateId(notes),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  notes.push(newNote);

  await writeJsonFile(notes);

  return newNote;
}


// List Notes
export async function getAllNotes() {
  return await readJsonFile();
}


// Read Note
export async function getNoteById(id) {
  const notes = await readJsonFile();

  return notes.find(
    (note) => note.id === Number(id)
  );
}


// Update Note
export async function updateNote(
  id,
  title,
  content
) {
  const notes = await readJsonFile();

  const index = notes.findIndex(
    (note) => note.id === Number(id)
  );

  if (index === -1) {
    return null;
  }

  notes[index] = {
    ...notes[index],
    title,
    content,
    updatedAt: new Date().toISOString()
  };

  await writeJsonFile(notes);

  return notes[index];
}


// Delete Note
export async function deleteNote(id) {
  const notes = await readJsonFile();

  const noteIndex = notes.findIndex(
    (note) => note.id === Number(id)
  );

  if (noteIndex === -1) {
    return false;
  }

  notes.splice(noteIndex, 1);

  await writeJsonFile(notes);

  return true;
}


// Search Notes
export async function searchNotes(query) {
  const notes = await readJsonFile();

  const searchTerm =
    query.toLowerCase();

  return notes.filter(
    (note) =>
      note.title
        .toLowerCase()
        .includes(searchTerm) ||
      note.content
        .toLowerCase()
        .includes(searchTerm)
  );
}