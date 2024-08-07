import asyncHandler from "express-async-handler";
import User from "../Models/UserModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/Auth.js";

// @desc Register user
// @route Post /api/users/
// @access Pulic

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    const UserExists = await User.findOne({ email });
    // if user exist
    if (UserExists) {
      res.status(400);
      throw new Error("User Already Exist");
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //  create new user in db

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    //  if user created sucessfull
    if (user) {
      res.status(201).json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// desc login user
// route post /api/users/login
// acess public

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    //  find user in db
    const user = await User.findOne({ email });
    // if user exist compare token
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
      // if user not found
    } else {
      res.status(401);
      throw new Error(" Invalid email or password ");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// update user profile

const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, image, email } = req.body;
  try {
    // find user in db
    const user = await User.findById(req.user._id);
    // if user exist update user
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      // update user
      const updateUser = await user.save();
      // send updated user data and toke to client
      res.json({
        _id: updateUser._id,
        fullName: updateUser.fullName,
        email: updateUser.email,
        image: updateUser.image,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser._id),
      });
    }
    // else error message
    else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
  //  find user in db
});

// desc user profile
// delete user profile

const deleteUserProfile = asyncHandler(async (req, res) => {
  try {
    // Find the user in the database
    const user = await User.findById(req.user._id);

    // If the user exists, delete them
    if (user) {
      // If the user is an admin, throw an error
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Admin user can't be deleted");
      }

      // Delete the user from the database
      await user.deleteOne(); // Use deleteOne() instead of remove()
      res.json({ message: "User deleted successfully" });
    } else {
      // User not found
      res.status(400);
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// desc change password
const changeUserPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    // Find user in the database
    const user = await User.findById(req.user._id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Check if old password matches
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      res
        .status(401)
        .json({ message: "Invalid old password, it was changed not long ago" });
      return;
    }

    // Hash and update the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// des get all liked  movies
// localhost//:5000/api/users/favouritemovies

const getLikedMovies = asyncHandler(async (req, res) => {
  try {
    // check if user exist

    // find user in db
    const user = await User.findById(req.user._id).populate("likedMovies");
    // if user exist
    if (user) {
      res.json(user.likedMovies);
    }
    // else
    else {
      res.status(400);
      throw new Error("User Not Found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//
//
const addLikedmovies = asyncHandler(async (req, res) => {
  const { movieId } = req.body;
  try {
    // find user in db
    const user = await User.findById(req.user._id);
    // if user exist add movie to liked movies and save it in db
    if (user) {
      // check if movie is already liked
      // if movie already like send error message
      if (user.likedMovies.includes(movieId)) {
        res.status(400);
        throw new Error("Movie already liked");
      }
      // else add movie to liked movies and save it in db
      user.likedMovies.push(movieId);
      await user.save();
      res.json(user.likedMovies);
    }
    // else send error message
    else {
      res.status(404);
      throw new Error("movie  not Found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// delete liked movies
const deleteLikedMovies = asyncHandler(async (req, res) => {
  try {
    // find user in db
    const user = await User.findById(req.user._id);
    // if user exist delete all movie files
    if (user) {
      user.likedMovies = [];
      await user.save();
      res.json({ message: "All liked movies successfully deleted" });
    } else {
      res.status(404);
      throw new Error("user not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ******** Admin Routes
// desc get all users
// @route aip/users
const getUsers = asyncHandler(async (req, res) => {
  try {
    // find alll users in db
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// desc delete Users
// @route delete /api/users/:id
const deleteUsers = asyncHandler(async (req, res) => {
  try {
    // find user in db
    const user = await User.findById(req.params.id);
    // if user exist dlete user from db
    if (user) {
      // if user is admin throw ner error
      if (user.isAdmin) {
        res.status(400);
        throw new Error("Cant delete admin user");
      }
      await user.deleteOne();
      res.json({ message: "User deleted sucessfully" });
    }
    // else send error message
    else {
      res.status(400);
      throw new Error("Error, user not found");
    }
  } catch (error) {
    res.status(400).json({ message: Error.message });
  }
});
export {
  registerUser,
  loginUser,
  updateUserProfile,
  deleteUserProfile,
  changeUserPassword,
  getLikedMovies,
  addLikedmovies,
  deleteLikedMovies,
  getUsers,
  deleteUsers,
};
