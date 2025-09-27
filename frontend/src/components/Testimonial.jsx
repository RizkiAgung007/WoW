import React from "react";
import Slider from "react-slick";
// import { FiQuote } from "react-icons/fi";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonialData = [
  {
    id: 1,
    quote:
      "Tim Web WOjo benar-benar luar biasa! Mereka berhasil mewujudkan pernikahan impian kami dengan sempurna. Setiap detail diperhatikan dengan baik dan hasilnya melebihi ekspektasi kami.",
    name: "Sarah & Ahmad",
    role: "Pasangan Pengantin 2024",
  },
  {
    id: 2,
    quote:
      "Profesionalisme dan kreativitas tim Web WOjo sangat mengesankan. Hari pernikahan kami berjalan lancar tanpa ada kendala berarti. Terima kasih telah membuat hari spesial kami tak terlupakan!",
    name: "Dinda & Rizki",
    role: "Pasangan Pengantin 2023",
  },
  {
    id: 3,
    quote:
      "Pelayanan yang sangat memuaskan dari konsultasi hingga hari H. Tim Web WOjo sangat responsif dan membantu merealisasikan konsep pernikahan yang kami inginkan. Highly recommended!",
    name: "Maya & Bayu",
    role: "Pasangan Pengantin 2024",
  },
  {
    id: 4,
    quote:
      "Kualitas dokumentasi dan dekorasi yang luar biasa! Web WOjo berhasil mengabadikan momen-momen berharga kami dengan sangat indah. Keluarga dan tamu undangan pun ikut terpukau.",
    name: "Putri & Andi",
    role: "Pasangan Pengantin 2023",
  },
  {
    id: 5,
    quote:
      "Dari planning hingga eksekusi, semuanya berjalan dengan sangat baik. Tim Web WOjo sangat detail dan memastikan semua berjalan sesuai timeline. Investasi yang sangat worth it!",
    name: "Sari & Doni",
    role: "Pasangan Pengantin 2024",
  },
];

const Testimonial = () => {
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
    pauseOnHover: true,
    dotsClass: "slick-dots testimonial-dots",
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[#A8E6CF]/10 via-white to-white overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <style>
          {`
            .testimonial-dots li button:before {
              color: #3A6B4C;
              opacity: 0.3;
              font-size: 10px;
            }
            .testimonial-dots li.slick-active button:before {
              color: #3A6B4C;
              opacity: 1;
            }
          `}
        </style>
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-semibold text-[#3A6B4C] mb-4">
            Testimonial
          </h2>
          <div className="w-24 h-1 bg-[#A8E6CF] mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {testimonialData.map((testimonial) => (
              <div key={testimonial.id} className="outline-none">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 md:p-12 mx-4 relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <div className="w-12 h-12 bg-[#A8E6CF] rounded-full flex items-center justify-center shadow-md">
                      {/* <FiQuote className="text-[#3A6B4C] text-2xl" /> */}
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="pt-8">
                    <blockquote className="text-[#3A6B4C]/90 text-lg md:text-xl leading-relaxed mb-8 font-serif italic text-center">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Divider Line */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-[#A8E6CF]/50 to-transparent mb-6"></div>

                    {/* Author Info */}
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-[#3A6B4C] mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-[#3A6B4C]/70 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#A8E6CF]/30 rounded-full"></div>
                  <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#A8E6CF]/40 rounded-full"></div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;