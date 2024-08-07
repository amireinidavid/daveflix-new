import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "./Slider.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";

function Slider() {
  return (
    <div className="container-css">
      <h1 className="heading">Flower Gallery</h1>
      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={{ el: ".swiper-pagination", clickable: true }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          clickable: true,
        }}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="swiper_container"
      >
        <SwiperSlide>
          <img src="../../assets/movies/card1.jpg" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../assets/movies/card2.jpg" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../assets/movies/card3.jpg" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../assets/movies/card4.jpg" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../assets/movies/card5.jpg" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../assets/movies/card6.jpg" alt="slide_image" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="../../assets/movies/card7.jpg" alt="slide_image" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Slider;
