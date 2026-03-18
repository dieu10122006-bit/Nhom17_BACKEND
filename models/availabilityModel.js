const db = require("../config/db");

const Availability = {

    getAll: (callback) => {
        db.query("SELECT * FROM availability", callback);
    },

    getByTutor: (tutorId, callback) => {
        db.query("SELECT * FROM availability WHERE tutor_id = ?", [tutorId], callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO availability SET ?", data, callback);
    }

};

module.exports = Availability;