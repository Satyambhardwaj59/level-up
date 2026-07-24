
// Select Elements


const noteInput = document.querySelector("#noteInput");
const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");
const noteList = document.querySelector("#noteList");
const error = document.querySelector("#error");


// Load Notes


let notes = [];

function loadNotes() {

    try {

        const storedNotes = localStorage.getItem("notes");

        if (storedNotes === null) {
            notes = [];
        } else {
            notes = JSON.parse(storedNotes);

            if (!Array.isArray(notes)) {
                throw new Error("Invalid notes data.");
            }
        }

    } catch (err) {

        notes = [];

        error.textContent =
            "Error loading notes. Invalid data found.";

        console.error(err);

    }

}

loadNotes();


// Save Notes


function saveNotes() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}


// Display Notes


function displayNotes() {

    noteList.innerHTML = "";

    notes.forEach((note, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${note}</span>
            <button class="delete" data-index="${index}">
                Delete
            </button>
        `;

        noteList.appendChild(li);

    });

}

displayNotes();


// Add Note


addBtn.addEventListener("click", () => {

    const note = noteInput.value.trim();

    if (note === "") {

        error.textContent = "Please enter a note.";

        return;

    }

    error.textContent = "";

    notes.push(note);

    saveNotes();

    displayNotes();

    noteInput.value = "";

});


// Delete Note


noteList.addEventListener("click", (event) => {

    if (
        event.target.classList.contains("delete")
    ) {

        const index =
            event.target.dataset.index;

        notes.splice(index, 1);

        saveNotes();

        displayNotes();

    }

});


// Clear All Notes


clearBtn.addEventListener("click", () => {

    notes = [];

    localStorage.removeItem("notes");

    displayNotes();

});