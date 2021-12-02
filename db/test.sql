\c nc_games_test;

SELECT reviews.review_id, title, review_body, designer, 
review_img_url, reviews.votes, category, owner, reviews.created_at,
COUNT(comments.comment_id) AS comment_count
FROM REVIEWS
FULL OUTER JOIN comments ON reviews.review_id = comments.review_id
WHERE category = ''
GROUP BY reviews.review_id
ORDER BY reviews.created_at DESC;