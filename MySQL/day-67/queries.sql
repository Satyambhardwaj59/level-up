USE library_management;

-- 1. Basic SELECT - List all books
SELECT * FROM books;

-- 2. Basic SELECT with WHERE - Get all fantasy books
SELECT title, publication_year, price 
FROM books 
WHERE category_id = 1 
ORDER BY publication_year DESC;

-- 3. JOIN - Books with author names
SELECT b.title, CONCAT(a.first_name, ' ', a.last_name) AS author, b.price
FROM books b
JOIN authors a ON b.author_id = a.author_id
ORDER BY b.title;

-- 4. JOIN with multiple tables - Loan details with member and book info
SELECT l.loan_id, CONCAT(m.first_name, ' ', m.last_name) AS member, 
       b.title AS book, l.loan_date, l.due_date, l.status
FROM loans l
JOIN members m ON l.member_id = m.member_id
JOIN books b ON l.book_id = b.book_id
WHERE l.status IN ('Active', 'Overdue')
ORDER BY l.due_date;

-- 5. Aggregation - Count books by category
SELECT c.category_name, COUNT(b.book_id) AS book_count
FROM categories c
LEFT JOIN books b ON c.category_id = b.category_id
GROUP BY c.category_id
ORDER BY book_count DESC;

-- 6. Aggregation with HAVING - Categories with more than 2 books
SELECT c.category_name, COUNT(b.book_id) AS book_count
FROM categories c
JOIN books b ON c.category_id = b.category_id
GROUP BY c.category_id
HAVING COUNT(b.book_id) > 2
ORDER BY book_count DESC;

-- 7. Subquery - Books with price above average
SELECT title, price
FROM books
WHERE price > (SELECT AVG(price) FROM books)
ORDER BY price DESC;

-- 8. Subquery with IN - Members who have currently borrowed books
SELECT CONCAT(first_name, ' ', last_name) AS member_name, email
FROM members
WHERE member_id IN (
    SELECT DISTINCT member_id 
    FROM loans 
    WHERE status IN ('Active', 'Overdue')
)
ORDER BY member_name;

-- 9. Date functions - Loans that are overdue
SELECT l.loan_id, CONCAT(m.first_name, ' ', m.last_name) AS member,
       b.title AS book, 
       DATEDIFF(CURRENT_DATE, l.due_date) AS days_overdue,
       l.fine_amount
FROM loans l
JOIN members m ON l.member_id = m.member_id
JOIN books b ON l.book_id = b.book_id
WHERE l.status = 'Overdue'
ORDER BY days_overdue DESC;

-- 10. Date functions - Books borrowed in August 2026
SELECT b.title, CONCAT(m.first_name, ' ', m.last_name) AS member,
       l.loan_date
FROM loans l
JOIN books b ON l.book_id = b.book_id
JOIN members m ON l.member_id = m.member_id
WHERE MONTH(l.loan_date) = 8 AND YEAR(l.loan_date) = 2026
ORDER BY l.loan_date;

-- 11. Aggregate with GROUP BY - Loans per member
SELECT CONCAT(m.first_name, ' ', m.last_name) AS member_name,
       COUNT(l.loan_id) AS total_loans,
       SUM(CASE WHEN l.status IN ('Active', 'Overdue') THEN 1 ELSE 0 END) AS active_loans
FROM members m
LEFT JOIN loans l ON m.member_id = l.member_id
GROUP BY m.member_id
ORDER BY total_loans DESC;

-- 12. Window function - Rank books by price
SELECT title, price,
       RANK() OVER (ORDER BY price DESC) AS price_rank
FROM books
LIMIT 10;

-- 13. Multiple JOINs with conditions - Get all overdue loans with member contact
SELECT l.loan_id, 
       CONCAT(m.first_name, ' ', m.last_name) AS member,
       m.email, m.phone,
       b.title AS book,
       l.due_date,
       DATEDIFF(CURRENT_DATE, l.due_date) AS days_overdue,
       l.fine_amount
FROM loans l
JOIN members m ON l.member_id = m.member_id
JOIN books b ON l.book_id = b.book_id
WHERE l.status = 'Overdue'
ORDER BY days_overdue DESC;

-- 14. Complex join with aggregation - Most borrowed books
SELECT b.title, 
       CONCAT(a.first_name, ' ', a.last_name) AS author,
       COUNT(l.loan_id) AS borrow_count
FROM books b
JOIN authors a ON b.author_id = a.author_id
LEFT JOIN loans l ON b.book_id = l.book_id
GROUP BY b.book_id
ORDER BY borrow_count DESC
LIMIT 10;

-- 15. Self-join concept - Authors with same nationality
SELECT a1.first_name AS author1, a2.first_name AS author2, a1.nationality
FROM authors a1
JOIN authors a2 ON a1.nationality = a2.nationality 
    AND a1.author_id < a2.author_id
WHERE a1.nationality IS NOT NULL
ORDER BY a1.nationality;

