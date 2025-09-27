import React from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { ShowCaseAssets } from "../assets/assets";

const ShowCase = () => {
  return (
    <div id="showcase" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Portfolio Kami
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Lihat koleksi momen-momen indah yang telah kami abadikan untuk
          klien-klien kami
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 items-center">
        {/* Kolom Kiri (Lebih Kecil) */}
        <div className="md:col-span-2 relative h-[450px] rounded-lg overflow-hidden group shadow-lg">
          <img
            src={ShowCaseAssets.showCase1}
            alt="Showcase Katalog"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end justify-center p-6">
            <div className="text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Katalog Lengkap</h3>
              <p className="text-sm mb-4 opacity-90">
                Jelajahi berbagai paket dan layanan kami
              </p>
              <Link
                to="/katalog"
                className="inline-flex items-center justify-center w-14 h-14 rounded-full border-2 border-white
             transition-all duration-300 hover:bg-white hover:text-black transform hover:scale-110"
                aria-label="Lihat Katalog"
              >
                <FiArrowRight size={28} />
              </Link>
            </div>
          </div>
        </div>

        {/* Kolom Kanan (Lebih Besar) */}
        <div className="md:col-span-3 relative h-[450px] rounded-lg overflow-hidden group shadow-lg">
          <img
            src={ShowCaseAssets.showCase2}
            alt="Momen Pernikahan"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold">Momen Pernikahan</h3>
              <p className="text-sm opacity-90 mt-2">
                Abadikan setiap detail hari bahagia Anda
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
