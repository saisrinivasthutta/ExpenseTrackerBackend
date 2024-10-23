const express = require("express");
const app = express();
const transactionRoutes = require("./routes/transactionRoutes");
const summaryRoutes = require("./routes/summaryRoutes");

// Middleware
app.use(express.json());

// Routes
app.use(transactionRoutes);
app.use(summaryRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Server setup
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
