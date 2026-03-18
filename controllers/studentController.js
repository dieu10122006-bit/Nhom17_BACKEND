const db = require("../config/db");

exports.getAllStudents = (req, res) => {

    const sql = "SELECT * FROM student";

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

exports.getStudentById = (req, res) => {

    const sql = "SELECT * FROM student WHERE id = ?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(result[0]); // ✅ lấy object thay vì mảng
    });

};

exports.createStudent = (req, res) => {

    const { name, email, phone } = req.body;

    const sql = "INSERT INTO student(name,email,phone) VALUES (?,?,?)";

    db.query(sql, [name, email, phone], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({ message: "Student created" });

    });

};

exports.updateStudent = (req, res) => {
    // Kiểm tra nếu req.body không tồn tại
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "Dữ liệu gửi lên không hợp lệ hoặc trống" });
    }

    const { name, email, phone } = req.body;
    const sql = "UPDATE student SET name=?, email=?, phone=? WHERE id=?";

    db.query(sql, [name, email, phone, req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json({ message: "Student updated" });
    });
};
exports.deleteStudent = (req, res) => {

    const sql = "DELETE FROM student WHERE id=?";

    db.query(sql, [req.params.id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({ message: "Student deleted" });

    });

};
exports.searchStudent = (req, res) => {
    const { name } = req.query;

    const sql = "SELECT * FROM student WHERE name LIKE ?";

    db.query(sql, [`%${name}%`], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.json(result);
    });
};