import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";
import {
  fillWeekDays,
  fillYearMonths,
  getMonthlyRange,
  getTodayRange,
  getWeekRange,
  getYearlyRange,
} from "../utils/date.utils.js";
import { buildAovPipeline, parseAndBuildQuery } from "../utils/query.utils.js";

export const postOrder = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      customer,
      items,
      itemDescription,
      specialInstructions,
      discount,
      totalAmount,
      paymentStatus,
    } = req.body;

    let customerId;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    if (typeof customer === "object") {
      const newCustomer = await Customer.create({
        fullName: customer.fullName,
        email: customer.email,
        contact: customer.contact,
      });

      customerId = newCustomer._id;
    } else {
      customerId = customer;
    }

    const newOrder = await Order.create({
      customer: customerId,
      items,
      itemDescription,
      specialInstructions,
      discount,
      totalAmount,
      paymentStatus,
    });

    res
      .status(200)
      .json({ message: "New order created successfully!", newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const { page, limit, skip, search, status } = parseAndBuildQuery(req);

    const query = {};
    if (search) {
      query.$or = [
        { paymentStatus: { $regex: search, $options: "i" } },
        { orderStatus: { $regex: search, $options: "i" } },
      ];
    }

    if (status) {
      query.orderStatus = status;
    }

    const total = await Order.countDocuments(query);
    const orders = await Order.find(query)
      .skip(skip)
      .limit(limit)
      .populate("customer", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      orders,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllOrdersBoard = async (req, res) => {
  try {
    const { uid } = req.user;
    const { start, end } = getTodayRange();

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const orders = await Order.find({
      $or: [
        {
          createdAt: {
            $gte: start,
            $lt: end,
          },
        },

        {
          orderStatus: { $in: ["pending", "in-process", "ready"] },
        },
      ],
    })
      .populate("customer", "fullName email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const putOrder = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;
    const { payload } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({ message: "Order didn't exist" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { ...payload },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Order updated successfully!", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({ message: "Order didn't exist" });
    }

    await Order.findByIdAndDelete(id);

    res.status(200).json({ message: "Order deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;
    const { orderStatus } = req.body;

    const allowedStatus = ["pending", "in-process", "ready", "picked-up"];

    if (!allowedStatus.includes(orderStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({ message: "Order didn't exist" });
    }

    const updateData = { orderStatus };

    if (orderStatus === "picked-up" && order.paymentStatus === "pending") {
      updateData.paymentStatus = "paid";
    }

    const updatedOrder = await Order.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res
      .status(200)
      .json({ message: "Order status updated successfully!", updatedOrder });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Dashboard Page
export const getWeeklyServiceTypes = async (req, res) => {
  try {
    const { monday, sunday } = getWeekRange();

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: monday,
            $lt: sunday,
          },
          paymentStatus: "paid",
        },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.serviceName",
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          name: "$_id",
          total: 1,
        },
      },
      {
        $sort: { total: -1 },
      },
    ]);

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

export const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate("customer", "fullName")
      .limit(5)
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

export const getWeeklyOrderStatus = async (req, res) => {
  try {
    const { monday, sunday } = getWeekRange();

    const stats = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: monday,
            $lt: sunday,
          },
          paymentStatus: "paid",
        },
      },
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 },
        },
      },
    ]);

    const result = {
      totalOrders: 0,
      pending: 0,
      ready: 0,
      pickedUp: 0,
    };

    stats.forEach((item) => {
      result.totalOrders += item.count;

      if (item._id === "pending") result.pending = item.count;
      if (item._id === "ready") result.ready = item.count;
      if (item._id === "in-progress") result.ready = item.count;
      if (item._id === "picked-up") result.pickedUp = item.count;
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

export const getOrdersStatsData = async (req, res) => {
  try {
    const { start, end } = getTodayRange();

    const [data] = await Order.aggregate([
      {
        $facet: {
          totalOrders: [{ $count: "count" }],

          todayOrders: [
            {
              $match: {
                createdAt: { $gte: start, $lt: end },
              },
            },
            { $count: "count" },
          ],

          revenueToday: [
            {
              $match: {
                createdAt: { $gte: start, $lt: end },
                paymentStatus: "paid",
              },
            },
            {
              $group: {
                _id: null,
                revenue: { $sum: "$totalAmount" },
              },
            },
          ],

          customers: [
            { $group: { _id: "$customer" } },
            { $group: { _id: null, totalCustomers: { $sum: 1 } } },
          ],
        },
      },
    ]);

    res.status(200).json({
      totalOrders: data.totalOrders[0]?.count || 0,
      todayOrders: data.todayOrders[0]?.count || 0,
      revenueToday: data.revenueToday[0]?.revenue || 0,
      totalCustomers: data.customers[0]?.totalCustomers || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

// Report Page
export const getReportStatsData = async (req, res) => {
  try {
    const { start, end } = getTodayRange();
    const { startOfMonth, endOfMonth, startOfLastMonth, endOfLastMonth } =
      getMonthlyRange();

    const [data] = await Order.aggregate([
      {
        $facet: {
          totalRevenue: [
            {
              $match: {
                paymentStatus: "paid",
                orderStatus: "picked-up",
              },
            },
            {
              $group: {
                _id: null,
                revenue: { $sum: "$totalAmount" },
              },
            },
          ],

          totalOrders: [
            {
              $match: {
                paymentStatus: "paid",
                orderStatus: "picked-up",
              },
            },
            { $count: "count" },
          ],

          revenueToday: [
            {
              $match: {
                createdAt: { $gte: start, $lt: end },
                paymentStatus: "paid",
              },
            },
            {
              $group: {
                _id: null,
                revenue: { $sum: "$totalAmount" },
              },
            },
          ],

          totalCustomers: [
            {
              $group: {
                _id: "$customer",
              },
            },
            {
              $group: {
                _id: null,
                totalCustomers: { $sum: 1 },
              },
            },
          ],

          thisMonthRevenue: [
            {
              $match: {
                orderStatus: "picked-up",
                paymentStatus: "paid",
                createdAt: { $gte: startOfMonth, $lt: endOfMonth },
              },
            },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
              },
            },
          ],

          lastMonthRevenue: [
            {
              $match: {
                orderStatus: "picked-up",
                paymentStatus: "paid",
                createdAt: { $gte: startOfLastMonth, $lt: endOfLastMonth },
              },
            },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
              },
            },
          ],

          repeatCustomers: [
            { $group: { _id: "$customer", orders: { $sum: 1 } } },
            { $match: { orders: { $gt: 1 } } },
            { $count: "repeatCustomers" },
          ],
        },
      },
    ]);

    const repeatRate =
      (data.repeatCustomers[0]?.repeatCustomers /
        data.totalCustomers[0]?.totalCustomers) *
      100;

    const aovData = data.totalRevenue[0]?.revenue / data.totalOrders[0]?.count;

    const monthlyGrowth =
      ((data.thisMonthRevenue[0]?.totalRevenue -
        data.lastMonthRevenue[0]?.totalRevenue) /
        data.lastMonthRevenue[0]?.totalRevenue) *
      100;

    res.status(200).json({
      totalRevenue: data.totalRevenue[0]?.revenue || 0,
      totalOrders: data.totalOrders[0]?.count || 0,
      revenueToday: data.revenueToday[0]?.revenue || 0,
      totalCustomers: data.totalCustomers[0]?.totalCustomers || 0,
      repeatRate,
      aovData,
      monthlyGrowth,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

export const getMonthlySales = async (req, res) => {
  try {
    const { uid } = req.user;

    const { start, end } = getYearlyRange();

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const rawData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lt: end,
          },
          paymentStatus: "paid",
          orderStatus: "picked-up",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const yearlyData = fillYearMonths(rawData);

    res.status(200).json(yearlyData);
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

export const getDailySales = async (req, res) => {
  try {
    const { monday, sunday } = getWeekRange();

    const rawData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: monday,
            $lt: sunday,
          },
          paymentStatus: "paid",
          orderStatus: "picked-up",
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "+08:00",
            },
          },
          totalOrders: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const weeklyData = fillWeekDays(rawData, monday);

    res.status(200).json(weeklyData);
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

export const getAverageRevenue = async (req, res) => {
  try {
    const { start, end } = getTodayRange();
    const { monday, sunday } = getWeekRange();
    const { startOfMonth, endOfMonth } = getMonthlyRange();

    // 1️⃣ Aggregate ONCE (monthly range covers today + week)
    const stats = await Order.aggregate([
      {
        $match: {
          paymentStatus: "paid",
          orderStatus: "picked-up",
          createdAt: {
            $gte: startOfMonth,
            $lt: endOfMonth,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
            },
          },
          totalRevenue: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
        },
      },
    ]);

    // 2️⃣ Helpers
    const calcAov = (revenue = 0, orders = 0) =>
      orders === 0 ? 0 : +(revenue / orders).toFixed(2);

    const sumByRange = (from, to) => {
      let revenue = 0;
      let orders = 0;

      stats.forEach((d) => {
        const date = new Date(d._id);
        if (date >= from && date < to) {
          revenue += d.totalRevenue;
          orders += d.totalOrders;
        }
      });

      return calcAov(revenue, orders);
    };

    // 3️⃣ Final response
    res.status(200).json({
      averageToday: sumByRange(start, end),
      averageWeekly: sumByRange(monday, sunday),
      averageMonthly: sumByRange(startOfMonth, endOfMonth),
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};

export const getMostUsedService = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const data = await Order.aggregate([
      {
        $addFields: {
          itemDiscount: {
            $divide: [{ $ifNull: ["$discount", 0] }, { $size: "$items" }],
          },
        },
      },
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.serviceName",
          totalOrders: { $sum: 1 },
          totalRevenue: {
            $sum: {
              $subtract: ["$items.subtotal", "$itemDiscount"],
            },
          },
        },
      },
      {
        $sort: { totalOrders: -1 },
      },
    ]);

    const totalOrders = data.reduce((sum, total) => sum + total.totalOrders, 0);

    res.status(200).json({
      dataChart: data,
      totalOrders,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
