const Transaction = require("../models/transaction");

exports.addTransaction = (req, res) => {
  const newTransaction = req.body;
  Transaction.createTransaction(newTransaction, (err, result) => {
    if (err)
      return res.status(500).send({ message: "Error adding transaction" });
    res
      .status(201)
      .send({ message: "Transaction added", transactionId: result.id });
  });
};

exports.getTransaction = (req, res) => {
  const { id } = req.params;
  Transaction.getTransactionById(id, (err, transaction) => {
    if (err)
      return res.status(500).send({ message: "Error retrieving transaction" });
    if (!transaction)
      return res.status(404).send({ message: "Transaction not found" });
    res.send(transaction);
  });
};

exports.getAllTransactions = (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Pagination limit (default 10)
  const offset = parseInt(req.query.offset) || 0; // Pagination offset (default 0)
  Transaction.getAllTransactions(limit, offset, (err, transactions) => {
    if (err)
      return res.status(500).send({ message: "Error retrieving transactions" });
    res.send(transactions);
  });
};

exports.updateTransaction = (req, res) => {
  const { id } = req.params;
  const updatedTransaction = req.body;
  Transaction.updateTransaction(id, updatedTransaction, (err, result) => {
    if (err)
      return res.status(500).send({ message: "Error updating transaction" });
    if (result.changes === 0)
      return res.status(404).send({ message: "Transaction not found" });
    res.send({ message: "Transaction updated" });
  });
};

exports.deleteTransaction = (req, res) => {
  const { id } = req.params;
  Transaction.deleteTransaction(id, (err, result) => {
    if (err)
      return res.status(500).send({ message: "Error deleting transaction" });
    if (result.changes === 0)
      return res.status(404).send({ message: "Transaction not found" });
    res.send({ message: "Transaction deleted" });
  });
};
