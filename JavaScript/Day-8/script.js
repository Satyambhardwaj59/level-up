/*


Create an array of student objects and perform the following:

1. Add and remove elements using push() and pop().
2. Insert and delete items using splice().
3. Create a new array using slice().
4. Use map() to return only student names.
5. Use filter() to find students with marks above 80.
6. Use reduce() to calculate total marks.
7. Use find() to search for a student by name.
8. Check conditions using some() and every().
9. Sort students by marks.
10. Flatten a nested array using flat().



*/

//! 1. Create an array of student objects

const students = [
  { id: 1, name: 'Satyam', marks: 92, course: 'B.Tech' },
  { id: 2, name: 'Rahul', marks: 75, course: 'BCA' },
  { id: 3, name: 'Priya', marks: 88, course: 'MCA' },
  { id: 4, name: 'Ankit', marks: 65, course: 'B.Tech' }
];

console.log("Original Students:");
console.log(students);

//! 2. Add a new student using push()
students.push({ id: 5, name: 'Neha', marks: 81, course: 'BCA' });

console.log("After push():");
console.log(students);


//! 3. Remove the last student using pop()
students.pop();

console.log("After pop():");
console.log(students);


//! 4. Insert a student at index 2 using splice()
students.splice(2, 0, { id: 6, name: 'Amit', marks: 90, course: 'MCA' });

console.log("After splice() - Insert:");
console.log(students);

//! 5. Delete a student at index 1 using splice()
students.splice(1, 1);

console.log("After splice() - Delete:");
console.log(students);


//! 6. Create a new array using slice()
const newStudents = students.slice(1, 3);

console.log("New Students Array using slice():");
console.log(newStudents);

//! 7. Use map() to return only student names
const studentNames = students.map(student => student.name);

console.log("Student Names using map():");
console.log(studentNames);


//! 8. Use filter() to find students with marks above 80
const highScorers = students.filter(student => student.marks > 80);

console.log("Students with Marks Above 80 using filter():");
console.log(highScorers);

//! 9. Use reduce() to calculate total marks
const totalMarks = students.reduce((total, student) => total + student.marks, 0);

console.log("Total Marks using reduce():");
console.log(totalMarks);

//! 10. Use find() to search for a student by name
const studentByName = students.find(student => student.name === 'Amit');  

console.log("Found Student:");
console.log(studentByName)

//! 11. Check conditions using some() and every()
const hasHighScorer = students.some(student => student.marks > 90);
const allPassed = students.every(student => student.marks >= 50);

console.log("Has High Scorer using some():", hasHighScorer);
console.log("All Students Passed using every():", allPassed);


//! 12. Sort students by marks
const sortedStudents = [...students].sort((a, b) => b.marks - a.marks);

console.log("Students Sorted by Marks:");
console.log(sortedStudents);

//! 13. Flatten a nested array using flat()
const nestedArray = [1, [2, 3], [4, [5, 6]]];
const flattenedArray = nestedArray.flat(2);

console.log("Flattened Array using flat():");
console.log(flattenedArray);