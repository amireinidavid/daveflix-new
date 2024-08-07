import jwt from "jsonwebtoken";
import User from "../Models/UserModels.js";
import asyncHandler from "express-async-handler";

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Protection middleware
const protect = asyncHandler(async (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;

    if (authorizationHeader && authorizationHeader.startsWith("Bearer")) {
      const token = authorizationHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } else {
      res.status(401);
      throw new Error("Not authorized, invalid token format");
    }
  } catch (error) {
    console.error(error);
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorised as an admin");
  }
};
export { generateToken, protect, admin };
