import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../Container";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";

function GallerySwiper() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;
        const response = await axios.get("https://pixabay.com/api/", {
          params: {
            key: API_KEY,
            q: "nature weather forest lakes landscapes  animals flowers beautiful gorgeous  night happiness",
            image_type: "photo",
            orientation: "horizontal",
            per_page: 12,
            safesearch: true,
          },
        });
        setImages(response.data.hits);
      } catch (error) {
        console.error("Error loading from Pixabay:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading)
    return (
      <div className="text-center py-20 font-light">
        Looking for the best landscapes...
      </div>
    );

  return (
    <section className="">
      <Container>
        <div className="">
          <h2 className="">Beautiful nature</h2>
        </div>

        <Swiper
          dir="rtl"
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="pb-14"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id} style={{ width: "auto" }}>
              <div className="relative overflow-hidden rounded-[2rem] shadow-sm transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={image.largeImageURL}
                  alt={image.tags}
                  className="h-[300px] md:h-[450px] w-auto object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                  <p className="text-white text-sm font-light backdrop-blur-md bg-white/10 py-2 px-4 rounded-full">
                    {image.tags.split(",")[0]}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
}

export default GallerySwiper;
