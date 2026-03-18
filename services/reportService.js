const db = require("../config/db");

const reportService = {

    getRevenueReport: (callback) => {

        const sql = `
            SELECT SUM(amount) AS total_revenue
            FROM payments
            WHERE status = 'paid'
        `;

        db.query(sql, callback);
    },

    getTopTutors: (callback) => {

        const sql = `
            SELECT tutors.name, COUNT(assignments.id) AS total_classes
            FROM tutors
            JOIN assignments ON tutors.id = assignments.tutor_id
            GROUP BY tutors.id
            ORDER BY total_classes DESC
            LIMIT 5
        `;

        db.query(sql, callback);
    },

    getClassStatistics: (callback) => {

        const sql = `
            SELECT status, COUNT(*) AS total
            FROM assignments
            GROUP BY status
        `;

        db.query(sql, callback);
    }

};

module.exports = reportService;