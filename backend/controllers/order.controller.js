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
    const { id: userId } = req.user;
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

    const user = await User.findById(userId);
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
      createdBy: userId,
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
    const { id: userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const { page, limit, skip, search, status } = parseAndBuildQuery(req);

    const query = {};
    if (search) {
      const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const safeSearch = escapeRegex(search);

      const customerIds = await Customer.find({
        fullName: { $regex: safeSearch, $options: "i" },
      }).distinct("_id");

      query.$or = [
        { paymentStatus: { $regex: safeSearch, $options: "i" } },
        { orderStatus: { $regex: safeSearch, $options: "i" } },
        { "items.serviceName": { $regex: safeSearch, $options: "i" } },
        { customer: { $in: customerIds } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$_id" },
              regex: safeSearch,
              options: "i",
            },
          },
        },
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
      .populate("createdBy", "firstName lastName email")
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

export const getVoidRequests = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const voidRequests = await Order.find({ voidRequest: true })
      .populate("customer", "fullName email")
      .populate("createdBy", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.status(200).json(voidRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllOrdersBoard = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { start, end } = getTodayRange();

    const user = await User.findById(userId);
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
      .populate("createdBy", "firstName lastName email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const putOrder = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const payload = req.body;

    const user = await User.findById(userId);
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
    const { id: userId } = req.user;
    const { id } = req.params;

    const user = await User.findById(userId);
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
    const { id: userId } = req.user;
    const { id } = req.params;
    const { orderStatus } = req.body;

    const allowedStatus = ["pending", "in-process", "ready", "picked-up"];

    if (!allowedStatus.includes(orderStatus)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findById(userId);
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

export const requestVoidOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { voidReason } = req.body;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({ message: "Order didn't exist" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { voidRequest: true, voidReason },
      { new: true }
    );

    res.status(200).json({ message: "Void requested successfully!", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const approveVoidOrder = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({ message: "Order didn't exist" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        orderStatus: "voided",
        voidRequest: false,
        voidedAt: Date.now(),
        voidedBy: userId,
      },
      { new: true }
    );

    res.status(200).json({ message: "Order voided successfully!", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const rejectVoidOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);
    if (!order) {
      return res.status(400).json({ message: "Order didn't exist" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { voidRequest: false, voidReason: null },
      { new: true }
    );

    res.status(200).json({ message: "Void request rejected!", updatedOrder });
  } catch (error) {
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
      .populate("createdBy", "firstName lastName")
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
    const { id: userId } = req.user;
    const { startDate, endDate } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const stats = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
        },
      },
      {
        $facet: {
          salesData: [
            {
              $match: {
                paymentStatus: "paid",
                orderStatus: "picked-up",
              },
            },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 },
              },
            },
          ],
          customerData: [
            {
              $group: {
                _id: "$customer",
              },
            },
            {
              $count: "totalCustomers",
            },
          ],
        },
      },
    ]);

    const data = stats[0];
    const totalRevenue = data.salesData[0]?.totalRevenue || 0;
    const totalOrders = data.salesData[0]?.totalOrders || 0;
    const totalCustomers = data.customerData[0]?.totalCustomers || 0;
    const aovData = totalOrders === 0 ? 0 : totalRevenue / totalOrders;

    res.status(200).json({
      totalRevenue,
      totalOrders,
      totalCustomers,
      aovData,
    });
  } catch (error) {
    console.log(error);
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

export const getRevenueTrend = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { startDate, endDate } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const rawData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
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

    const map = new Map(rawData.map((d) => [d._id, d]));
    const result = [];
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 60) {
      let currentStart = new Date(start);
      while (currentStart <= end) {
        let currentEnd = new Date(currentStart.getFullYear(), currentStart.getMonth() + 1, 0);
        currentEnd.setHours(23, 59, 59, 999);
        if (currentEnd > end) {
          currentEnd = new Date(end);
        }
        
        let monthAmount = 0;
        let monthOrders = 0;
        
        let tempDate = new Date(currentStart);
        while (tempDate <= currentEnd) {
          const key = tempDate.toLocaleDateString("en-CA");
          monthAmount += map.get(key)?.totalAmount || 0;
          monthOrders += map.get(key)?.totalOrders || 0;
          tempDate.setDate(tempDate.getDate() + 1);
        }
        
        const monthLabel = currentStart.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        
        result.push({
          date: monthLabel,
          totalAmount: monthAmount,
          totalOrders: monthOrders,
        });
        
        currentStart = new Date(currentStart.getFullYear(), currentStart.getMonth() + 1, 1);
      }
    } else if (diffDays > 15) {
      let currentStart = new Date(start);
      while (currentStart <= end) {
        let currentEnd = new Date(currentStart);
        currentEnd.setDate(currentStart.getDate() + 6);
        currentEnd.setHours(23, 59, 59, 999);
        if (currentEnd > end) {
          currentEnd = new Date(end);
        }
        
        let weekAmount = 0;
        let weekOrders = 0;
        
        let tempDate = new Date(currentStart);
        while (tempDate <= currentEnd) {
          const key = tempDate.toLocaleDateString("en-CA");
          weekAmount += map.get(key)?.totalAmount || 0;
          weekOrders += map.get(key)?.totalOrders || 0;
          tempDate.setDate(tempDate.getDate() + 1);
        }
        
        const startLabel = currentStart.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        const endLabel = currentEnd.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        
        result.push({
          date: `${startLabel} - ${endLabel}`,
          totalAmount: weekAmount,
          totalOrders: weekOrders,
        });
        
        currentStart.setDate(currentStart.getDate() + 7);
      }
    } else {
      let currentDate = new Date(start);
      while (currentDate <= end) {
        const key = currentDate.toLocaleDateString("en-CA");
        const shortLabel = currentDate.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        
        result.push({
          date: shortLabel,
          totalAmount: map.get(key)?.totalAmount || 0,
          totalOrders: map.get(key)?.totalOrders || 0,
        });

        currentDate.setDate(currentDate.getDate() + 1);
      }
    }

    const totalRevenue = result.reduce((sum, total) => sum + total.totalAmount, 0);

    res.status(200).json({
      chartData: result,
      totalRevenue,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to load revenue trend stats" });
  }
};

export const getMostUsedService = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { startDate, endDate } = req.query;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    const data = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          paymentStatus: "paid",
          orderStatus: "picked-up",
        },
      },
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
