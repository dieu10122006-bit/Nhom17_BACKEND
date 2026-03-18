const db = require("../config/db");

const Subject = {

    getAll: (callback) => {
        db.query("SELECT * FROM subjects", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM subjects WHERE id = ?", [id], callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO subjects SET ?", data, callback);
    },

    update: (id, data, callback) => {
        db.query("UPDATE subjects SET ? WHERE id = ?", [data, id], callback);
    },

    delete: (id, callback) => {
        db.query("DELETE FROM subjects WHERE id = ?", [id], callback);
    }

};

module.exports = Subject;