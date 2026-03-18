const db = require("../config/db");

exports.getAllPayments = (req, res) => {
  db.query("SELECT * FROM commission_payment", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

exports.getPaymentById = (req, res) => {
    const id = req.params.id;

    const sql = "SELECT * FROM commission_payment WHERE payment_id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
};
exports.createPayment = (req, res) => {

  const data = req.body;

  db.query(
    "INSERT INTO commission_payment SET ?",
    data,
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.json(result);

    }
  );

};

exports.updatePayment = (req, res) => {

  const id = req.params.id;
  const data = req.body;

  db.query(
    "UPDATE commission_payment SET ? WHERE id=?",
    [data, id],
    (err, result) => {

      if (err) return res.status(500).json(err);

      res.json(result);

    }
  );

};

exports.deletePayment = (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM commission_payment WHERE payment_id=?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Payment deleted successfully"
        });

    });

};