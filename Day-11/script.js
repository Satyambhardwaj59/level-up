/*


Build a simple interactive webpage that:

1. Changes text when a button is clicked.
2. Displays mouse coordinates while moving the mouse.
3. Shows the key pressed in an input field.
4. Prevents a form from refreshing the page.
5. Changes the input border color on focus and blur.
6. Logs event.target when any button is clicked.
7. Removes an event listener after it runs once.




*/

// ======================================
// 1. Change Text
// ======================================

const heading = document.querySelector("#heading");
const changeBtn = document.querySelector("#changeBtn");

changeBtn.addEventListener("click", () => {
    heading.textContent = "Text Changed Successfully!";
});

// ======================================
// 2. Mouse Coordinates
// ======================================

const coordinates = document.querySelector("#coordinates");

document.addEventListener("mousemove", (event) => {

    coordinates.textContent =
        `X : ${event.clientX} | Y : ${event.clientY}`;

});

// ======================================
// 3. Show Key Pressed
// ======================================

const keyboardInput = document.querySelector("#keyboardInput");
const keyOutput = document.querySelector("#keyOutput");

keyboardInput.addEventListener("keydown", (event) => {

    keyOutput.textContent =
        `Key Pressed : ${event.key}`;

});

// ======================================
// 4. Prevent Form Refresh
// ======================================

const form = document.querySelector("#myForm");
const message = document.querySelector("#message");

form.addEventListener("submit", (event) => {

    event.preventDefault();

    message.textContent =
        "Form Submitted Successfully!";

});

// ======================================
// 5. Focus and Blur
// ======================================

keyboardInput.addEventListener("focus", () => {

    keyboardInput.style.borderColor = "green";

});

keyboardInput.addEventListener("blur", () => {

    keyboardInput.style.borderColor = "red";

});

// ======================================
// 6. event.target
// ======================================

const buttons = document.querySelectorAll(".btn");

buttons.forEach((button) => {

    button.addEventListener("click", (event) => {

        console.log(event.target);

    });

});

// ======================================
// 7. Remove Event Listener
// ======================================

const onceBtn = document.querySelector("#onceBtn");

function handleClick() {

    alert("This event runs only once!");

    onceBtn.removeEventListener("click", handleClick);

}

onceBtn.addEventListener("click", handleClick);