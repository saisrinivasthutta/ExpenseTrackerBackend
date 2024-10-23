const db = require("../config/database");

// Create `transactions` table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    description TEXT
  )
`);

const createTransaction = (transaction, callback) => {
  const { type, category, amount, date, description } = transaction;
  db.run(
    `INSERT INTO transactions (type, category, amount, date, description) VALUES (?, ?, ?, ?, ?)`,
    [type, category, amount, date, description],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
};

const getTransactionById = (id, callback) => {
  db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
    if (err) return callback(err);
    callback(null, row);
  });
};

const getAllTransactions = (limit, offset, callback) => {
  db.all(
    `SELECT * FROM transactions LIMIT ? OFFSET ?`,
    [limit, offset],
    (err, rows) => {
      if (err) return callback(err);
      callback(null, rows);
    }
  );
};

const updateTransaction = (id, transaction, callback) => {
  const { type, category, amount, date, description } = transaction;
  db.run(
    `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
    [type, category, amount, date, description, id],
    function (err) {
      if (err) return callback(err);
      callback(null, { changes: this.changes });
    }
  );
};

const deleteTransaction = (id, callback) => {
  db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
    if (err) return callback(err);
    callback(null, { changes: this.changes });
  });
};

module.exports = {
  createTransaction,
  getTransactionById,
  getAllTransactions,
  updateTransaction,
  deleteTransaction,
};
