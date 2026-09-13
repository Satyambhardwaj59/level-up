--   GROUP By

use bank_db;

SELECT dept FROM emp2 GROUP BY dept;

-- number of record in a dept

SELECT dept, COUNT(emp_id) FROM emp2 GROUP BY dept;

-- Group by desig

SELECT desig, COUNT(emp_id) FROM emp2 GROUP BY desig;


-- Min and Max

SELECT MAX(salary) FROM emp2;

SELECT MIN(salary) FROM emp2;

-- subquary

SELECT emp_id, fname, salary FROM emp2 WHERE salary = (SELECT MAX(salary) FROM emp2);

SELECT MAX(fname) FROM emp2;
SELECT MIN(fname) FROM emp2;


-- SUM and AVG

SELECT SUM(salary) FROM emp2;
SELECT AVG(salary) FROM emp2;

-- sum of salary in each dept 

SELECT dept, COUNT(emp_id), SUM(salary) FROM emp2 GROUP BY dept;
SELECT dept, COUNT(emp_id), AVG(salary) FROM emp2 GROUP BY dept;