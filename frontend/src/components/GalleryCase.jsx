import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ShowCaseAssets } from "../assets/assets";

const GalleryCase = () => {
  return (
    <div
      id="showcase"
      className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#3A6B4C] mb-4">
          Portfolio Kami
        </h2>
        <p className="text-lg text-[#3A6B4C]/80 max-w-2xl mx-auto">
          Lihat koleksi momen-momen indah yang telah kami abadikan untuk
          klien-klien kami
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8 items-center">
        {/* Kolom Kanan (Lebih Besar) */}
        <div className="md:col-span-3 relative h-[450px] rounded-2xl overflow-hidden group shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <img
            src={ShowCaseAssets.showCase2}
            alt="Momen Pernikahan"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* info tambahan */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A6B4C]/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              <h3 className="text-2xl font-bold">Momen Pernikahan</h3>
              <p className="text-sm opacity-90 mt-2">
                Abadikan setiap detail hari bahagia Anda
              </p>
            </div>
          </div>
        </div>

        {/* Kolom Kiri (Lebih Kecil) */}
        <div className="md:col-span-2 relative h-[450px] rounded-2xl overflow-hidden group shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          <img
            src={ShowCaseAssets.showCase1}
            alt="Showcase Katalog"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Konten Teks */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#3A6B4C]/80 via-[#3A6B4C]/40 to-transparent flex items-end justify-center p-6">
            <div className="text-white text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              <h3 className="text-2xl font-bold mb-4">Lihat Gallery</h3>
              <p className="text-sm mb-4 opacity-90">
                Jelajahi berbagai paket dan layanan kami
              </p>
              <Link
                to="/gallery"
                className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#A8E6CF] text-white
               transition-all duration-300 hover:bg-[#A8E6CF] hover:text-[#3A6B4C] transform hover:scale-105"
                aria-label="Lihat Gallery"
              >
                <FiArrowRight size={28} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryCase;