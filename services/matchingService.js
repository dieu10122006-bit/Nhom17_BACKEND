const Tutor = require("../models/tutorModel");

const matchingService = {

    findTutors: (subject, area, callback) => {

        const sql = `
            SELECT tutors.*
            FROM tutors
            JOIN tutor_subjects ON tutors.id = tutor_subjects.tutor_id
            JOIN subjects ON tutor_subjects.subject_id = subjects.id
            WHERE subjects.name = ? AND tutors.area = ?
        `;

        Tutor.db.query(sql, [subject, area], callback);
    },

    matchTutorToRequest: (requestId, tutorId, callback) => {

        const sql = `
            INSERT INTO assignments (request_id, tutor_id, status)
            VALUES (?, ?, 'assigned')
        `;

        Tutor.db.query(sql, [requestId, tutorId], callback);
    }

};

module.exports = matchingService;