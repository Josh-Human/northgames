const db = require("../db/connection.js");
const format = require("pg-format");

exports.rejectForNoContent = () => {
    return Promise.reject({
        status: 404,
        msg: "Value does not exist",
    });
};

exports.throwBadRequest = (msg) => {
    return Promise.reject({ status: 400, msg: msg });
};

exports.checkDataValid = (allowedValues, data) => {
    return Object.keys(data).every((key) => allowedValues.includes(key));
};

exports.checkIfColumnExists = (column, table, value) => {
    return db
        .query(
            format(`SELECT * FROM %I WHERE %I = '%s';`, table, column, value)
        )
        .then(({ rows }) => {
            if (rows.length < 1) {
                return exports.rejectForNoContent();
            }
        });
};
