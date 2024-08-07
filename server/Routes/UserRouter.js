import express from "express";
import {
  addLikedmovies,
  changeUserPassword,
  deleteLikedMovies,
  deleteUserProfile,
  deleteUsers,
  getLikedMovies,
  getUsers,
  loginUser,
  registerUser,
  updateUserProfile,
} from "../Controllers/UserController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// Public Router

router.post("/", registerUser);
router.post("/login", loginUser);

// private routes
router.put("/", protect, updateUserProfile);
router.delete("/", protect, deleteUserProfile);
router.put("/password", protect, changeUserPassword);
router.get("/favorites", protect, getLikedMovies);
router.post("/favorites", protect, addLikedmovies);
router.delete("/favorites", protect, deleteLikedMovies);

// *************Admin routes *******************

router.get("/", protect, admin, getUsers);
router.delete("/:id", protect, admin, deleteUsers);

export default router;
