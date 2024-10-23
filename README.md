# Personal Expense Tracker API

## Overview

This is a RESTful API for managing personal financial records. Users can record their income and expenses, retrieve past transactions, and get summaries by category or time period. This project uses **Node.js**, **Express**, and **SQLite** as the backend framework and database, respectively.

## Features

- Record income and expenses
- Retrieve all transactions or specific ones by ID
- Update and delete transactions
- Retrieve transaction summaries by category and time period
- Pagination support for large volumes of data
- Generate monthly reports for financial insights
- Generate summary by Category

## Technologies Used

- **Backend**: Node.js with Express.js
- **Database**: SQLite
- **Postman**: API testing and demonstration (screenshots to be added)

## Project Structure

- ExpenseTrackerBackend/
  - │ ├── controllers/│
    └── transactionController.js # Handles transaction logic │
    └── categoryController.js # Handles category logic │
  - ├── db/ │
    └── expense-tracker.db # SQLite database │
  - ├── models/ │
    └── transactionModel.js # Database queries for transactions │ └── categoryModel.js # Database queries for categories │
    -├── routes/ │
    └── transactionRoutes.js # API routes for transaction CRUD operations │
    └── summaryRoutes.js # API routes for summary Read operation │
    -├── seed.js # Seeds the database with initial categories ├── seedTransactions.js # Seeds the database with initial transactions
    -├── server.js # Main server file
    -├── README.md # Project documentation
    -|── package.json # Project dependencies

## Setup Instructions

### Prerequisites

- Node.js installed on your machine
- SQLite installed on your machine or access to a database browser like DB Browser for SQLite

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ExpenseTrackerBackend.git
   cd ExpenseTrackerBackend
   ```

## Install Dependencies

npm install

## Seed the database with initial categories:

node seed.js

## starting server

node server.js

### API Documentation

## Endpoints

# Add a Transaction

URL: /transactions
Method: POST
Description: Adds a new income or expense transaction.
Request Body:
{
"type": "income",
"category": 1,
"amount": 5000,
"date": "2024-10-01",
"description": "Salary for October"
}
Response: Returns the created transaction.

# Get All Transactions

URL: /transactions
Method: GET
Description: Retrieves all transactions with pagination.
Query Parameters:
page: Page number (optional, default: 1)
limit: Number of transactions per page (optional, default: 10)
Response: Returns a paginated list of all transactions.

# Get Transaction by ID

URL: /transactions/:id
Method: GET
Description: Retrieves a transaction by its ID.
Response: Returns the specific transaction if found.

# Update Transaction by ID

URL: /transactions/:id
Method: PUT
Description: Updates a transaction by its ID.
Request Body (example):
{
"type": "expense",
"category": 4,
"amount": 1600,
"date": "2024-10-02",
"description": "Updated rent for October"
}
Response: Returns the updated transaction.

# Delete Transaction by ID

URL: /transactions/:id
Method: DELETE
Description: Deletes a transaction by its ID.
Response: Returns success message.

# Get Summary by Category

URL: /transactions/summary/category
Method: GET
Description: Retrieves a summary of total income and expenses by category.
Response: Example response:
{
"summary": [
{ "category": "Salary", "type": "income", "total": 5000 },
{ "category": "Rent", "type": "expense", "total": 1600 }
]
}

# Get Monthly Report

URL: /transactions/summary/monthly?month=10&year=2024
Method: GET
Description: Generates a report of expenses and income for a given month.
Response: Returns total income and expenses for the specified mo

## Postman Screen Shots

Kindly Check in screenshots Folder
