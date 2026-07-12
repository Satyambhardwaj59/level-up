
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

console.log("After Adding College:");
console.log(student);


//! 3. Update an existing property

student.age = 23;

console.log("After Updating Age:");
console.log(student);

//! 4. Delete a property

delete student.skills;

console.log("After Deleting Skills:");
console.log(student);

//! 5. Object Destructuring

const { name, age, address } = student;
console.log(name);
console.log(age);
console.log(address);


//! 6. Optional Chaining

// Existing Property
console.log("Existing City:");
console.log(student.address?.city);

// Non-existing Property
console.log("Non-existing Country:");
console.log(student.address?.country);

// Deeply Missing Property
console.log("Missing Department:");
console.log(student.department?.name);


//! 7. Print keys, values, and entries

console.log("Object Keys:");
console.log(Object.keys(student));

console.log("Object Values:");
console.log(Object.values(student));

console.log("Object Entries:");
console.log(Object.entries(student));


//! 8. Create a copy using the spread operator

const copiedStudent = {
  ...student,
};

console.log("Copied Object:");
console.log(copiedStudent);

// Update copied object
copiedStudent.name = "Rahul";

console.log("Copied Object After Modification:");
console.log(copiedStudent);

console.log("Original Object Remains:");
console.log(student);

//! 9. Demonstrate Object.freeze() and Object.seal()

const frozenObject = {
  brand: "Apple",
  model: "iPhone 16",
};

Object.freeze(frozenObject);

// These operations will fail silently (or throw an error in strict mode)
frozenObject.brand = "Samsung";
frozenObject.color = "Black";
delete frozenObject.model;

console.log("Frozen Object:");
console.log(frozenObject);

//! Object.seal() 

const sealedObject = {
  name: "Laptop",
  price: 60000,
};

Object.seal(sealedObject);

// Allowed: Update existing property
sealedObject.price = 65000;

// Not Allowed: Add new property
sealedObject.brand = "Dell";

// Not Allowed: Delete property
delete sealedObject.name;

console.log("Sealed Object:");
console.log(sealedObject);