const express = require("express");
const router = express.Router();

const availabilityController = require("../controllers/availabilityController");

router.get("/", availabilityController.getAllAvailability);
router.post("/", availabilityController.createAvailability);
router.delete("/:id", availabilityController.deleteAvailability);
router.put("/:id", availabilityController.updateAvailability);

router.get("/today", availabilityController.getAvailableToday);
router.get("/evening", availabilityController.getAvailableEvening);
router.get("/weekend", availabilityController.getAvailableWeekend);
router.get("/schedule/day/:day", availabilityController.getScheduleByDay);
router.get("/schedule/time/:time", availabilityController.getScheduleByTime);

module.exports = router;