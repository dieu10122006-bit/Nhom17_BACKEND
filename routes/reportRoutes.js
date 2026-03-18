const express = require("express");
const router = express.Router();
const reportController = require("../controllers/reportController");

router.get("/revenue", reportController.getReportRevenue);
router.get("/unpaid", reportController.getUnpaidPayments);
router.get("/month/:month", reportController.getMonthlyReport);
router.get("/top-tutors", reportController.getTopTutors);
router.get("/payment-summary", reportController.getPaymentSummary);


module.exports = router;