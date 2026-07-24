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


// 7. Method Borrowing using call()

const person1 = {
    name: "Satyam"
};

const person2 = {
    name: "Rahul"
};

function introduce(city) {
    console.log(
        `${this.name} lives in ${city}`
    );
}

introduce.call(person1, "Patna");
introduce.call(person2, "Delhi");


// 8. Passing Arguments using apply()


introduce.apply(person1, ["Mumbai"]);

introduce.apply(person2, ["Kolkata"]);


// 9. Creating Reusable Function using bind()


const introduceSatyam = introduce.bind(person1);

introduceSatyam("Bangalore");

const introduceRahul = introduce.bind(person2);

introduceRahul("Pune");


// 10. IIFE


(function () {

    console.log("IIFE Executed");

})();


// 11. Debounce


function debounce(callback, delay) {

    let timer;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

const search = debounce((text) => {

    console.log("Searching:", text);

}, 1000);

// Try:
// search("R");
// search("Re");
// search("React");

// Only the last call runs after 1 second.


// 12. Throttle


function throttle(callback, delay) {

    let allow = true;

    return function (...args) {

        if (!allow) return;

        callback(...args);

        allow = false;

        setTimeout(() => {

            allow = true;

        }, delay);

    };

}

const save = throttle(() => {

    console.log("Data Saved");

}, 2000);

// Try:
// save();
// save();
// save();

// Only the first call executes immediately.
// Others wait until 2 seconds pass.


// 13. Memoized Fibonacci


function memoizedFibonacci() {

    const cache = {};

    return function fib(n) {

        if (n in cache) {

            console.log("From Cache");

            return cache[n];

        }

        if (n <= 1) {

            return n;

        }

        cache[n] = fib(n - 1) + fib(n - 2);

        return cache[n];

    };

}

const fibonacci = memoizedFibonacci();

console.log(fibonacci(10));
console.log(fibonacci(10));

// Second call comes from cache.