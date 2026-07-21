/*


Build a JavaScript file that demonstrates:

1. A closure-based counter with private state.
2. A closure that remembers previous values.
3. Examples of this in:
4. Global scope
5. Regular functions
6. Object methods
7. Arrow functions
8. Method borrowing using call().
9. Passing arguments with apply().
10. Creating a reusable function with bind().
11. An IIFE that runs immediately.
12. A simple debounce() function.
13. A simple throttle() function.
14. A basic memoized Fibonacci or factorial function.




*/


// 1. Closure-Based Counter (Private State)


function createCounter() {
    let count = 0;

    return function () {
        count++;
        return count;
    };
}

const counter = createCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3


// 2. Closure that Remembers Previous Values


function rememberValues() {

    const history = [];

    return function (value) {

        history.push(value);

        return [...history];
    };

}

const remember = rememberValues();

console.log(remember("HTML"));
console.log(remember("CSS"));
console.log(remember("JavaScript"));


// 3. this in Global Scope


console.log(this);

// Browser -> window
// Node.js -> {}


// 4. this in Regular Function


function regularFunction() {
    console.log(this);
}

regularFunction();

// Browser (non-strict) -> window
// Strict mode -> undefined


// 5. this in Object Method


const student = {

    name: "Satyam",

    greet() {
        console.log(`Hello ${this.name}`);
    }

};

student.greet();


// 6. this in Arrow Function


const person = {

    name: "Rahul",

    greet: () => {
        console.log(this.name);
    }

};

person.greet();

// Arrow functions don't have their own this.


