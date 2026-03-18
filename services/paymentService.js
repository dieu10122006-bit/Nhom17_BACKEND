const Payment = require("../models/paymentModel");

const paymentService = {

    createPayment: (data, callback) => {

        const paymentData = {
            assignment_id: data.assignment_id,
            amount: data.amount,
            payment_date: new Date(),
            status: "paid"
        };

        Payment.create(paymentData, callback);
    },

    getPaymentsByStudent: (studentId, callback) => {

        const sql = `
            SELECT payments.*
            FROM payments
            JOIN assignments ON payments.assignment_id = assignments.id
            JOIN requests ON assignments.request_id = requests.id
            WHERE requests.student_id = ?
        `;

        Payment.db.query(sql, [studentId], callback);
    }

};

module.exports = paymentService;