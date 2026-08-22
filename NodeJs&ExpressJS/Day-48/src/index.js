import {
  createInterface
} from "readline/promises";

import {
  stdin as input,
  stdout as output
} from "process";

import {
  addNote,
  getAllNotes,
  getNoteById,
  updateNote,
  deleteNote,
  searchNotes
} from "./services/noteService.js";


const rl = createInterface({
  input,
  output
});


async function addNoteCLI() {
  const title = await rl.question(
    "Enter note title: "
  );

  const content = await rl.question(
    "Enter note content: "
  );

  if (!title.trim() || !content.trim()) {
    console.log(
      "\n❌ Title and content are required.\n"
    );

    return;
  }

  const note = await addNote(
    title.trim(),
    content.trim()
  );

  console.log(
    `\n✅ Note created with ID: ${note.id}\n`
  );
}


async function listNotesCLI() {
  const notes = await getAllNotes();

  if (notes.length === 0) {
    console.log("\n📭 No notes found.\n");
    return;
  }

  console.log("\n📚 Your Notes:\n");

  notes.forEach((note) => {
    console.log(
      `[${note.id}] ${note.title}`
    );
  });

  console.log();
}


async function readNoteCLI() {
  const id = await rl.question(
    "Enter note ID: "
  );

  const note = await getNoteById(id);

  if (!note) {
    console.log("\n❌ Note not found.\n");
    return;
  }

  console.log("\n--------------------");
  console.log(`ID: ${note.id}`);
  console.log(`Title: ${note.title}`);
  console.log(`Content: ${note.content}`);
  console.log(
    `Created: ${note.createdAt}`
  );
  console.log(
    `Updated: ${note.updatedAt}`
  );
  console.log("--------------------\n");
}


async function updateNoteCLI() {
  const id = await rl.question(
    "Enter note ID: "
  );

  const existingNote =
    await getNoteById(id);

  if (!existingNote) {
    console.log("\n❌ Note not found.\n");
    return;
  }

  const title = await rl.question(
    `New title (${existingNote.title}): `
  );

  const content = await rl.question(
    "New content: "
  );

  const updatedNote =
    await updateNote(
      id,
      title.trim() || existingNote.title,
      content.trim() || existingNote.content
    );

  console.log(
    `\n✅ "${updatedNote.title}" updated successfully.\n`
  );
}


async function deleteNoteCLI() {
  const id = await rl.question(
    "Enter note ID: "
  );

  const deleted =
    await deleteNote(id);

  if (!deleted) {
    console.log("\n❌ Note not found.\n");
    return;
  }

  console.log(
    "\n🗑️ Note deleted successfully.\n"
  );
}


async function searchNotesCLI() {
  const query = await rl.question(
    "Search: "
  );

  const results =
    await searchNotes(query);

  if (results.length === 0) {
    console.log(
      "\n🔍 No matching notes found.\n"
    );

    return;
  }

  console.log("\n🔍 Search Results:\n");

  results.forEach((note) => {
    console.log(
      `[${note.id}] ${note.title}`
    );
    console.log(`    ${note.content}`);
  });

  console.log();
}


async function showMenu() {
  console.log(`
=============================
       📝 NOTES MANAGER
=============================

1. Add Note
2. List Notes
3. Read Note
4. Update Note
5. Delete Note
6. Search Notes
7. Exit

=============================
`);

  const choice = await rl.question(
    "Choose an option: "
  );

  return choice.trim();
}


async function main() {
  console.log(
    "\n🚀 Welcome to Notes Manager!\n"
  );

  let running = true;

  while (running) {
    try {
      const choice = await showMenu();

      switch (choice) {
        case "1":
          await addNoteCLI();
          break;

        case "2":
          await listNotesCLI();
          break;

        case "3":
          await readNoteCLI();
          break;

        case "4":
          await updateNoteCLI();
          break;

        case "5":
          await deleteNoteCLI();
          break;

        case "6":
          await searchNotesCLI();
          break;

        case "7":
          running = false;
          console.log(
            "\n👋 Goodbye!\n"
          );
          break;

        default:
          console.log(
            "\n❌ Invalid option. Choose 1-7.\n"
          );
      }
    } catch (error) {
      console.error(
        "\n❌ Something went wrong:",
        error.message,
        "\n"
      );
    }
  }

  rl.close();
}

main();