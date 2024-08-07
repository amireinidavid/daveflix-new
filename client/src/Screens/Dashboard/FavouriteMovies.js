import React, { useContext, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavoriteMoviesAction,
  getFavoriteMoviesAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../components/Notification/Loader";
import { Empty } from "../../components/Notification/Empty";
import { SidebarContext } from "../../Context/DrawerContext";
import { DownloadVideo } from "../../Context/Functionalities";
import FileSaver from "file-saver";

function FavouriteMovies() {
  const dispatch = useDispatch();
  const { progress, setprogress } = useContext(SidebarContext);
  const { isLoading, isError, likedMovies } = useSelector(
    (state) => state.userGetFavoriteMovies
  );

  // delete

  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMovies);

  // delete movies handler
  const deleteMoviesHandler = () => {
    window.confirm("Are u sure u want to delete your favoriete movies");
    dispatch(deleteFavoriteMoviesAction());
  };

  // download movie video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };
  // use Effect
  useEffect(() => {
    dispatch(getFavoriteMoviesAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_FAVORITE_MOVIES_RESET"
          : "DELETE_FAVORITE_MOVIES_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favourite Movies</h2>
          {likedMovies?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMoviesHandler}
              className="bg-main font-medium trnasitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded "
            >
              {deleteLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMovies?.length > 0 ? (
          <Table
            data={likedMovies}
            admin={false}
            DownloadVideo={DownloadMovieVideo}
            progress={progress}
          />
        ) : (
          <Empty message="you have no favorite movies" />
        )}
      </div>
    </Sidebar>
  );
}

export default FavouriteMovies;
