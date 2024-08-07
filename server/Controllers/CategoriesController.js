import Categories from "../Models/CategoryModal.js";
import asyncHandler from "express-async-handler";

// *********** PUBLIC CONTROLER ***************
// @desc get all categories
// @route GET /api/catrgories
// @access Public

const getCategories = asyncHandler(async (req, res) => {
  try {
    // find all categories in database
    const categories = await Categories.find({});
    // send all categories to the client
    res.json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ************ ADMIN CONTROLER
// @desc POST /api/categories
// @acess private/admin

const createCategory = asyncHandler(async (req, res) => {
  try {
    // get title from request folder
    const { title } = req.body;
    // create new category
    const category = new Categories({ title });
    // save the category in database
    const createdCategory = await category.save();
    // send the new category to the client
    res.status(201).json(createdCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc update category
// @route Put /api/categories/:id
// @acess private/Admin

const updateCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from request params
    const category = await Categories.findById(req.params.id);

    if (category) {
      // update category title
      category.title = req.body.title || category.title;
      // save the updated category in database
      const updatedCategory = await category.save();
      // send the updated category to client
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc delete category
// @route DELETE /api/categories/:id
// @acess Private/Admin

const deleteCategory = asyncHandler(async (req, res) => {
  try {
    // get category id from request params
    const category = await Categories.findById(req.params.id);
    if (category) {
      // delete the category from database
      await category.deleteOne();
      // send sucess message to the client
      res.json({ message: "Category removed" });
    } else {
      res.status(404).json({ message: "Category not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getCategories, createCategory, updateCategory, deleteCategory };
