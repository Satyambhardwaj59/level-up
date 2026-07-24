/*


-Build a simple webpage that:

1. Selects an element using querySelector().
2. Changes its text when a button is clicked.
3. Adds and removes CSS classes using classList.
4. Creates a new <li> element dynamically.
5. Appends it to a <ul>.
6. Removes an item from the list.
7. Changes the background color of a div using JavaScript.



*/


// ======================================
// querySelector()
// ======================================

const title = document.querySelector(".title");

// ======================================
// Change Text
// ======================================

const changeTextBtn = document.querySelector("#changeTextBtn");

changeTextBtn.addEventListener("click", () => {
    title.textContent = "DOM Manipulation is Easy!";
});

// ======================================
// classList
// ======================================

const toggleClassBtn = document.querySelector("#toggleClassBtn");

toggleClassBtn.addEventListener("click", () => {
    title.classList.toggle("highlight");
});

// ======================================
// Create New <li>
// ======================================

const studentList = document.querySelector("#studentList");

const addItemBtn = document.querySelector("#addItemBtn");

let count = 3;

addItemBtn.addEventListener("click", () => {

    const li = document.createElement("li");

    li.textContent = `Student ${count}`;

    studentList.appendChild(li);

    count++;
});

// ======================================
// Remove Last <li>
// ======================================

const removeItemBtn = document.querySelector("#removeItemBtn");

removeItemBtn.addEventListener("click", () => {

    if(studentList.lastElementChild){
        studentList.removeChild(studentList.lastElementChild);
    }

});

// ======================================
// Change Background Color
// ======================================

const box = document.querySelector("#box");

const changeColorBtn = document.querySelector("#changeColorBtn");

changeColorBtn.addEventListener("click", () => {

    const colors = [
        "tomato",
        "skyblue",
        "orange",
        "lightgreen",
        "purple",
        "gold"
    ];

    const randomColor =
        colors[Math.floor(Math.random() * colors.length)];

    box.style.backgroundColor = randomColor;
});