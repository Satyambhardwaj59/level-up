USE library_management;

-- Insert authors
INSERT INTO authors (first_name, last_name, birth_date, nationality, email) VALUES
('J.K.', 'Rowling', '1965-07-31', 'British', 'jk.rowling@email.com'),
('Stephen', 'King', '1947-09-21', 'American', 'stephen.king@email.com'),
('Agatha', 'Christie', '1890-09-15', 'British', 'agatha.christie@email.com'),
('George R.R.', 'Martin', '1948-09-20', 'American', 'george.martin@email.com'),
('J.R.R.', 'Tolkien', '1892-01-03', 'British', 'jrrtolkien@email.com'),
('Dan', 'Brown', '1964-06-22', 'American', 'dan.brown@email.com'),
('Paulo', 'Coelho', '1947-08-24', 'Brazilian', 'paulo.coelho@email.com'),
('Harper', 'Lee', '1926-04-28', 'American', 'harper.lee@email.com'),
('F. Scott', 'Fitzgerald', '1896-09-24', 'American', 'fitzgerald@email.com'),
('Ernest', 'Hemingway', '1899-07-21', 'American', 'hemingway@email.com'),
('Jane', 'Austen', '1775-12-16', 'British', 'jane.austen@email.com'),
('Charles', 'Dickens', '1812-02-07', 'British', 'dickens@email.com'),
('Mark', 'Twain', '1835-11-30', 'American', 'twain@email.com'),
('Emily', 'Bronte', '1818-07-30', 'British', 'bronte@email.com'),
('Leo', 'Tolstoy', '1828-09-09', 'Russian', 'tolstoy@email.com');

-- Insert categories
INSERT INTO categories (category_name, description) VALUES
('Fantasy', 'Fiction with magical elements and imaginary worlds'),
('Mystery', 'Crime, detective stories and suspense'),
('Science Fiction', 'Futuristic and scientific concepts'),
('Non-Fiction', 'Factual and educational content'),
('Romance', 'Love stories and relationships'),
('Thriller', 'Suspenseful and exciting narratives'),
('Horror', 'Frightening and supernatural themes'),
('Historical', 'Fiction set in past historical periods'),
('Classic', 'Enduring literary masterpieces'),
('Adventure', 'Exciting journeys and expeditions');

-- Insert books
INSERT INTO books (title, author_id, category_id, isbn, publication_year, publisher, total_copies, available_copies, price, page_count, language) VALUES
('Harry Potter and the Philosopher\'s Stone', 1, 1, '9780747532699', 1997, 'Bloomsbury', 5, 3, 25.99, 223, 'English'),
('Harry Potter and the Chamber of Secrets', 1, 1, '9780747538493', 1998, 'Bloomsbury', 4, 2, 22.99, 251, 'English'),
('The Shining', 2, 7, '9780307743657', 1977, 'Doubleday', 3, 1, 18.99, 447, 'English'),
('Murder on the Orient Express', 3, 2, '9780062693662', 1934, 'Collins', 4, 2, 16.99, 256, 'English'),
('A Game of Thrones', 4, 1, '9780553573404', 1996, 'Bantam', 6, 4, 29.99, 694, 'English'),
('The Lord of the Rings', 5, 1, '9780544003484', 1954, 'Allen & Unwin', 3, 1, 35.99, 1178, 'English'),
('The Da Vinci Code', 6, 6, '9780385504201', 2003, 'Doubleday', 5, 3, 22.99, 454, 'English'),
('The Alchemist', 7, 5, '9780062502174', 1988, 'HarperOne', 4, 2, 15.99, 163, 'English'),
('To Kill a Mockingbird', 8, 9, '9780061120084', 1960, 'Harper Collins', 5, 4, 14.99, 281, 'English'),
('The Great Gatsby', 9, 9, '9780743273565', 1925, 'Scribner', 4, 2, 12.99, 180, 'English'),
('The Old Man and the Sea', 10, 9, '9780684801223', 1952, 'Scribner', 3, 1, 11.99, 127, 'English'),
('Pride and Prejudice', 11, 9, '9780141439518', 1813, 'Penguin', 5, 3, 9.99, 279, 'English'),
('A Tale of Two Cities', 12, 8, '9780141439600', 1859, 'Penguin', 3, 1, 13.99, 489, 'English'),
('The Adventures of Huckleberry Finn', 13, 10, '9780142437179', 1884, 'Penguin', 3, 2, 11.99, 327, 'English'),
('Wuthering Heights', 14, 5, '9780141439556', 1847, 'Penguin', 4, 3, 10.99, 316, 'English'),
('War and Peace', 15, 8, '9781400079988', 1869, 'Vintage', 2, 1, 19.99, 1296, 'English'),
('Harry Potter and the Prisoner of Azkaban', 1, 1, '9780747542155', 1999, 'Bloomsbury', 4, 2, 24.99, 317, 'English'),
('It', 2, 7, '9781501142970', 1986, 'Viking', 3, 1, 20.99, 1138, 'English'),
('And Then There Were None', 3, 2, '9780062073488', 1939, 'Collins', 4, 3, 15.99, 272, 'English'),
('A Clash of Kings', 4, 1, '9780553579901', 1998, 'Bantam', 5, 3, 27.99, 761, 'English'),
('Angels & Demons', 6, 6, '9780743493468', 2000, 'Pocket Books', 3, 1, 21.99, 432, 'English'),
('The Hobbit', 5, 1, '9780547928227', 1937, 'Allen & Unwin', 5, 4, 19.99, 310, 'English'),
('The Catcher in the Rye', 8, 9, '9780316769488', 1951, 'Little, Brown', 4, 2, 14.99, 224, 'English'),
('1984', 9, 3, '9780451524935', 1949, 'Secker & Warburg', 5, 3, 16.99, 328, 'English'),
('Brave New World', 10, 3, '9780060850524', 1932, 'Chatto & Windus', 3, 2, 15.99, 288, 'English');


