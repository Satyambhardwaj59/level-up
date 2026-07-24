/*

Build a small JavaScript program that:

1. Creates a function and stores it in a variable.
2. Passes a function as an argument to another function.
3. Returns a function from another function.
4. Uses map() to square an array of numbers.
5. Uses filter() to find even numbers.
6. Uses reduce() to calculate the total sum.
7. Creates a simple closure-based counter.




*/


//! 1. Creates a function and stores it in a variable
const greet = function(name) {
    return `Hello, ${name}!`;
};


//! 2. Passes a function as an argument to another function
function processUserInput(callback) {
    const name = prompt("Please enter your name:");
    alert(callback(name));
}

function greetUser(name) {
    return `Hello, ${name}! Welcome to JavaScript.`;
}

processUserInput(greetUser);


//! 3. Returns a function from another function
function createMultiplier(multiplier) {
    return function(number) {
        return number * multiplier;
    };
}

//! 4. Uses map() to square an array of numbers
const numbers = [1, 2, 3, 4, 5];
const squaredNumbers = numbers.map(num => num * num);
console.log('Squared Numbers:', squaredNumbers);

//! 5. Uses filter() to find even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even Numbers:', evenNumbers);

//! 6. Uses reduce() to calculate the total sum
const totalSum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log('Total Sum:', totalSum);

//! 7. Creates a simple closure-based counter
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    }
}

const counter = createCounter();
console.log('Counter:', counter());