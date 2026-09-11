CREATE DATABASE IF NOT EXISTS Sam;

USE Sam;

select DATABASE();

show databases;

CREATE DATABASE if Not EXISTS Test;

drop DATABASE Test;

CREATE DATABASE if Not EXISTS store_db;

use store_db;

CREATE TABLE Customer (id INT, name VARCHAR(50))

CREATE TABLE students ( id INT, name VARCHAR(50), city VARCHAR(50) );

SELECT DATABASE();

desc students;

CREATE DATABASE school_db;

use school_db;

-- adding data into a table
CREATE TABLE students ( id INT, name VARCHAR(50), class INT );

insert into
    students (id, name, class)
VALUES (101, "Satyam", 5),
    (102, "Pihu", 6),
    (103, "Shivanash", 8);

insert into
    students (id, name, class)
VALUES (104, "Alex", 2),
    (105, "Perry", 5);

-- read data from a table

SELECT * FROM students;

SELECT name FROM students;

SELECT id, name FROM students;

-- filter data

SELECT * FROM students WHERE id = 103;

-- add a column in table after creating

ALTER TABLE students ADD contact INT;

-- update data from a Table

UPDATE students SET contact = 1234567 where name = "Pihu";

UPDATE students SET contact = 1234 where id = 103;

-- delete data from table

DELETE FROM students WHERE id = 105;

-- drop the table

DROP Table students;

USE store_db;

SHOW TABLEs;

INSERT INTO customer (id, name) VALUES (null, null);

SELECT * FROM customer;

DESC customer;

-- Null

CREATE TABLE customer1 (
    id INT NOT NULL,
    name VARCHAR(20) NOT NULL
);

INSERT INTO customer1 (id) VALUES (104);

SELECT * FROM customer1;

-- default

CREATE TABLE customers2 (
    id INT NOT NULL,
    name VARCHAR(20) Not NULL,
    acc_type VARCHAR(20) DEFAULT "Saving"
);

DESC customers2;

INSERT INTO
    customers2 (id, name)
VALUES (101, "sam"),
    (102, "Kumar");

INSERT INTO
    customers2 (id, name, acc_type)
VALUES (103, "Raj", "Current");

SELECT * FROM customers2;

SELECT * FROM customers2 WHERE id = 103;

-- primary key

CREATE TABLE customers3 (
    acc_no INT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    acc_type VARCHAR(14) NOT NULL DEFAULT 'Saving'
);

DESC customers3;

INSERT into
    customers3 (acc_no, name, acc_type)
VALUES (1, "Sam", "Current"),
    (2, "Raj", "Current");

INSERT INTO customers3 (acc_no, name) VALUES (4, "Pihu");
-- through error

INSERT INTO customers3 (name) VALUES ("Pihu");
-- through error

INSERT INTO customers3 (acc_no, name) VALUES (NULL, "Pihu");
-- through error

SELECT * FROM customers3;

-- Auto increment

CREATE TABLE customers4 (
    acc_no INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL,
    acc_type VARCHAR(15) not NULL DEFAULT "Saving"
)

DESC customers4;

INSERT INTO customers4 (name) VALUES ("Ram"), ("Raju");

INSERT INTO customers4 (acc_no, name) VALUES (1001, "Arti");

SELECT * from customers4;

-- Alias

SELECT acc_no AS "Account No.", name AS "Customer Name"
FROM customers4;

-- concat

SELECT CONCAT('Hey', 'Sam!');

CREATE TABLE emp (
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    f_name VARCHAR(20) NOT NULL,
    l_name VARCHAR(20) NOT NULL
);

DESC emp;

INSERT INTO emp( f_name, l_name)
VALUES
('Sam', 'Bhardwaj'),
('Satyam', 'Kumar');

INSERT INTO emp(id, f_name, l_name)
VALUES
(103, 'ABC', 'Bhardwaj');


SELECT * FROM emp;

SELECT id, CONCAT(f_name, ' ', l_name) AS FullName FROM emp;


-- CONCAT_WS  (concat with seprator)

SELECT CONCAT_WS(':', f_name, l_name) FROM emp;

SELECT SUBSTRING('Hello Sam!!', 6, 9);

SELECT SUBSTRING(acc_no, 3) AS EMPID, name FROM employees WHERE acc_no=1001;


-- Replace

SELECT REPLACE("Hey Sam!!", 'Hey', 'Hey');

SELECT REPLACE(id, 10, 'EMP') as Ids, f_name FROM emp WHERE id=103;


-- reverse

SELECT REVERSE('Hello');