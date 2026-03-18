const db = require("../utils/response");

// Đổi 'db' thành 'response' ở đây
const response = require("../utils/response"); 

exports.getAllTutors = async (_req, res) => {
    const tutors = [
        { id: 1, name: "Gia Sư Chí Hiếu" },
        { id: 2, name: "Gia Sư Nguyễn Văn Cường" }
    ];
    // Bây giờ biến 'response' đã tồn tại và dùng được
    response.success(res, tutors);
};

// ... các hàm khác giữ nguyên ...

exports.getTutorSubjectsByTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;

    // LƯU Ý: Nếu file "../utils/response" của bạn chỉ chứa các hàm trả về 
    // (success, error...) mà không có hàm .query() để gọi vào database, 
    // thì dòng dưới đây sẽ bị lỗi tiếp.
    const [rows] = await response.query(
      "SELECT * FROM tutor_subjects WHERE tutor_id = ?",
      [tutorId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTutor = async (req, res) => {

    const data = req.body;

    response.created(res, data, "Gia sư đã được tạo");

};
exports.getTutorById = async (req, res) => {

    const id = req.params.id;

    const tutor = {
        id: id,
        name: "Gia Sư " + id
    };

    response.success(res, tutor);

};

exports.updateTutor = async (req, res) => {

    const id = req.params.id;
    const data = req.body;

    response.success(res, { id, ...data }, "Gia sư đã được cập nhật");

};

exports.deleteTutor = async (req, res) => {

    const id = req.params.id;

    response.success(res, { id }, "Gia sư đã được xóa");

};
exports.getTutorBySubject = async (req, res) => {
    const subjectId = req.params.id;

    // demo fake data (vì bạn chưa dùng DB ở file này)
    const tutors = [
        { id: 1, name: "Gia Sư Bình", subject_id: 2 },
        { id: 2, name: "Gia Sư Hùng", subject_id: 3 }
    ];

    const result = tutors.filter(t => t.subject_id == subjectId);

    if (result.length === 0) {
        return response.error(res, "Không tìm thấy gia sư nào", 404);
    }

    response.success(res, result);
};
exports.getTutorSubjectsByTutor = async (req, res) => {
  try {
    const { tutorId } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM tutor_subjects WHERE tutor_id = ?",
      [tutorId]
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};