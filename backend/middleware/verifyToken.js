import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    const decodedToken = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_jwt_secret"
    );
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
  }
};