-- Insert members
INSERT INTO members (first_name, last_name, email, phone, address, membership_type, is_active, total_loans) VALUES
('John', 'Smith', 'john.smith@email.com', '555-0101', '123 Main St, New York, NY 10001', 'Premium', TRUE, 12),
('Emma', 'Johnson', 'emma.j@email.com', '555-0102', '456 Oak Ave, Los Angeles, CA 90001', 'Basic', TRUE, 5),
('Michael', 'Williams', 'michael.w@email.com', '555-0103', '789 Pine Rd, Chicago, IL 60601', 'Student', TRUE, 8),
('Sarah', 'Brown', 'sarah.b@email.com', '555-0104', '321 Elm St, Houston, TX 77001', 'Premium', TRUE, 15),
('David', 'Jones', 'david.j@email.com', '555-0105', '654 Maple Dr, Phoenix, AZ 85001', 'Basic', TRUE, 3),
('Lisa', 'Garcia', 'lisa.g@email.com', '555-0106', '987 Cedar Ln, Philadelphia, PA 19101', 'Premium', TRUE, 20),
('James', 'Martinez', 'james.m@email.com', '555-0107', '147 Birch Ct, San Antonio, TX 78201', 'Student', FALSE, 2),
('Patricia', 'Robinson', 'patricia.r@email.com', '555-0108', '258 Willow Way, San Diego, CA 92101', 'Basic', TRUE, 7),
('Robert', 'Clark', 'robert.c@email.com', '555-0109', '369 Aspen Blvd, Dallas, TX 75201', 'Premium', TRUE, 18),
('Jennifer', 'Rodriguez', 'jennifer.r@email.com', '555-0110', '741 Poplar St, San Jose, CA 95101', 'Student', TRUE, 11),
('Thomas', 'Lewis', 'thomas.l@email.com', '555-0111', '852 Spruce Ave, Austin, TX 78701', 'Basic', TRUE, 4),
('Maria', 'Walker', 'maria.w@email.com', '555-0112', '963 Fir Dr, Jacksonville, FL 32201', 'Premium', TRUE, 14),
('Charles', 'Allen', 'charles.a@email.com', '555-0113', '159 Oakwood Ct, Fort Worth, TX 76101', 'Basic', TRUE, 6),
('Susan', 'Young', 'susan.y@email.com', '555-0114', '753 Pinecrest Rd, Columbus, OH 43201', 'Student', TRUE, 9),
('Daniel', 'King', 'daniel.k@email.com', '555-0115', '951 Valley View Dr, Charlotte, NC 28201', 'Premium', TRUE, 22);