-- 16. CTE - Book statistics per category
WITH category_stats AS (
    SELECT c.category_name,
           COUNT(DISTINCT b.book_id) AS total_books,
           AVG(b.price) AS avg_price,
           SUM(b.available_copies) AS total_available
    FROM categories c
    LEFT JOIN books b ON c.category_id = b.category_id
    GROUP BY c.category_id
)
SELECT * FROM category_stats
WHERE total_books > 0
ORDER BY total_books DESC;

-- 17. Subquery with EXISTS - Active members who have loans
SELECT CONCAT(first_name, ' ', last_name) AS member_name
FROM members m
WHERE EXISTS (
    SELECT 1 FROM loans l
    WHERE l.member_id = m.member_id 
    AND l.status IN ('Active', 'Overdue')
)
ORDER BY member_name;

-- 18. Aggregation with date - Loan statistics by month
SELECT YEAR(loan_date) AS year,
       MONTH(loan_date) AS month,
       COUNT(*) AS total_loans,
       AVG(DATEDIFF(return_date, loan_date)) AS avg_duration,
       SUM(CASE WHEN status = 'Returned' THEN 1 ELSE 0 END) AS returned_count
FROM loans
WHERE return_date IS NOT NULL
GROUP BY YEAR(loan_date), MONTH(loan_date)
ORDER BY year DESC, month DESC;

-- 19. Complex condition - Members with multiple active loans
SELECT CONCAT(m.first_name, ' ', m.last_name) AS member_name,
       COUNT(l.loan_id) AS active_loans
FROM members m
JOIN loans l ON m.member_id = l.member_id
WHERE l.status IN ('Active', 'Overdue')
GROUP BY m.member_id
HAVING COUNT(l.loan_id) >= 2
ORDER BY active_loans DESC;

-- 20. Advanced filtering - Books from American authors with price > $20
SELECT b.title, 
       CONCAT(a.first_name, ' ', a.last_name) AS author,
       b.price, b.publication_year
FROM books b
JOIN authors a ON b.author_id = a.author_id
WHERE a.nationality = 'American' 
  AND b.price > 20
ORDER BY b.price DESC;

-- 21. Case statement - Membership tier categorization
SELECT CONCAT(first_name, ' ', last_name) AS member_name,
       membership_type,
       total_loans,
       CASE 
           WHEN total_loans >= 20 THEN 'Platinum'
           WHEN total_loans >= 10 THEN 'Gold'
           WHEN total_loans >= 5 THEN 'Silver'
           ELSE 'Bronze'
       END AS member_tier
FROM members
ORDER BY total_loans DESC;

-- 22. Date arithmetic - Members who joined in last 30 days
SELECT CONCAT(first_name, ' ', last_name) AS member_name,
       membership_date,
       DATEDIFF(CURRENT_DATE, membership_date) AS days_since_joining
FROM members
WHERE membership_date >= DATE_SUB(CURRENT_DATE, INTERVAL 30 DAY)
ORDER BY membership_date DESC;

-- 23. Multiple aggregations - Author productivity
SELECT CONCAT(a.first_name, ' ', a.last_name) AS author,
       COUNT(b.book_id) AS books_written,
       AVG(b.price) AS avg_price,
       SUM(b.total_copies) AS total_copies
FROM authors a
LEFT JOIN books b ON a.author_id = b.author_id
GROUP BY a.author_id
HAVING COUNT(b.book_id) > 0
ORDER BY books_written DESC;

-- 24. Subquery in SELECT - Book popularity rating
SELECT b.title,
       (SELECT COUNT(*) FROM loans l WHERE l.book_id = b.book_id) AS times_borrowed,
       b.available_copies,
       CASE 
           WHEN (SELECT COUNT(*) FROM loans l WHERE l.book_id = b.book_id) > 5 THEN 'Popular'
           WHEN (SELECT COUNT(*) FROM loans l WHERE l.book_id = b.book_id) > 2 THEN 'Moderate'
           ELSE 'Less Popular'
       END AS popularity
FROM books b
ORDER BY times_borrowed DESC;

-- 25. Set operations - Books borrowed by premium members
SELECT DISTINCT b.title
FROM books b
JOIN loans l ON b.book_id = l.book_id
JOIN members m ON l.member_id = m.member_id
WHERE m.membership_type = 'Premium'
UNION
SELECT DISTINCT b.title
FROM books b
JOIN loans l ON b.book_id = l.book_id
JOIN members m ON l.member_id = m.member_id
WHERE m.membership_type = 'Student'
ORDER BY title;

-- 26. Complex join - Full member loan history
SELECT CONCAT(m.first_name, ' ', m.last_name) AS member_name,
       b.title AS book,
       l.loan_date,
       l.return_date,
       l.status,
       CASE 
           WHEN l.return_date IS NULL AND l.due_date < CURRENT_DATE THEN 'Overdue'
           WHEN l.return_date IS NULL THEN 'Currently Borrowed'
           WHEN l.return_date <= l.due_date THEN 'Returned On Time'
           ELSE 'Returned Late'
       END AS return_status
