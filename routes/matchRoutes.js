const express = require("express");
const router = express.Router();

const matchController = require("../controllers/matchController");

router.get("/", matchController.getMatch);
router.get("/subject/:subjectId", matchController.getMatchingBySubject);
router.get("/tutor", matchController.getTutorMatching);
// Khai báo tham số :address để nhận giá trị 'hanoi' từ URL
router.get("/location/:address", matchController.getMatchingByLocation);
router.get("/time/:slot", matchController.getMatchingByTime);
module.exports = router;