-- Insert loans with various dates and statuses
INSERT INTO loans (book_id, member_id, loan_date, due_date, return_date, status, fine_amount) VALUES
(1, 1, '2026-08-20', '2026-09-03', NULL, 'Active', 0.00),
(3, 2, '2026-08-25', '2026-09-08', NULL, 'Active', 0.00),
(5, 3, '2026-08-28', '2026-09-11', NULL, 'Active', 0.00),
(7, 4, '2026-08-30', '2026-09-13', NULL, 'Active', 0.00),
(9, 5, '2026-09-01', '2026-09-15', NULL, 'Active', 0.00),
(2, 6, '2026-07-15', '2026-07-29', NULL, 'Overdue', 15.00),
(4, 7, '2026-07-20', '2026-08-03', NULL, 'Overdue', 22.50),
(6, 8, '2026-07-25', '2026-08-08', NULL, 'Overdue', 18.00),
(8, 9, '2026-07-28', '2026-08-11', NULL, 'Overdue', 12.00),
(10, 10, '2026-08-01', '2026-08-15', NULL, 'Overdue', 9.00),
(11, 11, '2026-08-01', '2026-08-15', '2026-08-12', 'Returned', 0.00),
(12, 12, '2026-08-03', '2026-08-17', '2026-08-15', 'Returned', 0.00),
(13, 13, '2026-08-05', '2026-08-19', '2026-08-18', 'Returned', 0.00),
(14, 14, '2026-08-07', '2026-08-21', '2026-08-20', 'Returned', 0.00),
(15, 15, '2026-08-10', '2026-08-24', '2026-08-23', 'Returned', 0.00),
(16, 1, '2026-08-12', '2026-08-26', '2026-08-25', 'Returned', 0.00),
(17, 2, '2026-08-14', '2026-08-28', '2026-08-27', 'Returned', 0.00),
(18, 3, '2026-08-16', '2026-08-30', '2026-08-29', 'Returned', 0.00),
(19, 4, '2026-08-18', '2026-09-01', '2026-08-31', 'Returned', 0.00),
(20, 5, '2026-08-20', '2026-09-03', '2026-09-02', 'Returned', 0.00),
(21, 6, '2026-07-01', '2026-07-15', '2026-07-14', 'Returned', 0.00),
(22, 7, '2026-07-03', '2026-07-17', '2026-07-16', 'Returned', 0.00),
(23, 8, '2026-07-05', '2026-07-19', '2026-07-18', 'Returned', 0.00),
(24, 9, '2026-07-07', '2026-07-21', '2026-07-20', 'Returned', 0.00),
(25, 10, '2026-07-09', '2026-07-23', '2026-07-22', 'Returned', 0.00),
(2, 11, '2026-09-02', '2026-09-16', NULL, 'Active', 0.00),
(4, 12, '2026-09-03', '2026-09-17', NULL, 'Active', 0.00),
(6, 13, '2026-09-04', '2026-09-18', NULL, 'Active', 0.00),
(8, 14, '2026-09-05', '2026-09-19', NULL, 'Active', 0.00),
(10, 15, '2026-09-06', '2026-09-20', NULL, 'Active', 0.00);

