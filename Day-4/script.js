
/*


1. Prints numbers from 1 to 100 using a for loop.
2. Prints even numbers from 1 to 50.
3. Uses a while loop for a countdown from 10 to 1.
4. Uses a do...while loop that runs at least once.
5. Iterates through an array using for...of.
6. Iterates through an object using for...in.
7. Demonstrates break and continue.

*/

//! for loop
//! Q1. 

for(let i = 0; i <= 100; i++){
    console.log(i);
}


// Q2

for(let i = 0; i <= 50; i++){
    if(!(i % 2)) console.log(i);
}

// while loop
// Q3

let i = 10;
while (i > 0) {
    console.log(i);
    --i;
}


//! do while
// Q4.

let i = 101;

do {
    console.log("Run ones", i)
} while (i <= 100)


//! for of
// Q5.

let fruits = ['apple', 'banana', 'cherry'];

for(fruit of fruits){
    console.log(fruit);
}


// for in 
// Q6.

let user = {
    name: "Satyam",
    age: 23,
    city: "Patna",
    role: "Admin"
}

for(let prop in user){
    // console.log(prop);  // it will return key


    console.log(user[prop])
}