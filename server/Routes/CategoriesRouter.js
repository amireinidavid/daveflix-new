import express from "express";
import { protect, admin } from "../middlewares/Auth.js";
import * as categoriesContoller from "../Controllers/CategoriesController.js";

const router = express.Router();

// **************** PUBLIC ROUTES ************
router.get("/", categoriesContoller.getCategories);

//  ********************* ADMIN ROUTES **************

router.post("/", protect, admin, categoriesContoller.createCategory);
router.put("/:id", protect, admin, categoriesContoller.updateCategory);
router.delete("/:id", protect, admin, categoriesContoller.deleteCategory);

export default router;
