import React, { useState } from "react";
import Titles from "../Titles";
import {
  BsBookmarkStarFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";
import Rating from "../Star";
import Loader from "../Notification/Loader";
import { Empty } from "../Notification/Empty";
import { useDispatch, useSelector } from "react-redux";
import { IfMovieLiked, LikeMovie } from "../../Context/Functionalities";

const SwiperTop = ({ prevEl, nextEl, movies }) => {
  const { isLoading } = useSelector((state) => state.userLikeMovie);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if movie liked
  const isLiked = (movie) => {
    return IfMovieLiked(movie);
  };
  return (
    <Swiper
      navigation={{ nextEl, prevEl }}
      slidesPerView={4}
      spaceBetween={40}
      autoplay={true}
      speed={1000}
      loop={true}
      modules={[Navigation, Autoplay]}
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        400: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
      }}
    >
      {movies?.map((movie, index) => (
        <SwiperSlide key={index}>
          <div className="p-4 h-rate hovered border border-border bg-dry rounded-lg overflow-hidden">
            <img
              src={movie?.titleImage ? movie.titleImage : "/assets/logo.jpeg"}
              className="h-full w-full object-cover rounded-lg"
              alt={movie?.name}
            />
            <div className="px-4 text-center hoveres gap-6 absolute bg-black bg-opacity-70 top-0 left-0 right-0 bottom-0">
              <button
                onClick={() => LikeMovie(movie, dispatch, userInfo)}
                disabled={isLiked(movie) || isLoading}
                className={`w-12 h-12 flex-colo transitions
                                ${
                                  isLiked(movie)
                                    ? "bg-subMain"
                                    : "bg-white bg-opacity-30"
                                }
                  hover:bg-subMain rounded-full  text-white`}
              >
                <FaHeart />
              </button>
              <Link
                className="font-semibold text-xl trauncated line-clamp-2"
                to={`/movie/${movie?._id}`}
              >
                {movie?.name}
              </Link>
              <div className="text-star flex gap-2">
                <Rating value={movie?.rate} />
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

function TopRated({ movies, isLoading }) {
  const [nextEl, setNextEl] = useState(null);
  const [prevEl, setPrevEl] = useState(null);
  const classNames =
    "hover:bg-dry transitions text-sm rounded w-8 h-8 flex-colo bg-subMain text-white ";

  return (
    <div className="my-16">
      <Titles title="Top Rated" Icon={BsBookmarkStarFill} />
      <div className="mt-10">
        {isLoading ? (
          <Loader />
        ) : movies?.length > 0 ? (
          <SwiperTop nextEl={nextEl} prevEl={prevEl} movies={movies} />
        ) : (
          <Empty message="It seem's like we dont have any movie" />
        )}
        <div className="w-full px-1 flex-rows gap-6 pt-12 ">
          <button className={classNames} ref={(node) => setPrevEl(node)}>
            <BsCaretLeftFill />
          </button>
          <button className={classNames} ref={(node) => setNextEl(node)}>
            <BsCaretRightFill />
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopRated;
