import Customer from "../models/customer.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import { parseAndBuildQuery } from "../utils/query.utils.js";

export const getCustomerStats = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

    const totalCustomers = await Customer.countDocuments();
    const newCustomersToday = await Customer.countDocuments({ createdAt: { $gte: today } });
    const newCustomersThisMonth = await Customer.countDocuments({ createdAt: { $gte: firstDayOfMonth } });
    const totalOrders = await Order.countDocuments();

    res.status(200).json({
      totalCustomers,
      newCustomersToday,
      newCustomersThisMonth,
      totalOrders
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const postCustomer = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { fullName, email, contact } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const customerExist = await Customer.findOne({ fullName });
    if (customerExist) {
      return res.status(400).json({ message: "Customer already exist" });
    }

    const newCustomer = await Customer.create({
      fullName,
      email,
      contact,
    });

    res
      .status(200)
      .json({ message: "Customer created successfully!", newCustomer });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const putCustomer = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;
    const { fullName, email, contact } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(400).json({ message: "Customer didn't exist" });
    }

    const customerExist = await Customer.findOne({
      fullName,
      _id: { $ne: id },
    });
    if (customerExist) {
      return res.status(400).json({ message: "Customer already exist" });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { fullName, email, contact },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Customer updated successfully!", updatedCustomer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllCustomers = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const { page, limit, skip, search } = parseAndBuildQuery(req);

    const query = {};
    if (search) {
      const escapeRegex = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const safeSearch = escapeRegex(search);
      query.$or = [{ fullName: { $regex: safeSearch, $options: "i" } }];
    }

    const total = await Customer.countDocuments(query);
    const customers = await Customer.aggregate([
      {
        $match: query, // ✅ APPLY SEARCH FILTER HERE
      },
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "customer",
          as: "orders",
        },
      },
      {
        $addFields: {
          totalOrders: { $size: "$orders" },
          totalSpent: { $sum: "$orders.totalAmount" },
        },
      },
      {
        $project: {
          orders: 0, // remove heavy array
        },
      },
      {
        $sort: { totalOrders: -1 },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    res.status(200).json({
      customers,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const { id: userId } = req.user;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const customers = await Customer.find({}).sort({ createdAt: -1 });

    res.status(200).json(customers);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const { id } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(400).json({ message: "Customer didn't exist" });
    }

    await Customer.findByIdAndDelete(id);

    res.status(200).json({ message: "Customer deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
