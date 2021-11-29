exports.formatCategoryData = (categoryData) => {
  return categoryData.map((category) => {
    return [category.slug, category.description];
  });
};

exports.formatData = (unformattedData) => {
  return unformattedData.map((dataObject) => {
    return Object.values(dataObject);
  });
};