-- Overdue loans
INSERT INTO loans (book_id, member_id, loan_date, due_date, return_date, status, fine_amount) VALUES
(1, 1, '2026-08-20', '2026-09-03', NULL, 'Active', 0.00),
(3, 2, '2026-08-25', '2026-09-08', NULL, 'Active', 0.00),
(5, 3, '2026-08-28', '2026-09-11', NULL, 'Active', 0.00),
(7, 4, '2026-08-30', '2026-09-13', NULL, 'Active', 0.00),
(9, 5, '2026-09-01', '2026-09-15', NULL, 'Active', 0.00),
(2, 6, '2026-07-15', '2026-07-29', NULL, 'Overdue', 15.00),
(4, 7, '2026-07-20', '2026-08-03', NULL, 'Overdue', 22.50),
(6, 8, '2026-07-25', '2026-08-08', NULL, 'Overdue', 18.00),
(8, 9, '2026-07-28', '2026-08-11', NULL, 'Overdue', 12.00),
(10, 10, '2026-08-01', '2026-08-15', NULL, 'Overdue', 9.00),
(11, 11, '2026-08-01', '2026-08-15', '2026-08-12', 'Returned', 0.00),
(12, 12, '2026-08-03', '2026-08-17', '2026-08-15', 'Returned', 0.00),
(13, 13, '2026-08-05', '2026-08-19', '2026-08-18', 'Returned', 0.00),
(14, 14, '2026-08-07', '2026-08-21', '2026-08-20', 'Returned', 0.00),
(15, 15, '2026-08-10', '2026-08-24', '2026-08-23', 'Returned', 0.00),
(16, 1, '2026-08-12', '2026-08-26', '2026-08-25', 'Returned', 0.00),
(17, 2, '2026-08-14', '2026-08-28', '2026-08-27', 'Returned', 0.00),
(18, 3, '2026-08-16', '2026-08-30', '2026-08-29', 'Returned', 0.00),
(19, 4, '2026-08-18', '2026-09-01', '2026-08-31', 'Returned', 0.00),
(20, 5, '2026-08-20', '2026-09-03', '2026-09-02', 'Returned', 0.00),
(21, 6, '2026-07-01', '2026-07-15', '2026-07-14', 'Returned', 0.00),
(22, 7, '2026-07-03', '2026-07-17', '2026-07-16', 'Returned', 0.00),
(23, 8, '2026-07-05', '2026-07-19', '2026-07-18', 'Returned', 0.00),
(24, 9, '2026-07-07', '2026-07-21', '2026-07-20', 'Returned', 0.00),
(25, 10, '2026-07-09', '2026-07-23', '2026-07-22', 'Returned', 0.00),
(2, 11, '2026-09-02', '2026-09-16', NULL, 'Active', 0.00),
(4, 12, '2026-09-03', '2026-09-17', NULL, 'Active', 0.00),
(6, 13, '2026-09-04', '2026-09-18', NULL, 'Active', 0.00),
(8, 14, '2026-09-05', '2026-09-19', NULL, 'Active', 0.00),
(10, 15, '2026-09-06', '2026-09-20', NULL, 'Active', 0.00);



SELECT member_id FROM members;

-- Returned loans
(11, 11, '2026-08-01', '2026-08-15', '2026-08-12', 'Returned', 0.00),
(12, 12, '2026-08-03', '2026-08-17', '2026-08-15', 'Returned', 0.00),
(13, 13, '2026-08-05', '2026-08-19', '2026-08-18', 'Returned', 0.00),
(14, 14, '2026-08-07', '2026-08-21', '2026-08-20', 'Returned', 0.00),
(15, 15, '2026-08-10', '2026-08-24', '2026-08-23', 'Returned', 0.00),

-- More loans with various dates
(16, 1, '2026-08-12', '2026-08-26', '2026-08-25', 'Returned', 0.00),
(17, 2, '2026-08-14', '2026-08-28', '2026-08-27', 'Returned', 0.00),
(18, 3, '2026-08-16', '2026-08-30', '2026-08-29', 'Returned', 0.00),
(19, 4, '2026-08-18', '2026-09-01', '2026-08-31', 'Returned', 0.00),
(20, 5, '2026-08-20', '2026-09-03', '2026-09-02', 'Returned', 0.00),

-- Older returned loans
(21, 6, '2026-07-01', '2026-07-15', '2026-07-14', 'Returned', 0.00),
(22, 7, '2026-07-03', '2026-07-17', '2026-07-16', 'Returned', 0.00),
(23, 8, '2026-07-05', '2026-07-19', '2026-07-18', 'Returned', 0.00),
(24, 9, '2026-07-07', '2026-07-21', '2026-07-20', 'Returned', 0.00),
(25, 10, '2026-07-09', '2026-07-23', '2026-07-22', 'Returned', 0.00),

-- More active loans
(2, 11, '2026-09-02', '2026-09-16', NULL, 'Active', 0.00),
(4, 12, '2026-09-03', '2026-09-17', NULL, 'Active', 0.00),
(6, 13, '2026-09-04', '2026-09-18', NULL, 'Active', 0.00),
(8, 14, '2026-09-05', '2026-09-19', NULL, 'Active', 0.00),
(10, 15, '2026-09-06', '2026-09-20', NULL, 'Active', 0.00);