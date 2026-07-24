/*

Build a simple To-Do List where:

1. Add tasks dynamically.
2. Delete tasks using one event listener on the parent <ul>.
3. Highlight a task when clicked.
4. Prevent a button from submitting a form using preventDefault().
5. Demonstrate event bubbling with nested <div> elements.
6. Stop bubbling using stopPropagation().
7. Compare event.target and event.currentTarget in the console.




*/



//! Select Elements

const form = document.querySelector("#taskForm");
const input = document.querySelector("#taskInput");
const taskList = document.querySelector("#taskList");


//! Add Task
form.addEventListener("submit", (event) => {

    // Prevent page refresh
    event.preventDefault();

    const task = input.value.trim();

    if(task === "") return;

    const li = document.createElement("li");

    li.innerHTML = `
        <span>${task}</span>
        <button class="delete">Delete</button>
    `;

    taskList.appendChild(li);

    input.value = "";

});


//! Event Delegation
// One Listener for Entire UL


taskList.addEventListener("click", (event) => {

    console.log("target :", event.target);
    console.log("currentTarget :", event.currentTarget);

    // Delete Task
    if(event.target.classList.contains("delete")){

        event.target.parentElement.remove();

        return;
    }

    // Highlight Task
    if(event.target.tagName === "LI"){

        event.target.classList.toggle("highlight");

    }

    if(event.target.tagName === "SPAN"){

        event.target.parentElement.classList.toggle("highlight");

    }

});


//! Event Bubbling

const outer = document.querySelector("#outer");
const middle = document.querySelector("#middle");
const inner = document.querySelector("#inner");

outer.addEventListener("click", (event)=>{

    console.log("Outer Div");

    console.log("target :",event.target);
    console.log("currentTarget :",event.currentTarget);

});

middle.addEventListener("click",(event)=>{

    console.log("Middle Div");

    console.log("target :",event.target);
    console.log("currentTarget :",event.currentTarget);

});

inner.addEventListener("click",(event)=>{

    console.log("Inner Div");

    console.log("target :",event.target);
    console.log("currentTarget :",event.currentTarget);

    // Stop Bubbling
    event.stopPropagation();

});