import React, { useContext, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { useParams } from "react-router-dom";
import MovieInfo from "../components/Single/MovieDesc";
import MovieCast from "../components/Single/MovieCast";
import MovieRating from "../components/Single/MovieRating";
import Titles from "../components/Titles";
import { BsCollectionFill } from "react-icons/bs";
import Movie from "../components/Movie";
import ShareMovieModal from "../components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMovieByIdAction } from "../Redux/Actions/MoviesAction";
import Loader from "../components/Notification/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { SidebarContext } from "../Context/DrawerContext";
import { DownloadVideo } from "../Context/Functionalities";
import FileSaver from "file-saver";

function SingleMovie() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setprogress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";

  // use Selector
  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  const { movies } = useSelector((state) => state.getAllMovies);
  // related movies
  const RelatedMovies = movies?.filter((m) => m.category === movie?.category);

  // download movie video
  const DownloadMovieVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  // use Effect
  useEffect(() => {
    // movie id
    dispatch(getMovieByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-0 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <>
          <ShareMovieModal
            modalOpen={modalOpen}
            movie={movie}
            setModalOpen={setModalOpen}
          />
          <MovieInfo
            movie={movie}
            setModalOpen={setModalOpen}
            DownloadVideo={DownloadMovieVideo}
            progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MovieCast movie={movie} />
            {/* RATES */}
            <MovieRating movie={movie} />
            {/* Related */}
            {RelatedMovies?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Movies" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {RelatedMovies?.map((movie) => (
                    <Movie key={movie?._id} movie={movie} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMovie;
