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