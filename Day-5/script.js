
/*


1. Creates a function to add two numbers.
2. Converts it into a function expression.
3. Converts it into an arrow function.
4. Uses default parameters.
5. Uses rest parameters to calculate the sum of multiple numbers.
6. Creates a function to check whether a number is even or odd.
7. Returns values instead of printing them directly.

*/

//! Add two numbers
//! Q1. 

// function addTwoNum(a, b){
//     console.log(+a + +b);
// }

// addTwoNum(4, 5);
// addTwoNum('7', 9);


//! Expression 
// Q2.

// const add = function addTwoNum(a, b){
//     console.log(+a + +b);
// }

// add(4, 5);
// add('7', 9);


//! Arrow Function
//! Q3.

// const addTwoNum = (a, b) => {
//      console.log(+a + +b);
// }

// addTwoNum(4, 5);
// addTwoNum('7', 9);


// Q4.


// function addTwoNum(a, b = 10){
//     console.log(+a + +b);
// }

// addTwoNum(4);
// addTwoNum('7', 9);


// Q5.




// Q6.

const checkNumber = (num) => {
    if (num % 2) {
        console.log(`${num} is odd`)
    } else {
        console.log(`${num} is even`)
    }

}

checkNumber(8);


// Q7. 

const greet = (name) => {
    return `Hello ${name}!!`;
}

const greeting = greet('Sam');
console.log(greeting);