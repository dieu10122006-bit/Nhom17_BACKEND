const db = require("../config/db");

const Request = {

    getAll: (callback) => {
        db.query("SELECT * FROM requests", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM requests WHERE id = ?", [id], callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO requests SET ?", data, callback);
    },

    update: (id, data, callback) => {
        db.query("UPDATE requests SET ? WHERE id = ?", [data, id], callback);
    },

    delete: (id, callback) => {
        db.query("DELETE FROM requests WHERE id = ?", [id], callback);
    }

};

module.exports = Request;