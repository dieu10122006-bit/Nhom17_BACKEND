const db = require("../config/db");

exports.getMatch = (req, res) => {

    const sql = "SELECT * FROM find_tutor_match";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};
exports.getTutorMatching = async (req, res) => {
  try {
    // Sử dụng chính câu lệnh SQL đã chạy thành công trong Workbench của bạn
    const sql = `
      SELECT r.id AS req_id, r.subject_id, ts.tutor_id 
      FROM requests r 
      JOIN tutor_subject ts ON r.subject_id = ts.subject_id
    `;

    const [rows] = await db.promise().query(sql);

    res.json(rows); // Trả về kết quả cho Postman
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// MATCHING BY SUBJECT
exports.getMatchingBySubject = async (req, res) => {
  try {
    const { subjectId } = req.params;
    // Tìm các gia sư dạy môn học này dựa trên bảng tutor_subject
    const sql = `
      SELECT t.id AS tutor_id, t.name AS tutor_name, s.name AS subject_name
      FROM tutor t
      JOIN tutor_subject ts ON t.id = ts.tutor_id
      JOIN subject s ON ts.subject_id = s.id
      WHERE s.id = ?
    `;

    const [rows] = await db.promise().query(sql, [subjectId]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy gia sư nào dạy môn này" });
    }

    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// MATCHING BY LOCATION
// MATCHING BY LOCATION
exports.getMatchingByLocation = async (req, res) => {
  try {
    const { address } = req.params;
    
    // Sử dụng cột 'address' vừa mới thêm vào
    const sql = "SELECT * FROM tutor WHERE address LIKE ?";
    
    // Thêm dấu % để tìm kiếm tương đối (ví dụ gõ 'hanoi' vẫn ra 'Hà Nội')
    const [rows] = await db.promise().query(sql, [`%${address}%`]);

    if (rows.length === 0) {
      return res.status(404).json({ 
        success: false,
        message: `Không tìm thấy gia sư nào ở khu vực: ${address}` 
      });
    }

    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// MATCHING BY TIME SLOT
exports.getMatchingByTime = async (req, res) => {
  try {
    const { slot } = req.params;
    // Tìm gia sư dựa trên khung giờ rảnh (time_slot)
    const sql = `
      SELECT t.id, t.name, a.day_of_week, a.time_slot 
      FROM tutor t
      JOIN availability a ON t.id = a.tutor_id
      WHERE a.time_slot LIKE ?
    `;
    
    const [rows] = await db.promise().query(sql, [`%${slot}%`]);

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy gia sư nào rảnh khung giờ này" });
    }

    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};