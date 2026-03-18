const db = require("../config/db");

const TutorSubject = {

    getAll: (callback) => {
        db.query("SELECT * FROM tutor_subjects", callback);
    },

    getByTutor: (tutorId, callback) => {
        db.query("SELECT * FROM tutor_subjects WHERE tutor_id = ?", [tutorId], callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO tutor_subjects SET ?", data, callback);
    },

    delete: (id, callback) => {
        db.query("DELETE FROM tutor_subjects WHERE id = ?", [id], callback);
    }

};

module.exports = TutorSubject;