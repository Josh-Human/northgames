const db = require("../db/connection.js");
const format = require("pg-format");

exports.selectUsers = () => {
    return db.query(`SELECT username FROM users;`).then(({ rows }) => {
        return rows;
    });
};

exports.selectUserById = (username) => {
    return db
        .query(
            format(
                `SELECT * FROM users
                WHERE username LIKE '%I';`,
                username
            )
        )
        .then(({ rows }) => {
            return rows;
        });
};
