const express = require("express");
const router = express.Router();

const tutorSubjectController = require("../controllers/tutorSubjectController");

router.get("/", tutorSubjectController.getAllTutorSubjects);
router.post("/", tutorSubjectController.addTutorSubject);
router.delete("/:id", tutorSubjectController.deleteTutorSubject);

module.exports = router;