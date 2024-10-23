const db = require("../config/database");

exports.getSummary = (req, res) => {
  db.all(
    `
        SELECT 
            SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS totalIncome,
            SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS totalExpenses,
            (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS balance
        FROM transactions
    `,
    (err, rows) => {
      if (err)
        return res.status(500).send({ message: "Error retrieving summary" });
      res.send(rows[0]);
    }
  );
};

exports.getMonthlyReport = (req, res) => {
  const { month, year } = req.query;

  db.all(
    `
        SELECT category, type, SUM(amount) AS total
        FROM transactions
        WHERE strftime('%m', date) = ? AND strftime('%Y', date) = ?
        GROUP BY category, type
    `,
    [month, year],
    (err, rows) => {
      if (err)
        return res
          .status(500)
          .send({ message: "Error retrieving monthly report" });
      res.send(rows);
    }
  );
};

// Get total income and expenses by category
exports.getSummaryByCategory = (req, res) => {
  const sql = `
        SELECT categories.name AS category, 
               categories.type, 
               SUM(transactions.amount) AS total
        FROM transactions
        INNER JOIN categories 
        ON transactions.category = categories.id
        GROUP BY categories.name, categories.type
    `;

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    const summary = rows.map((row) => ({
      category: row.category,
      type: row.type,
      total: row.total,
    }));
    console.log(rows);
    res.json({ summary });
  });
};
