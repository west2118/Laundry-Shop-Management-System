import admin from "firebase-admin";

export const verifyToken = async (req, res, next) => {
  const idToken = req.headers.authorization?.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
