import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Banner from "../components/Home/Banner";
import PopularMovies from "../components/Home/PopularMovies";
import TopRated from "../components/Home/TopRated";
import Promos from "../components/Home/Promos";
import ActionCat from "../components/Home/ActionCat";
import Animecategory from "../components/Home/Animecategory";
import DramaCat from "../components/Home/DramaCat";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMoviesAction,
  getRandomMoviesAction,
  getTopRatedMovieAction,
} from "../Redux/Actions/MoviesAction";
import toast from "react-hot-toast";

function HomeScreen() {
  const dispatch = useDispatch();
  // use selectors
  const {
    isLoading: randomLoading,
    isError: randomError,
    movies: randomMovies,
  } = useSelector((state) => state.getRandomMovies);
  const {
    isLoading: topLoading,
    isError: topError,
    movies: topMovies,
  } = useSelector((state) => state.getTopRatedMovie);

  const { isLoading, isError, movies } = useSelector(
    (state) => state.getAllMovies
  );
  // useEffects

  useEffect(() => {
    // get random movies
    dispatch(getRandomMoviesAction());
    // get all movies
    dispatch(getAllMoviesAction({}));
    // get top rated movies
    dispatch(getTopRatedMovieAction());

    // errors
    if (isError || randomError || topError) {
      toast.error("Something went wrong");
    }
  }, [dispatch, isError, randomError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6 ">
        <Banner movies={movies} isLoading={isLoading} />
        <PopularMovies movies={randomMovies} isLoading={randomLoading} />
        <Promos />
        <TopRated movies={topMovies} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
