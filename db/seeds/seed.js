const db = require("../connection.js");
const { dropTables, createTables } = require("./manage-tables.js");

//// if exists drop
// TODO: Make table management functions.
// TODO: Make drop async function.
// TODO: Create categories.
// TODO: Create user.
// TODO: create review.
// TODO: Create comment.

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return dropTables().then(() => {
    return createTables;
  });

  // 2. insert data
};

module.exports = seed;
