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

exports.checkBodyKeys = (allowedKeys, body) => {
    return Object.keys(req.body).every((key) => allowedKeys.includes(key));
};

exports.checkIfColumnExists = (column, table, value) => {
    if (!value) {
        value = "dexterity";
    }
    return db
        .query(format(`SELECT * FROM %I WHERE %I = $1`, table, column), [value])
        .then(({ rows }) => {
            if (rows.length < 1) {
                return exports.rejectForNoContent();
            }
        });
};
