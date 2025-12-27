import Customer from "../models/customer.model.js";
import User from "../models/user.model.js";

export const postCustomer = async (req, res) => {
  try {
    const { uid } = req.user;
    const { fullName, email, contact } = req.body;

    const user = await User.findOne({ uid });
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
    const { uid } = req.user;
    const { id } = req.params;
    const { formData } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const customer = await Customer.findById(id);
    if (!customer) {
      return res.status(400).json({ message: "Customer didn't exist" });
    }

    const customerExist = await Customer.findOne({
      fullName: formData.fullName,
      _id: { $ne: id },
    });
    if (customerExist) {
      return res.status(400).json({ message: "Customer already exist" });
    }

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { ...formData },
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
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const customers = await Customer.find({});

    res.status(200).json(customers);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
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
