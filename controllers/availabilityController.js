const db = require("../config/db");
exports.getAllAvailability = (req, res) => {
    res.json({
        message: "Xem lịch trống của tất cả gia sư.",
        data: []
    });
};

exports.getAvailabilityByTutor = (req, res) => {
    const tutorId = req.params.tutorId;

    res.json({
        message: "Xem lịch trống của gia sư " + tutorId,
        data: []
    });
};

exports.createAvailability = (req, res) => {
    const data = req.body;

    res.json({
        message: "Tạo lịch trống cho gia sư",
        data: data
    });
};

exports.updateAvailability = (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Cập nhật lịch trống " + id
    });
};

exports.deleteAvailability = (req, res) => {
    const id = req.params.id;

    res.json({
        message: "Xóa lịch trống " + id
    });
};
exports.getAvailableToday = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM availability WHERE day = DAYNAME(CURDATE())"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAvailableEvening = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM availability WHERE time >= '18:00'"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAvailableWeekend = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM availability WHERE day IN ('Saturday', 'Sunday')"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getScheduleByDay = async (req, res) => {
  try {
    const { day } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM availability WHERE day = ?",
      [day]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getScheduleByTime = async (req, res) => {
  try {
    const { time } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM availability WHERE time = ?",
      [time]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};