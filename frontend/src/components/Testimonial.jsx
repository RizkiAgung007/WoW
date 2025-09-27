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
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: false,
    cssEase: "ease-in-out",
    pauseOnHover: true,
    dotsClass: "slick-dots testimonial-dots",
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Testimonial
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          <Slider {...settings}>
            {testimonialData.map((testimonial) => (
              <div key={testimonial.id} className="outline-none">
                <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 mx-4 relative">
                  {/* Quote Icon */}
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center shadow-lg">
                      {/* <FiQuote className="text-white text-xl" /> */}
                      <p className="text-white text-xl" />
                    </div>
                  </div>

                  {/* Testimonial Content */}
                  <div className="pt-8">
                    <blockquote className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8 italic text-center">
                      "{testimonial.quote}"
                    </blockquote>

                    {/* Divider Line */}
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

                    {/* Author Info */}
                    <div className="text-center">
                      <h4 className="text-xl font-bold text-gray-900 mb-1">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-500 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full opacity-50"></div>
                  <div className="absolute -top-2 -right-4 w-4 h-4 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full opacity-60"></div>
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
