const db = require("../config/db");
exports.getAllTutorSubjects = (req, res) => {
    res.json({
        message: "Get all tutor subjects",
        data: []
    });
};

exports.getTutorSubjectsByTutor = (req, res) => {
    const tutorId = req.params.tutorId;

    res.json({
        message: "Get subjects for tutor " + tutorId,
        data: []
    });
};

exports.addTutorSubject = (req, res) => {
    const data = req.body;

    res.json({
        message: "Add subject for tutor",
        data: data
    });
};

exports.deleteTutorSubject = async (req, res) => {
  try {
    const id = req.params.id;

    const [result] = await db.query(
      "DELETE FROM tutor_subject WHERE id = ?",
      [id]
    );

    res.json({
      message: "Deleted successfully",
      affectedRows: result.affectedRows
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};