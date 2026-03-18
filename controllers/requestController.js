const db = require("../config/db");

// GET ALL
exports.getAllRequests = async (req, res) => {
  try {
    // Thêm .promise() trước .query
    const [rows] = await db.promise().query("SELECT * FROM requests");

    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET BY ID
exports.getRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await db.promise().query(
      "SELECT * FROM requests WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Request not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE
// CREATE
exports.createRequest = async (req, res) => {
  try {
    const { student_id, subject_id, level, schedule, status } = req.body;

    // Kiểm tra tên bảng chính xác trong Workbench của bạn là gì (request hay requests)
    // Giả sử tên bảng là 'requests'
    const sql = "INSERT INTO requests (student_id, subject_id, level, schedule, status) VALUES (?, ?, ?, ?, ?)";

    const [result] = await db.promise().query(sql, [
      student_id, 
      subject_id, 
      level, 
      schedule, 
      status || 'pending'
    ]);

    res.json({
      success: true,
      message: "Tạo yêu cầu thành công!",
      id: result.insertId
    });
  } catch (err) {
    // In ra lỗi chi tiết để biết chính xác bảng nào đang thiếu
    res.status(500).json({ error: err.message });
  }
};
// UPDATE
// UPDATE REQUEST
exports.updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    // Lấy đúng các trường có trong bảng requests của bạn
    const { subject_id, level, schedule, status } = req.body;

    // Đảm bảo tên bảng là 'requests' và tên cột chính xác
    const sql = "UPDATE requests SET subject_id = ?, level = ?, schedule = ?, status = ? WHERE id = ?";

    await db.promise().query(
      sql,
      [subject_id, level, schedule, status, id]
    );

    res.json({ success: true, message: "Cập nhật yêu cầu thành công!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// DELETE
exports.deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    await db.promise().query("DELETE FROM requests WHERE id = ?", [id]);

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// GET REQUESTS BY STUDENT ID
exports.getRequestsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    // Nhớ dùng đúng tên bảng 'requests' có chữ s như trong Workbench của bạn
    const [rows] = await db.promise().query(
      "SELECT * FROM requests WHERE student_id = ?",
      [studentId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Không tìm thấy yêu cầu nào cho học sinh này" });
    }

    res.json({
      success: true,
      data: rows
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};