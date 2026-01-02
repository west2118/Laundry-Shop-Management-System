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

export const buildAovPipeline = (start, end) => [
  {
    $match: {
      paymentStatus: "paid",
      orderStatus: "picked-up",
      createdAt: {
        $gte: start,
        $lt: end,
      },
    },
  },
  {
    $group: {
      _id: null,
      totalRevenue: { $sum: "$totalAmount" },
      totalOrders: { $sum: 1 },
    },
  },
  {
    $project: {
      _id: 0,
      aov: {
        $round: [
          {
            $cond: [
              { $eq: ["$totalOrders", 0] },
              0,
              { $divide: ["$totalRevenue", "$totalOrders"] },
            ],
          },
          2,
        ],
      },
    },
  },
];
