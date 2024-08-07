import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAllmoviesAction,
  deleteMovieAction,
  getAllMoviesAction,
} from "../../../Redux/Actions/MoviesAction";
import toast from "react-hot-toast";
import Loader from "../../../components/Notification/Loader";
import { Empty } from "../../../components/Notification/Empty";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";

function Movielist() {
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  const dispatch = useDispatch();
  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );
  // delete
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  // delete all movies
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllMovies
  );

  // delete movie handler
  const deleteMoviehandler = (id) => {
    window.confirm("Are u sure you want to delete this movie") &&
      dispatch(deleteMovieAction(id));
  };

  // delete all movies
  const deleteAllMoviesHandler = () => {
    window.confirm("Are u sure u want to delete all movies") &&
      dispatch(deleteAllmoviesAction());
  };

  // use effect
  useEffect(() => {
    dispatch(getAllMoviesAction({}));
    // errors
    if (isError || deleteError || allError) {
      toast.error(isError || deleteError || allError);
    }
  }, [dispatch, isError, deleteError, allError]);

  // pagination next and prev pages
  const nextPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page + 1,
      })
    );
  };

  const prevPage = () => {
    dispatch(
      getAllMoviesAction({
        pageNumber: page - 1,
      })
    );
  };

  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Movie list</h2>
          {movies?.length > 0 && (
            <button
              disabled={allLoading}
              onClick={deleteAllMoviesHandler}
              className="bg-main font-medium trnasitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded "
            >
              {allLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>

        {isLoading || deleteLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <>
            <Table
              data={movies}
              admin={true}
              onDeleteHandler={deleteMoviehandler}
            />
            <div className="w-full flex-rows gap-6 my-5">
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
          <Empty message="you have no  Movies" />
        )}
      </div>
    </Sidebar>
  );
}

export default Movielist;