FROM loans l
JOIN members m ON l.member_id = m.member_id
JOIN books b ON l.book_id = b.book_id
WHERE m.member_id = 1
ORDER BY l.loan_date DESC;

-- 27. Pivot-like query - Monthly loan count by status
SELECT 
    YEAR(loan_date) AS year,
    MONTH(loan_date) AS month,
    SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) AS active_loans,
    SUM(CASE WHEN status = 'Overdue' THEN 1 ELSE 0 END) AS overdue_loans,
    SUM(CASE WHEN status = 'Returned' THEN 1 ELSE 0 END) AS returned_loans,
    COUNT(*) AS total_loans
FROM loans
GROUP BY YEAR(loan_date), MONTH(loan_date)
ORDER BY year DESC, month DESC;

-- 28. Advanced subquery - Books never borrowed
SELECT b.title, 
       CONCAT(a.first_name, ' ', a.last_name) AS author
FROM books b
JOIN authors a ON b.author_id = a.author_id
WHERE b.book_id NOT IN (
    SELECT DISTINCT book_id FROM loans
)
ORDER BY b.title;

-- 29. Aggregation with constraints - Library value statistics
SELECT 
    COUNT(*) AS total_books,
    SUM(total_copies) AS total_copies,
    SUM(available_copies) AS available_copies,
    SUM(price * total_copies) AS total_value,
    AVG(price) AS avg_price
FROM books;

-- 30. Complex date analysis - Member borrowing patterns
SELECT CONCAT(m.first_name, ' ', m.last_name) AS member_name,
       COUNT(l.loan_id) AS total_borrowed,
       AVG(DATEDIFF(l.return_date, l.loan_date)) AS avg_loan_duration,
       MAX(DATEDIFF(l.return_date, l.loan_date)) AS max_loan_duration,
       MIN(DATEDIFF(l.return_date, l.loan_date)) AS min_loan_duration
FROM members m
JOIN loans l ON m.member_id = l.member_id
WHERE l.return_date IS NOT NULL
GROUP BY m.member_id
HAVING COUNT(l.loan_id) >= 3
ORDER BY avg_loan_duration DESC;

-- 31. Data validation - Check for inconsistencies
SELECT 'Books with more on loan than available' AS check_type,
       b.title,
       b.available_copies,
       (SELECT COUNT(*) FROM loans l WHERE l.book_id = b.book_id AND l.status IN ('Active', 'Overdue')) AS on_loan
FROM books b
WHERE b.available_copies < (
    SELECT COUNT(*) FROM loans l 
    WHERE l.book_id = b.book_id AND l.status IN ('Active', 'Overdue')
);

-- 32. Forecasting - Potential revenue from fines
SELECT 
    SUM(fine_amount) AS total_fines_collected,
    AVG(fine_amount) AS avg_fine,
    COUNT(*) AS overdue_count,
    SUM(CASE WHEN fine_amount > 0 THEN 1 ELSE 0 END) AS fines_applied_count
FROM loans
WHERE status = 'Overdue' OR fine_amount > 0;

-- 33. Window function - Running total of loans per member
SELECT CONCAT(m.first_name, ' ', m.last_name) AS member_name,
       l.loan_date,
       COUNT(l.loan_id) OVER (PARTITION BY m.member_id ORDER BY l.loan_date) AS cumulative_loans
FROM loans l
JOIN members m ON l.member_id = m.member_id
ORDER BY m.member_id, l.loan_date;

-- 34. Category analysis - Most popular category by member type
SELECT m.membership_type,
       c.category_name,
       COUNT(l.loan_id) AS borrow_count,
       ROW_NUMBER() OVER (PARTITION BY m.membership_type ORDER BY COUNT(l.loan_id) DESC) AS rank_within_type
FROM members m
JOIN loans l ON m.member_id = l.member_id
JOIN books b ON l.book_id = b.book_id
JOIN categories c ON b.category_id = c.category_id
GROUP BY m.membership_type, c.category_name
ORDER BY m.membership_type, borrow_count DESC;

-- 35. Final comprehensive report - Library dashboard summary
SELECT 
    'Total Books' AS metric, COUNT(*) AS value FROM books
UNION ALL
SELECT 'Total Members', COUNT(*) FROM members
UNION ALL
SELECT 'Active Loans', COUNT(*) FROM loans WHERE status IN ('Active', 'Overdue')
UNION ALL
SELECT 'Overdue Loans', COUNT(*) FROM loans WHERE status = 'Overdue'
UNION ALL
SELECT 'Total Authors', COUNT(*) FROM authors
UNION ALL
SELECT 'Total Categories', COUNT(*) FROM categories
UNION ALL
SELECT 'Total Revenue from Fines', SUM(fine_amount) FROM loans;