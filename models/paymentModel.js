const db = require("../config/db");

const Payment = {

    getAll: (callback) => {
        db.query("SELECT * FROM payments", callback);
    },

    getById: (id, callback) => {
        db.query("SELECT * FROM payments WHERE id = ?", [id], callback);
    },

    create: (data, callback) => {
        db.query("INSERT INTO payments SET ?", data, callback);
    }

};

module.exports = Payment;