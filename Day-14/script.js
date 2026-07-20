/*

Build a small application that:

1. Prints synchronous and asynchronous logs to understand the Event Loop.
2. Uses setTimeout() and setInterval().
3. Creates a custom Promise that resolves after 2 seconds.
4. Consumes the Promise using .then() and .catch().
5. Rewrites the same code using async/await.
6. Fetches data from https://jsonplaceholder.typicode.com/users.
7. Displays user names in the console or on a webpage.
8. Handles API errors using try...catch.




*/


// 1. Synchronous vs Asynchronous (Event Loop)


console.log("1. Program Started");

setTimeout(() => {
    console.log("4. setTimeout Executed");
}, 0);

console.log("2. Synchronous Code");

console.log("3. Program End");



// 2. setTimeout() and setInterval()


setTimeout(() => {
    console.log("Executed after 2 seconds");
}, 2000);

let count = 1;

const intervalId = setInterval(() => {

    console.log(`Interval : ${count}`);

    count++;

    if (count > 5) {
        clearInterval(intervalId);
        console.log("Interval Stopped");
    }

}, 1000);



// 3. Custom Promise


function getMessage() {

    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const success = true;

            if (success) {
                resolve("Promise Resolved Successfully!");
            } else {
                reject("Promise Rejected!");
            }

        }, 2000);

    });

}



// 4. Promise using .then() and .catch()


getMessage()
    .then((message) => {
        console.log(message);
    })
    .catch((error) => {
        console.error(error);
    });



// 5. async / await


async function showMessage() {

    try {

        const result = await getMessage();

        console.log("Async/Await :", result);

    } catch (error) {

        console.error(error);

    }

}

showMessage();



// 6, 7, 8. Fetch API + Display Users +
// Error Handling


const userList = document.querySelector("#userList");

async function fetchUsers() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        console.log("Users");

        users.forEach((user) => {

            console.log(user.name);

            const li = document.createElement("li");

            li.textContent = user.name;

            userList.appendChild(li);

        });

    } catch (error) {

        console.error("Error :", error.message);

    }

}

fetchUsers();