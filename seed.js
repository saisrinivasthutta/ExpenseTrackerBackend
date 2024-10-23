const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./db/expense-tracker.db", (err) => {
  if (err) {
    console.error("Error connecting to the database:", err.message);
    return;
  }
  console.log("Connected to the SQLite database.");
});

// Insert seed data into the categories table
const seedCategories = () => {
  const categories = [
    { name: "Salary", type: "income" },
    { name: "Freelancing", type: "income" },
    { name: "Investments", type: "income" },
    { name: "Rent", type: "expense" },
    { name: "Groceries", type: "expense" },
    { name: "Utilities", type: "expense" },
    { name: "Dining", type: "expense" },
    { name: "Entertainment", type: "expense" },
    { name: "Travel", type: "expense" },
    { name: "Medical", type: "expense" },
  ];

  categories.forEach((category) => {
    db.run(
      `INSERT INTO categories (name, type) VALUES (?, ?)`,
      [category.name, category.type],
      (err) => {
        if (err) {
          console.error("Error inserting into categories table:", err.message);
          return;
        }
        console.log(`Inserted ${category.name} into categories table.`);
      }
    );
  });
};

const seedTransactions = () => {
  const transactions = [
    {
      type: "income",
      category: 1,
      amount: 5000,
      date: "2024-10-01",
      description: "Salary for October",
    }, // Salary
    {
      type: "income",
      category: 2,
      amount: 2000,
      date: "2024-10-05",
      description: "Freelancing project",
    }, // Freelancing
    {
      type: "expense",
      category: 4,
      amount: 1500,
      date: "2024-10-03",
      description: "October rent",
    }, // Rent
    {
      type: "expense",
      category: 5,
      amount: 300,
      date: "2024-10-07",
      description: "Groceries shopping",
    }, // Groceries
    {
      type: "expense",
      category: 6,
      amount: 120,
      date: "2024-10-08",
      description: "Electricity bill",
    }, // Utilities
    {
      type: "expense",
      category: 7,
      amount: 60,
      date: "2024-10-10",
      description: "Dinner at restaurant",
    }, // Dining
    {
      type: "expense",
      category: 8,
      amount: 200,
      date: "2024-10-12",
      description: "Movie and entertainment",
    }, // Entertainment
    {
      type: "expense",
      category: 9,
      amount: 800,
      date: "2024-10-15",
      description: "Flight tickets",
    }, // Travel
    {
      type: "expense",
      category: 10,
      amount: 400,
      date: "2024-10-18",
      description: "Medical checkup",
    }, // Medical
    {
      type: "income",
      category: 3,
      amount: 1000,
      date: "2024-10-20",
      description: "Investment returns",
    }, // Investments
  ];

  transactions.forEach((transaction) => {
    db.run(
      `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
      [
        transaction.type,
        transaction.category,
        transaction.amount,
        transaction.date,
        transaction.description,
      ],
      (err) => {
        if (err) {
          console.error(
            "Error inserting into transactions table:",
            err.message
          );
          return;
        }
        console.log(`Inserted transaction: ${transaction.description}`);
      }
    );
  });
};

db.run(
  `
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        type TEXT NOT NULL
    )
`,
  (err) => {
    if (err) {
      console.error("Error creating categories table:", err.message);
      return;
    }
    console.log("Categories table created.");

    seedCategories();
    seedTransactions();
  }
);

db.close((err) => {
  if (err) {
    console.error("Error closing the database:", err.message);
  }
  console.log("Closed the database connection.");
});
