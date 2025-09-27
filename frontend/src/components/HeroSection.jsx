import React from "react";
import { FiArrowDown } from "react-icons/fi";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { HeroAssets } from "../assets/assets";

const dummyData = [
  {
    image: HeroAssets.heroImage1,
    title: "Wujudkan Pernikahan Impian Anda",
    subtitle: "Bersama kami, setiap detail menjadi sempurna.",
  },
  {
    image: HeroAssets.heroImage2,
    title: "Momen Abadi, Kenangan Tak Terlupakan",
    subtitle: "Biarkan kami merangkai hari bahagia anda.",
  },
  {
    image: HeroAssets.heroImage3,
    title: "Perencanaan Profesional, Hasil Maksimal",
    subtitle: "Nikmati setiap momen, kami urus sisanya.",
  },
];

const HeroSection = ({ scrollToId }) => {
  const handleScroll = () => {
    if (!scrollToId) return;
    document.getElementById(scrollToId)?.scrollIntoView({ behavior: "smooth" });
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    cssEase: "ease-in-out",
    rtl: false,
  };

  return (
    <div className="relative w-full overflow-hidden pt-16">
      <Slider {...settings}>
        {dummyData.map((slide, index) => (
          <div key={index}>
            <div
              className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center text-white text-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >

              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>

              <div className="relative z-10 p-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold drop-shadow-2xl animate-fade-in-down mb-6">
                  {slide.title}
                </h1>
                <p className="mt-4 text-lg md:text-xl lg:text-2xl drop-shadow-lg animate-fade-in-up max-w-3xl mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>

                {/* CTA button */}
                <div className="mt-8 animate-fade-in-up animation-delay-300">
                  <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105">
                    Pelajari Lebih Lanjut
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>

      {/* Arrow Button Down */}
      <button
        onClick={handleScroll}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30
                     hover:bg-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-110 animate-bounce"
        aria-label="Scroll to next section"
      >
        <FiArrowDown size={24} />
      </button>
    </div>
  );
};

export default HeroSection;
