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

SELECT * FROM employees WHERE dept="loan";

SELECT * FROM employees WHERE emp_id=101;

SELECT emp_id, name FROM employees WHERE emp_id=101;

UPDATE employees SET dept="IT" WHERE emp_id=103;

DELETE FROM employees WHERE emp_id=102;