exports.formatCategoryData = (categoryData) => {
    return categoryData.map((category) => {
        return [category.slug, category.description];
    });
};

exports.formatUserData = (userData) => {
    return userData.map((user) => {
        return [user.username, user.avatar_url, user.name];
    });
};

exports.formatReviewData = (reviewData) => {
    return reviewData.map((review) => {
        return [
            review.title,
            review.review_body,
            review.designer,
            review.review_img_url,
            review.votes,
            review.category,
            review.owner,
            review.created_at,
        ];
    });
};

exports.formatCommentData = (commentData) => {
    return commentData.map((comment) => {
        return [
            comment.author,
            comment.review_id,
            comment.votes,
            comment.created_at,
            comment.body,
        ];
    });
};
