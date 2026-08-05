
// Employee Interface


interface Employee {
  id: number;
  name: string;
  email: string;
  age: number;
  department: string;
  salary: number;
  isActive: boolean;
}


// Employee Management System


class EmployeeManagementSystem {
  private employees: Employee[] = [];

  
  // Add Employee
  
  addEmployee(employee: Employee): void {
    const exists = this.employees.some(
      (emp) => emp.id === employee.id
    );

    if (exists) {
      console.log(
        `❌ Employee with ID ${employee.id} already exists.`
      );
      return;
    }

    this.employees.push(employee);

    console.log(
      `✅ ${employee.name} added successfully.`
    );
  }

  
  // Update Employee
  
  updateEmployee(
    id: number,
    updatedData: Partial<Employee>
  ): void {
    const employee = this.employees.find(
      (emp) => emp.id === id
    );

    if (!employee) {
      console.log("❌ Employee not found.");
      return;
    }

    Object.assign(employee, updatedData);

    console.log("✅ Employee updated successfully.");
  }

  
  // Delete Employee
  
  deleteEmployee(id: number): void {
    const index = this.employees.findIndex(
      (emp) => emp.id === id
    );

    if (index === -1) {
      console.log("❌ Employee not found.");
      return;
    }

    const deletedEmployee = this.employees.splice(index, 1);

    console.log(
      `🗑️ ${deletedEmployee[0].name} deleted successfully.`
    );
  }

  
  // Search Employee By ID
  
  searchEmployeeById(
    id: number
  ): Employee | undefined {
    return this.employees.find(
      (emp) => emp.id === id
    );
  }

  
  // Filter By Department
  
  filterByDepartment(
    department: string
  ): Employee[] {
    return this.employees.filter(
      (emp) =>
        emp.department.toLowerCase() ===
        department.toLowerCase()
    );
  }

  
  // Display All Employees
  
  displayEmployees(): void {
    if (this.employees.length === 0) {
      console.log("📭 No Employees Found.");
      return;
    }

    console.table(this.employees);
  }

  
  // Display Single Employee
  
  displayEmployeeDetails(id: number): void {
    const employee =
      this.searchEmployeeById(id);

    if (!employee) {
      console.log("❌ Employee not found.");
      return;
    }

    console.table(employee);
  }
}


// Create Management System


const ems = new EmployeeManagementSystem();


// Add Employees


ems.addEmployee({
  id: 1,
  name: "Satyam",
  email: "satyam@gmail.com",
  age: 24,
  department: "Engineering",
  salary: 60000,
  isActive: true,
});

ems.addEmployee({
  id: 2,
  name: "Rahul",
  email: "rahul@gmail.com",
  age: 26,
  department: "HR",
  salary: 45000,
  isActive: true,
});

ems.addEmployee({
  id: 3,
  name: "Ankit",
  email: "ankit@gmail.com",
  age: 28,
  department: "Engineering",
  salary: 75000,
  isActive: false,
});

ems.addEmployee({
  id: 4,
  name: "Priya",
  email: "priya@gmail.com",
  age: 25,
  department: "Finance",
  salary: 55000,
  isActive: true,
});


// Display All Employees


console.log("\n========== ALL EMPLOYEES ==========\n");

ems.displayEmployees();


// Search Employee


console.log("\n========== SEARCH EMPLOYEE ==========\n");

const employee = ems.searchEmployeeById(2);

if (employee) {
  console.table(employee);
} else {
  console.log("Employee not found.");
}


// Update Employee


console.log("\n========== UPDATE EMPLOYEE ==========\n");

ems.updateEmployee(2, {
  salary: 52000,
  department: "Administration",
});


// Display Updated Employee


ems.displayEmployeeDetails(2);


// Filter Department


console.log("\n========== ENGINEERING ==========\n");

const engineers =
  ems.filterByDepartment("Engineering");

console.table(engineers);


// Delete Employee


console.log("\n========== DELETE EMPLOYEE ==========\n");

ems.deleteEmployee(3);


// Final Employee List


console.log("\n========== FINAL EMPLOYEE LIST ==========\n");

ems.displayEmployees();