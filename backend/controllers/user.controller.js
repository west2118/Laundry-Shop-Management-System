import User from "../models/user.model.js";

export const postUser = async (req, res) => {
  try {
    const { uid } = req.user;
    const { firstName, lastName, email } = req.body;

    if (!uid) {
      return res.status(400).json({ message: "User UID is missing" });
    }

    const user = await User.findOneAndUpdate(
      { uid },
      {
        uid,
        firstName,
        lastName,
        email,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({ message: "Account created successfully", user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { uid } = req.user;

    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(400).json({ message: "User didn't exist" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
