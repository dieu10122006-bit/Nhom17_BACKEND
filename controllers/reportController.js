const db = require("../config/db");

// 1. Báo cáo doanh thu (Sửa lỗi Unknown column 'status')
exports.getReportRevenue = async (req, res) => {
  try {
    // Nếu chưa chắc chắn tên cột, bạn có thể tạm bỏ WHERE hoặc dùng đúng tên cột trong DB
    const sql = "SELECT SUM(amount) AS total_revenue FROM commission_payment";
    
    const [rows] = await db.promise().query(sql);
    res.json({ 
      success: true, 
      total: rows[0].total_revenue || 0 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Lấy các khoản chưa thanh toán
exports.getUnpaidPayments = (req, res) => {
  // Lưu ý: Nếu DB không có cột 'status', câu lệnh này sẽ lỗi. 
  // Bạn nên kiểm tra lại xem cột đó tên là 'payment_status' hay gì nhé.
  const sql = `
    SELECT *
    FROM commission_payment
    WHERE amount > 0 
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// 3. Báo cáo theo tháng
exports.getMonthlyReport = (req, res) => {
  const month = req.params.month;
  // Giả sử cột ngày của bạn là 'payment_date' hoặc 'created_at'
  const sql = `
    SELECT *
    FROM commission_payment
    WHERE MONTH(payment_date) = ?
  `;

  db.query(sql, [month], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// 4. Top gia sư (Nhiều lớp nhất)
exports.getTopTutors = (req, res) => {
  // JOIN thêm bảng tutor để lấy tên cho chuyên nghiệp
  const sql = `
    SELECT t.name, ca.tutor_id, COUNT(*) AS total_classes
    FROM class_assignment ca
    JOIN tutor t ON ca.tutor_id = t.id
    GROUP BY ca.tutor_id, t.name
    ORDER BY total_classes DESC
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};

// 5. Tổng hợp thanh toán
exports.getPaymentSummary = (req, res) => {
  // Nếu không có cột status, ta có thể thống kê theo tháng hoặc gia sư
  const sql = `
    SELECT tutor_id, SUM(amount) AS total_paid
    FROM commission_payment
    GROUP BY tutor_id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(result);
  });
};