import User from "../models/user.model.js";
import { parseAndBuildQuery } from "../utils/query.utils.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({ message: "User didn't exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
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
      query.$or = [
        { firstName: { $regex: safeSearch, $options: "i" } },
        { lastName: { $regex: safeSearch, $options: "i" } },
        { email: { $regex: safeSearch, $options: "i" } }
      ];
    }

    const total = await User.countDocuments(query);
    const users = await User.find(query)
      .select("-password -refreshToken")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      users,
      page,
      total,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
