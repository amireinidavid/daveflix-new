import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Fliters from "../components/Fliters";
import Movie from "../components/Movie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Loader from "../components/Notification/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { TbPlayerTrackPrev, TbPlayerTrackNext } from "react-icons/tb";
import { getAllMoviesAction } from "../Redux/Actions/MoviesAction";
import {
  LanguageData,
  RatesData,
  TimesData,
  YearData,
} from "../Data/FliterData";
import { useParams } from "react-router-dom";

function MoviesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "All Categories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);

  const sameClass =
    "text-white py-2 px-4 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  // queries
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      time: times?.title.replace(/\D/g, ""),
      language: language?.title === "Sort by Language" ? "" : language.title,
      rate: rates?.title.replace(/\D/g, ""),
      year: year?.title.replace(/\D/g, ""),
      search: search ? search : "",
    };
    return query;
  }, [category, times, language, rates, year, search]);

  // useEffect
  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }
    // get all movies
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  // pagination next and prev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        ...queries,
        pageNumber: page - 1,
      })
    );
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };
  console.log(search);
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Fliters data={datas} />
        <p className="text-lg font-medium my-6 ">
          Total
          <span className="font-bold ml-1 mr-1 gap-2 text-subMain ">
            {movies ? movies?.length : 0}
          </span>
          items Found {search && ` for "${search}"`}
        </p>
        {isLoading ? (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <Loader />
          </div>
        ) : movies?.length > 0 ? (
          <>
            <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
              {movies?.map((movie, index) => (
                <Movie key={index} movie={movie} />
              ))}
            </div>
            <div className="w-full flex-rows gap-6 md:my-20 my-10">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={sameClass}
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>

              <button
                onClick={nextPage}
                disabled={page === pages}
                className={sameClass}
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <div className="w-full gap-6 flex-colo min-h-screen">
            <div className="w-24 h-24 p-5 rounded-full mb-4 bg-dry text-subMain text-4xl flex-colo">
              <RiMovie2Line />
            </div>
            <p className="text-border text-sm">
              It seems like we dont ave any movie
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default MoviesPage;
