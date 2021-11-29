const db = require("../connection.js");
const format = require("pg-format");
const {
    formatCategoryData,
    formatUserData,
    formatCommentData,
    formatReviewData,
} = require("../utils/utils.js");

exports.dropTables = () => {
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
        });
};

exports.createTables = () => {
    return db
        .query(
            `CREATE TABLE categories (
        slug VARCHAR(150) PRIMARY KEY,
        description TEXT NOT NULL
    );`
        )
        .then(() => {
            return db.query(`CREATE TABLE users (
        username VARCHAR(150) PRIMARY KEY,
        avatar_url TEXT NOT NULL,
        name VARCHAR(150) NOT NULL
      );`);
        })
        .then(() => {
            return db.query(`CREATE TABLE reviews (
          review_id SERIAL PRIMARY KEY,
          title VARCHAR(150) NOT NULL,
          review_body TEXT NOT NULL,
          designer VARCHAR(150) NOT NULL,
          review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
          votes INT DEFAULT 0,
          category VARCHAR(150) REFERENCES categories(slug),
          owner VARCHAR(150) REFERENCES users(username),
          created_at DATE NOT NULL
        );`);
        })
        .then(() => {
            console.log("Test");

            return db.query(`CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          author VARCHAR(150) REFERENCES users(username),
          review_id INT REFERENCES reviews(review_id) NOT NULL,
          votes INT DEFAULT 0,
          created_at DATE NOT NULL,
          body TEXT NOT NULL
        );`);
        });
};

exports.insertData = (data) => {
    const { categoryData, commentData, reviewData, userData } = data;
    const formattedCategoryData = formatCategoryData(categoryData);
    const formattedCommentData = formatCommentData(commentData);
    const formattedReviewData = formatReviewData(reviewData);
    const formattedUserData = formatUserData(userData);
    return db
        .query(
            format(
                `INSERT INTO categories(slug, description)
                VALUES %L;`,
                formattedCategoryData
            )
        )
        .then(() => {
            return db.query(
                format(
                    `INSERT INTO users(username,avatar_url, name)
                    VALUES %L;`,
                    formattedUserData
                )
            );
        })
        .then(() => {
            return db.query(
                format(
                    `INSERT INTO reviews(title, review_body, designer, review_img_url, votes, category, owner, created_at)
                    VALUES %L
                    RETURNING *;`,
                    formattedReviewData
                )
            );
        })
        .then(() => {
            return db.query(
                format(
                    `INSERT INTO comments(author, review_id, votes, created_at, body)
                    VALUES %L;`,
                    formattedCommentData
                )
            );
        });
};
