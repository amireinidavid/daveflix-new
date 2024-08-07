import React, { useState } from "react";
import Titles from "../Titles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import Movie from "../Movie";
import { Movies } from "../../Data/MovieData";
import { BsCollectionPlayFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";

function Animecategory() {
  const [nextEl] = useState(null);
  const [prevEl] = useState(null);
  const ActionMovies = Movies.filter((movie) => movie.category === "Action");
  return (
    <>
      <div className="my-16">
        <Titles title="Anime" Icon={BsCollectionPlayFill} />{" "}
        <div className=" text-subMain hover:text-white font-medium text-sm  lg:flex xl:justify-end">
          <NavLink to="/anime">Show More</NavLink>
        </div>
      </div>

      <Swiper
        navigation={{ nextEl, prevEl }}
        slidesPerView={4}
        spaceBetween={50}
        autoplay={true}
        speed={900}
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
        <div className="border-blue grid xl:grid-cols-4 lg:grid-cols-3 sm:mt-12 mt-6  sm:grid-cols-2 grid-cols-1 gap-10 ">
          {ActionMovies.slice(0, 8).map((movie, index) => (
            <SwiperSlide key={index}>
              <Movie key={index} movie={movie} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </>
  );
}

export default Animecategory;
