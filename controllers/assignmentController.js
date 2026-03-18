const db = require("../config/db");

exports.getAllAssignments = (req, res) => {
  db.query("SELECT * FROM class_assignment", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getAssignmentById = (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM class_assignment WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.createAssignment = (req, res) => {

  if (!req.body) {
    return res.status(400).json({
      message: "Body is missing"
    });
  }

  const { class_id, tutor_id, status } = req.body;

  const sql = `
  INSERT INTO class_assignment (class_id, tutor_id, status)
  VALUES (?, ?, ?)
  `;

  db.query(sql, [class_id, tutor_id, status], (err, result) => {

    if (err) return res.status(500).json(err);

    res.json({
      message: "Assignment created",
      id: result.insertId
    });

  });

};

exports.updateAssignment = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  db.query(
    "UPDATE class_assignment SET ? WHERE id=?",
    [data, id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};

exports.deleteAssignment = (req, res) => {
  const id = req.params.id;

  db.query(
    "DELETE FROM class_assignment WHERE id=?",
    [id],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json(result);
    }
  );
};
exports.matchTutor = (req, res) => {

  const subject = req.params.subject;

  const sql = `
  SELECT *
  FROM tutor
  WHERE subject = ?
  `;

  db.query(sql, [subject], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);

  });

};
exports.assignTutor = (req, res) => {

  const class_id = req.body?.class_id;
  const tutor_id = req.body?.tutor_id;

  if (!class_id || !tutor_id) {
    return res.status(400).json({
      message: "class_id and tutor_id are required"
    });
  }

  const sql = `
  INSERT INTO class_assignment(class_id,tutor_id,assigned_date,status)
  VALUES (?, ?, NOW(),'ASSIGNED')
  `;

  db.query(sql, [class_id, tutor_id], (err, result) => {

    if (err) {
      return res.status(500).json(err);
    }

    res.json({
      message: "Tutor assigned successfully"
    });

  });

};
exports.getAssignmentsByStatus = (req, res) => {

  const status = req.params.status;

  const sql = `
  SELECT * FROM class_assignment
  WHERE status = ?
  `;

  db.query(sql, [status], (err, result) => {

    if (err) return res.status(500).json(err);

    res.json(result);

  });

};