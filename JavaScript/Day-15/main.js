import { student, numbers } from "./user.js";
import { sum, greet } from "./utils.js";

// 1. Object Destructuring

const { name, age, address } = student;

console.log("Name:", name);
console.log("Age:", age);
console.log("Address:", address);


// 2. Array Destructuring

const [first, second, ...remaining] = numbers;

console.log("First:", first);
console.log("Second:", second);
console.log("Remaining:", remaining);

// 3. Spread Operator (Arrays)

const frontendSkills = ["HTML", "CSS", "JavaScript"];

const backendSkills = ["Node.js", "Express", "MongoDB"];

const allSkills = [
    ...frontendSkills,
    ...backendSkills
];

console.log(allSkills);

// 4. Spread Operator (Objects)

const updatedStudent = {
    ...student,
    college: "Netaji Subhas Institute of Technology"
};

console.log(updatedStudent);


// 5. Rest Operator


console.log(sum(10,20,30,40,50));


// 6. Optional Chaining

console.log(student.address?.city);

console.log(student.address?.country);

console.log(student.department?.name);


// 7. Nullish Coalescing


const country = student.address?.country ?? "India";

console.log(country);

const department = student.department ?? "Computer Science";

console.log(department);


// 8. Template Literals


const message =
`Hello ${student.name},
Welcome to JavaScript ES6.
Your age is ${student.age}.
`;

console.log(message);


// 9. Imported Function


console.log(greet(student.name));