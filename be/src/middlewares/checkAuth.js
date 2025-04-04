import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const checkAuth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("bearer ", "");
  if (!token) {
    return res.status(401).json({
      message: "khong co token",
    });
  }
  try {
    const decodeed = jwt.verify(token, process.env.JWT_SECERT_KEY);
    if (!decodeed) {
      return res.status(401).json({
        message: "token khong hop le",
      });
    }
    const user = await User.findById(decodeed.id).select("-password");
    if (user.roles !== "admin") {
      return res.status(401).json({
        message: "Khong co quyen try cap",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }
};
