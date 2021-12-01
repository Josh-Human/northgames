const db = require("../db/connection.js");
const format = require("pg-format");

exports.checkIfColumnExists = (column, table, value) => {
    if (!value) {
        value = "dexterity";
    }
    return db
        .query(format(`SELECT * FROM %I WHERE %I = $1`, table, column), [value])
        .then((result) => {
            if (result.rows.length < 1) {
                return Promise.reject({
                    status: 404,
                    msg: "Value does not exist.",
                });
            }
        });
};

exports.rejectForNoContent = (rows) => {
    if (rows < 1) {
        return Promise.reject({
            status: 404,
            msg: "Value does not exist",
        });
    }
};
