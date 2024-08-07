import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="relative w-full">
      <Swiper
        effect={"coverflow"}
        modules={[EffectCoverflow, Autoplay]}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 1000,
          modifier: 2.5,
        }}
        pagination={{ clickable: true }}
        slidesPerView={"auto"}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        className="swiper_container"
      >
        <SwiperSlide>
          <div className="bg-red-500 h-96 flex justify-center items-center">
            <div className="text-center ">
              <Link to="/action">
                <span>Action</span>
              </Link>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-green-500 h-96 flex justify-center items-center">
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-blue-500 h-96 flex justify-center items-center">
            Slide 3
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-yellow-500 h-96 flex justify-center items-center">
            Slide 5
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="bg-purple-500 h-96 flex justify-center items-center">
            Slide 6
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
