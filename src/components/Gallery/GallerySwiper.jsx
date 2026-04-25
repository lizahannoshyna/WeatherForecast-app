import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import styles from "./GallerySwiper.module.css";

const GallerySwiper = ({ photos = [] }) => {
  if (photos.length === 0) return null;

  return (
    <div className={styles.galleryWrapper}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={15}
        slidesPerView={1}
        loop={photos.length > 2}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className={styles.mySwiper}
      >
        {photos.map((photo, index) => (
          <SwiperSlide key={photo.id || index}>
            <div className={styles.slideInner}>
              <img
                src={photo.src || photo.webformatURL || photo.urls?.regular}
                alt="City gallery"
                className={styles.galleryImage}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GallerySwiper;
