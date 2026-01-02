import Service from "../models/service.model.js";
import User from "../models/user.model.js";
import { getWeekRange } from "../utils/date.utils.js";
import { parseAndBuildQuery } from "../utils/query.utils.js";

export const postService = async (req, res) => {
  try {
    const { uid } = req.user;
    const {
      serviceName,
      description,
      category,
      pricePerKg,
      pricePerItem,
      unitType,
      processingTime,
      status,
    } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const serviceExist = await Service.findOne({ serviceName });
    if (serviceExist) {
      return res.status(400).json({ message: "Service already exist" });
    }

    const newService = await Service.create({
      serviceName,
      description,
      category,
      pricePerKg,
      pricePerItem,
      unitType,
      processingTime,
      status,
    });

    res
      .status(200)
      .json({ message: "Service created successfully!", newService });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const putService = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;
    const { formData } = req.body;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(400).json({ message: "Service didn't exist" });
    }

    const serviceExist = await Service.findOne({
      serviceName: formData.serviceName,
      _id: { $ne: id },
    });
    if (serviceExist) {
      return res.status(400).json({ message: "Service already exist" });
    }

    const updatedService = await Service.findByIdAndUpdate(
      id,
      { ...formData },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "Service updated successfully!", updatedService });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getServices = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const services = await Service.find({});

    res.status(200).json(services);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllServices = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const { page, limit, skip, search } = parseAndBuildQuery(req);

    const query = {};
    if (search) {
      query.$or = [{ serviceName: { $regex: search, $options: "i" } }];
    }

    const total = await Service.countDocuments(query);
    const services = await Service.aggregate([
      {
        $match: query, // ✅ APPLY SEARCH FILTER HERE
      },
      {
        $lookup: {
          from: "orders",
          let: { serviceId: "$_id" },
          pipeline: [
            { $unwind: "$items" },
            {
              $match: {
                $expr: { $eq: ["$items.service", "$$serviceId"] },
              },
            },
          ],
          as: "orders",
        },
      },
      {
        $addFields: {
          totalOrders: { $size: "$orders" },
        },
      },
      {
        $project: {
          orders: 0,
        },
      },
      {
        $sort: { totalOrders: -1 },
      },
      { $skip: skip },
      { $limit: limit },
    ]);

    res.status(200).json({
      services,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { uid } = req.user;
    const { id } = req.params;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    const service = await Service.findById(id);
    if (!service) {
      return res.status(400).json({ message: "Service didn't exist" });
    }

    await Service.findByIdAndDelete(id);

    res.status(200).json({ message: "Service deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
