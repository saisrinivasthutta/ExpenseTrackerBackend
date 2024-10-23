const express = require("express");
const router = express.Router();
const summaryController = require("../controllers/summaryController");

router.get("/summary", summaryController.getSummary);
router.get("/summary/monthly", summaryController.getMonthlyReport);
router.get("/summary/category", summaryController.getSummaryByCategory);

module.exports = router;
