//!  Operators

let a = 10;
let b = 5; 

// console.log(a + b);  // Addition  //! 15
// console.log(a - b); // Subtraction  //! 5
// console.log(a * b); // Multiplication //! 50
// console.log(a / b); // Division //! 2
// console.log(a % b); // Modulus (Remainder) //! 0
// console.log(2 ** 3); // Exponentiation //! 8
// console.log(8 ** (1/3)); // Exponentiation //! 2

let myName = "Satyam" + " Kumar"; 
// console.log(myName);

//! Gess the output of the following code

// console.log('Gess the output')

// console.log("" + 1 + 0)      // "10"
// console.log("" - 1 + 0)     // -1
// console.log(true + false)   // 1
// console.log(6 / "3")        // 2
// console.log("2" * "3")      // 6
// console.log(4 + 5 + "px")   // "9px"
// console.log("$" + 4 + 5)    // "$45"
// console.log("4" - 2)        // 2
// console.log("4px" - 2)      // NaN
// console.log("  -9  " + 5)   // "  -9  5"
// console.log("  -9  " - 5)   // -14
// console.log(null + 1)       // 0
// console.log(undefined + 1)  // NaN
// console.log(" \t \n" - 2)   // -2


//!  Type Conversion

let str = "Some";
let num = 1234;
let strNum = "1234";

console.log(typeof str);  // String
console.log(typeof num);  // Number

let changeType = String(num);
console.log(typeof changeType);  // String
console.log(String(num))    // "1234"
console.log(Number(strNum)) // 1234

console.log(Boolean(" "));  // true
console.log(Boolean(str));  // true
console.log(Boolean(""));  // false
console.log(Number(true)); // 1
console.log(String(true)); // "true"

let num1 = "10";
let num2 = "20";

let add = num1 + num2;
let add2 = Number(num1) + Number(num2);
let add3 = +num1 + +num2;

console.log(add)  // 1020
console.log(add2)  // 30
console.log(add3)  // 30


//! Template Literals

console.log(`Hello ${myName}, How are you!`);


// funny thing -
let fun = (1 + 2, 3 + 4);

console.log( fun ); 