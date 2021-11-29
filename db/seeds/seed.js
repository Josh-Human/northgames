const db = require("../connection.js");

//// if exists drop
// TODO: Make drop async function.
// TODO: Create categories.
// TODO: Create user.
// TODO: create review.
// TODO: Create comment.

const seed = (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  return db
    .query(`DROP TABLE IF EXISTS comments;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS reviews;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS users;`);
    })
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS categories;`);
    })
    .then(() => {
      return db.query(`CREATE TABLE categories (
        slug VARCHAR(50) PRIMARY KEY,
        description VARCHAR NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE users (
      username VARCHAR(50) PRIMARY KEY,
      avatar_url TEXT NOT NULL,
      name VARCHAR(50) NOT NULL
    );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE reviews (
        review_id SERIAL PRIMARY KEY,
        title VARCHAR(100) NOT NULL,
        review_body TEXT NOT NULL,
        designer VARCHAR(100) NOT NULL,
        review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category VARCHAR(50) REFERENCES categories(slug),
        owner VARCHAR(50) REFERENCES users(username),
        created_at DATE NOT NULL
      );`);
    })
    .then(() => {
      return db.query(`CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        author VARCHAR(50) NOT NULL,
        review_body TEXT NOT NULL,
        designer VARCHAR(100) NOT NULL,
        review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
        votes INT DEFAULT 0,
        category VARCHAR(50) REFERENCES categories(slug),
        owner VARCHAR(50) REFERENCES users(username),
        created_at DATE NOT NULL
      );`);
    });

  // 2. insert data
};

module.exports = seed;
