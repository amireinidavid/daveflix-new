import Movie from "../Models/MovieModel.js";
import asyncHandler from "express-async-handler";
import { MoviesData } from "../Data/MovieData.js";

// *************** Public Controler *******************
// import movies
// @route api/movies/import

const importMovies = asyncHandler(async (req, res) => {
  await Movie.deleteMany({});
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
});

// @desc get all movies
// @route GET /api/movies
// @acess Public

const getMovies = asyncHandler(async (req, res) => {
  try {
    // filter movie by category, time, langiuage, rate, year and search
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    //  load more  movies functionalty

    const page = Number(req.query.pageNumber) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // find movies by query, skip and limit

    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // get totla number of movies

    const count = await Movie.countDocuments(query);

    // send response with movies and total number of movies
    res.json({
      movies,
      page,
      pages: Math.ceil(count / limit),
      totalMovies: count,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc get movie by id
// @route GET api/movies/:id
// @access public

const getMoviebyId = asyncHandler(async (req, res) => {
  try {
    // find movie in database
    const movie = await Movie.findById(req.params.id);
    // if the movie is found send it to client
    if (movie) {
      res.json(movie);
    }
    // if movie not found send an error message
    else {
      res.status(400);
      throw new error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc get top rated movies
// @route GEt api/movies/rated/top
// @acess route

const getTopRatedMovie = asyncHandler(async (req, res) => {
  try {
    // find top rated movies
    const movies = await Movie.find({}).sort({ rate: -1 });
    // send top rated movies to client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc get random movies
// @route

const getRandonMovies = asyncHandler(async (req, res) => {
  try {
    // find random movies
    const movies = await Movie.aggregate([{ $sample: { size: 8 } }]);
    // send random movies to client
    res.json(movies);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc create review
// @route POST /api/movies/:id/reviews
// @acess private

const createMovieReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  try {
    // find movie in database
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      // check if user already reviewed this movie
      const alreadyReviewed = movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      // if user already reviewed movie send error message
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("You already reviewed this movie");
      }
      // else create new review
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.user.image,
        rating: Number(rating),
        comment: String(comment),
      };
      // push the new review to review array
      movie.reviews.push(review);
      // increment the number of reviews
      movie.numberOfReviews = movie.reviews.length;

      // calculate the new rate
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      // save the movie in database
      await movie.save();
      // send the new movie to the client
      res.status(201).json({
        message: "Review Added",
      });
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ************** Admin Controler **********

// @desc Update movie
// @route Put /api/movies/:id
// @acess Private/Admin

const updateMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // find movie by id  in database
    const movie = await Movie.findById(req.params.id);

    if (movie) {
      // update movie data
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfReviews = numberOfReviews || movie.numberOfReviews;
      movie.category = category || movie.category;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      //  save the movie in database

      const updatedMovie = await movie.save();
      // send the updated movie to client
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//  @desc Deletre movies
// @desc DELETE /api/movies/:id
// @acess Private/Admin

const deleteMovie = asyncHandler(async (req, res) => {
  try {
    // find movie by id in database
    const movie = await Movie.findById(req.params.id);
    // if the movie is found delete am
    if (movie) {
      await movie.deleteOne();
      res.json({ message: "Movie removed " });
    }
    // if the moive is not found send 404 error
    else {
      res.status(404);
      throw new Error("Movie not found");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc DELETE all movies
// @route Delete /api/movies
// @acess Private/Admin

const deleteAllMovies = asyncHandler(async (req, res) => {
  try {
    // delete all movies
    await Movie.deleteMany({});
    res.json({ message: "All movies deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @desc Create movies
// @route post /api/movies
// @acess Private/Admin

const createMovie = asyncHandler(async (req, res) => {
  try {
    // get data from request body
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;

    // create a new movie
    const movie = new Movie({
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
      userId: req.user._id,
    });
    // save movie in data base
    if (movie) {
      const createdMovie = await movie.save();
      res.status(201).json(createdMovie);
    } else {
      res.status(400);
      throw new Error("Invalid movie data");
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export {
  importMovies,
  getMovies,
  getRandonMovies,
  getMoviebyId,
  getTopRatedMovie,
  createMovieReview,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
  createMovie,
};
