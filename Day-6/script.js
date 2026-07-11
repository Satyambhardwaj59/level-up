
/*


Build a JavaScript file that demonstrates:

1. Global Scope
2. Function Scope
3. Block Scope
4. Hoisting with var
5. TDZ using let
6. Function Declaration Hoisting
7. Function Expression Hoisting
8. Arrow Function Hoisting
9. Nested Functions
10. Execution order using console.log()

*/

//! 1. Global Scope


let globalVar = 'I am a global variable';

function globalScopeExample() {
    console.log("Inner variable", globalVar); // Accessible here
}
 
// globalScopeExample();

//! 2. Function Scope

function functionScopeExample() {
  let message = "I am inside the function";

  console.log(message);
}

// functionScopeExample();
// console.log(message);    //! ReferenceError: message is not defined


//! 3. Block Scope

{
  let blockLet = "Block Scope (let)";
  const blockConst = "Block Scope (const)";
  var blockVar = "var ignores block scope";

//   console.log(blockLet);
//   console.log(blockConst);
}

// console.log(blockVar);

// console.log(blockLet);   // ReferenceError


// console.log(blockConst); // ReferenceError


//! 4. Hoisting with var

// console.log(name);  // undefined

var name = "Sam";   

// console.log(name);   // Sam

//! 5. TDZ using let


// console.log(age);   // ReferenceError

let age = 22;
// console.log(age);

//! 6. Function Declaration Hoisting

sayHello();

function sayHello() {
  console.log("Hello Sam!!, from Function Declaration");
}