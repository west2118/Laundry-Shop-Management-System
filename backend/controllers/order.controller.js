import Customer from "../models/customer.model.js";
import Order from "../models/order.model.js";
import User from "../models/user.model.js";

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

    const orders = await Order.find({}).populate("customer", "fullName email");

    res.status(200).json(orders);
  } catch (error) {
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

export const getDashboardStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
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
      if (item._id === "picked-up") result.pickedUp = item.count;
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
