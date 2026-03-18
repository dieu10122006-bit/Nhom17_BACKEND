const express = require("express");
const router = express.Router();
const assignmentController = require("../controllers/assignmentController");

// CRUD assignments
router.get("/", assignmentController.getAllAssignments);
router.get("/:id", assignmentController.getAssignmentById);
router.post("/", assignmentController.createAssignment);
router.put("/:id", assignmentController.updateAssignment);
router.delete("/:id", assignmentController.deleteAssignment);

// Matching tutor
router.get("/match/:subject", assignmentController.matchTutor);

// Assign tutor
router.post("/assign", assignmentController.assignTutor);

// Class status
router.get("/status/:status", assignmentController.getAssignmentsByStatus);

module.exports = router;