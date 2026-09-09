# Library Management System Database

## Overview
This database manages a library's book inventory, members, authors, and loan transactions.

## Schema
The database consists of 5 main tables:
- **authors**: Author information
- **books**: Book inventory with details
- **members**: Library members
- **loans**: Book borrowing records
- **categories**: Book categories/genres

## Features
- Complete CRUD operations
- Loan tracking with due dates
- Member management
- Book inventory control
- Author and category relationships

## Setup
1. Run `schema.sql` to create the database and tables
2. Run `seed.sql` to populate with sample data
3. Use `queries.sql` for example queries

## Queries Included
- 30+ SQL queries covering:
  - Basic SELECT statements
  - JOIN operations
  - Aggregation functions
  - Subqueries
  - Date operations
  - Constraint validations