
/*


Create a student object that:

1. Stores name, age, skills, and address.
2. Adds a new property (college).
3. Updates an existing property.
4. Deletes a property.
5. Uses object destructuring.
6. Uses optional chaining.
7. Prints keys, values, and entries.
8. Creates a copy using the spread operator.
9. Demonstrates Object.freeze() and Object.seal().

*/



//! 1. Create a student object

const student = {
  name: "Satyam",
  age: 22,
  skills: ["HTML", "CSS", "JavaScript", "React"],
  address: {
    city: "Patna",
    state: "Bihar",
    pincode: 800001,
  },
};


console.log("Original Student Object:");
console.log(student);


//! 2. Add a new property (college)

student.college = "Netaji Subhas Institute of Technology";

console.log("\nAfter Adding College:");
console.log(student);


//! 3. Update an existing property

student.age = 23;

console.log("\nAfter Updating Age:");
console.log(student);

//! 4. Delete a property

delete student.skills;

console.log("\nAfter Deleting Skills:");
console.log(student);

//! 5. Object Destructuring

const { name, age, address } = student;
console.log(name);
console.log(age);
console.log(address);