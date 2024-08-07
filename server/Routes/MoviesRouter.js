import express from "express";
import { protect, admin } from "../middlewares/Auth.js";
import * as moviesContoller from "../Controllers/MoviesContoller.js";

const router = express.Router();

// Public Router
router.post("/import", moviesContoller.importMovies);
router.get("/", moviesContoller.getMovies);
router.get("/:id", moviesContoller.getMoviebyId);
router.get("/rated/top", moviesContoller.getTopRatedMovie);
router.get("/random/all", moviesContoller.getRandonMovies);

// ******************* Private Routes *******************
router.post("/:id/reviews", protect, moviesContoller.createMovieReview);
// *************Admin routes *******************
router.put("/:id", protect, admin, moviesContoller.updateMovie);
router.delete("/:id", protect, admin, moviesContoller.deleteMovie);
router.delete("/", protect, admin, moviesContoller.deleteAllMovies);
router.post("/", protect, admin, moviesContoller.createMovie);

export default router;
