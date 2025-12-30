export function parseAndBuildQuery(req) {
  const page = parseInt(req.query.page || "1");
  const limit = parseInt(req.query.limit || "10");

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    search: req.query.search || null,
    status: req.query.status || null,
    category: req.query.category || null,
    tag: req.query.tag || null,
  };
}

export function applyCategoryTagFilters(items, filters = {}) {
  let filtered = items;

  if (filters.category) {
    filtered = filtered.filter(
      (item) =>
        Array.isArray(item.categories) &&
        item.categories.includes(filters.category)
    );
  }

  return filtered;
}
