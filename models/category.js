const db = require("../config/database");

// Create `categories` table if it doesn't exist
db.run(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL
  )
`);

const createCategory = (category, callback) => {
  const { name, type } = category;
  db.run(
    `INSERT INTO categories (name, type) VALUES (?, ?)`,
    [name, type],
    function (err) {
      if (err) return callback(err);
      callback(null, { id: this.lastID });
    }
  );
};

const getAllCategories = (callback) => {
  db.all(`SELECT * FROM categories`, (err, rows) => {
    if (err) return callback(err);
    callback(null, rows);
  });
};

module.exports = {
  createCategory,
  getAllCategories,
};
