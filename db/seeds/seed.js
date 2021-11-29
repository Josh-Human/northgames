const db = require("../connection.js");
const { dropTables, createTables, insertData } = require("./manage-tables.js");

// TODO: Make drop async function.

const seed = (data) => {
  return dropTables()
    .then(() => {
      return createTables();
    })
    .then(() => {
      return insertData(data);
    });

  // 2. insert data
};

module.exports = seed;
