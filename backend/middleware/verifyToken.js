import jwt from "jsonwebtoken";
import Token from "../models/token.model.js";

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_jwt_secret"
    );

    const tokenDoc = await Token.findOne({ accessToken: token });
    if (!tokenDoc) {
      return res.status(401).json({ message: "Unauthorized: Token has been revoked" });
    }

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
