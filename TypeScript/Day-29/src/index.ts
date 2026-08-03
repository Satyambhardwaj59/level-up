// Student Interface

interface Student {
  id: number;
  name: string;
  age: number;
  course: string;
  email: string;
  isActive: boolean;
}

// Student Management Class

class StudentManagementSystem {
  private students: Student[] = [];

  // Add Student
  
  addStudent(student: Student): void {
    const studentExists = this.students.some(
      (s) => s.id === student.id
    );

    if (studentExists) {
      console.log(`❌ Student with ID ${student.id} already exists.`);
      return;
    }

    this.students.push(student);

    console.log(`✅ Student "${student.name}" added successfully.`);
  }

  
  // Remove Student
  
  removeStudent(id: number): void {
    const index = this.students.findIndex(
      (student) => student.id === id
    );

    if (index === -1) {
      console.log(`❌ Student not found.`);
      return;
    }

    const removedStudent = this.students.splice(index, 1);

    console.log(
      `🗑️ ${removedStudent[0].name} removed successfully.`
    );
  }

  
  // Update Student
  
  updateStudent(
    id: number,
    updatedData: Partial<Student>
  ): void {
    const student = this.students.find(
      (student) => student.id === id
    );

    if (!student) {
      console.log("❌ Student not found.");
      return;
    }

    Object.assign(student, updatedData);

    console.log("✅ Student updated successfully.");
  }

  
  // Find Student By ID
  
  findStudentById(id: number): Student | undefined {
    return this.students.find(
      (student) => student.id === id
    );
  }

  
  // Display All Students
  
  displayStudents(): void {
    if (this.students.length === 0) {
      console.log("📭 No students available.");
      return;
    }

    console.table(this.students);
  }
}


// Create Object

const sms = new StudentManagementSystem();

// Add Students

sms.addStudent({
  id: 1,
  name: "Satyam",
  age: 24,
  course: "B.Tech CSE",
  email: "satyam@gmail.com",
  isActive: true,
});

sms.addStudent({
  id: 2,
  name: "Rahul",
  age: 22,
  course: "MCA",
  email: "rahul@gmail.com",
  isActive: true,
});

sms.addStudent({
  id: 3,
  name: "Ankit",
  age: 23,
  course: "BCA",
  email: "ankit@gmail.com",
  isActive: false,
});


// Display Students

console.log("\n===== All Students =====");

sms.displayStudents();


// Find Student

console.log("\n===== Find Student =====");

const student = sms.findStudentById(2);

if (student) {
  console.table(student);
} else {
  console.log("Student not found.");
}


// Update Student

console.log("\n===== Update Student =====");

sms.updateStudent(2, {
  age: 23,
  course: "M.Tech",
  isActive: false,
});


// Display Again

console.log("\n===== Updated Students =====");

sms.displayStudents();


// Remove Student

console.log("\n===== Remove Student =====");

sms.removeStudent(1);


// Final List

console.log("\n===== Final Students =====");

sms.displayStudents();