--   Task

-- Create a database - bank_db
-- Create a table - employess
-- emp_id
-- name
-- desig
-- dept
-- conditions:
-- emp_id column should not allow duplicate and null values, Values of emp_id column should auto increment
-- name column should not contain null value
-- desig column should have default values as "Probation"

CREATE DATABASE IF NOT EXISTS bank_db;

USE bank_db;

CREATE TABLE employees (
    emp_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    desig VARCHAR(20) NOT NULL DEFAULT "Probation",
    dept VARCHAR(20) NOT NULL DEFAULT "Account"
);

DESC employees;

INSERT INTO
    employees (emp_id, name, desig, dept)
VALUES (
        101,
        "Raju",
        "Manager",
        "Loan"
    );

INSERT INTO
    employees (name, desig, dept)
VALUES ("Sham", "Cashier", "Cash"),
    ("Paul", "Associate", "Loan"),
    (
        "Alex",
        "Accountant",
        "Account"
    ),
    (
        "Victor",
        "Associate",
        "Deposit"
    );

SELECT * FROM employees;

SELECT dept AS "Department", emp_id AS "Employee No.", name AS "Emp Name.", desig as "Designation"
FROM employees;

SELECT emp_id, name FROM employees;

-- Task 2:

SELECT * FROM employees WHERE dept = "loan";

SELECT * FROM employees WHERE emp_id = 101;

SELECT emp_id, name FROM employees WHERE emp_id = 101;

UPDATE employees SET dept = "IT" WHERE emp_id = 103;

DELETE FROM employees WHERE emp_id = 102;

-- Exercise - 3

CREATE TABLE emp2 (
    emp_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    fname VARCHAR(20) NOT NULL,
    lname VARCHAR(20) NOT NULL,
    desig VARCHAR(20) NOT NULL,
    dept VARCHAR(20) NOT NULL
);

INSERT INTO emp2( fname, lname, desig, dept)
VALUES
( "Raju", "Rastogi", "Manager", "Loan"),
( "Sham", "Mohan", "Cashier", "Cash"),
( "Baburao", "Apte", "Associate", "Loan"),
( "Paul", "Philip", "Accountant", "Account"),
( "Alex", "Watt", "Associate", "Deposit");


SELECT * FROM emp2;

-- Task 1:     101:Raju:Manager:Loan
SELECT CONCAT_WS(':', emp_id, fname, desig, dept) FROM emp2;

-- Task 2:     101:Raju Rastogi:Manager:Loan
SELECT CONCAT_WS(':', emp_id, CONCAT_WS(' ', fname, lname), desig, dept) FROM emp2;

SELECT CONCAT_WS(':', emp_id, CONCAT(fname, ' ', lname), desig, dept) FROM emp2;

-- Task 3: 101:Raju:MANAGER:Loan
SELECT CONCAT_WS(":", emp_id, fname, UCASE(desig), dept) from emp2;

-- Task 4: L101 Raju
--         C102 Sham

SELECT CONCAT(LEFT(dept, 1), emp_id), fname FROM emp2;




-- Exercise 4:

-- Task 1: Find diffrent type of departments in the database

SELECT DISTINCT dept from emp2;

-- Task 2: Display records with High-low Salary
SELECT * FROM emp2 ORDER BY salary DESC;

-- Task 3: How to see only top 3 records from a table
SELECT * FROM emp2 LIMIT 3;

-- Task 4: Show records where first name start with letter 'A'
SELECT * FROM emp2 WHERE fname LIKE "A%";

-- Task 5: Show records where length of the lname is 4 charcater

SELECT * FROM emp2 WHERE lname LIKE "____";



-- Exercise 5:

-- Task 1: Find totol number of employees in db
SELECT COUNT(emp_id) FROM emp2;

-- Task 2: Find No of employees in each department
SELECT dept, COUNT(emp_id) FROM emp2 GROUP BY dept;

-- Task 3: Find lowest salary paying
SELECT MIN(salary) FROM emp2;

-- Task 4: Find highest salary paying

SELECT * FROM emp2 WHERE salary = (SELECT MAX(salary) FROM emp2);

-- Task 5: Find totoal salary paing in loan department
SELECT SUM(salary) FROM emp2 WHERE dept="loan";

-- Task 6: Find Average salary paying in each department 

SELECT dept, AVG(salary) FROM emp2 GROUP BY dept;