const db = require("../config/db");

const Tutor = {

    getAll: (callback) => {
        db.query("SELECT * FROM tutors", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM tutors WHERE id = ?", [id], callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO tutors SET ?", data, callback);
    },

    update: (id, data, callback) => {
        db.query("UPDATE tutors SET ? WHERE id = ?", [data, id], callback);
    },

    delete: (id, callback) => {
        db.query("DELETE FROM tutors WHERE id = ?", [id], callback);
    }

};

module.exports = Tutor;