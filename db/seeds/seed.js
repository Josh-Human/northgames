const db = require("../connection.js");
const { dropTables, createTables, insertData } = require("./manage-tables.js");

const seed = (data, next) => {
    return dropTables()
        .then(() => {
            return createTables();
        })
        .then(() => {
            return insertData(data);
        })
        .catch(next);
};

module.exports = seed;
