import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./NewsArticle.module.css";

const NewsArticle = ({ items }) => {
  const categories = ["PET CARE", "BEHAVIOR", "GARDENING", "ACTIVITIES"];
  return (
    <div className={styles.swiperContainer}>
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={20}
        slidesPerView={1}
        loop={items.length > 4}
        autoplay={false}
        navigation={true}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${styles.customBullet}`,
          bulletActiveClass: `swiper-pagination-bullet-active ${styles.customBulletActive}`,
        }}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {items.map((article, index) => (
          <SwiperSlide key={index}>
            <div className={styles.newsCard}>
              <div className={styles.imageWrapper}>
                <img
                  src={
                    article.urlToImage || "https://via.placeholder.com/400x300"
                  }
                  alt={article.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <span
                  className={`${styles.category} ${styles[`cat${(index % 4) + 1}`]}`}
                >
                  {categories[index % categories.length]}
                </span>
                <h4 className={styles.title}>{article.title}</h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default NewsArticle;
