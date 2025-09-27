import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail, FiArrowRight } from "react-icons/fi";

const PaketCard = ({ id, gambar, nama, harga, jenis, deskripsi }) => {
  const [flip, setFlip] = useState(false);

  const formatPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(harga);

  return (
    <div
      className="group h-96 [perspective:1000px] cursor-pointer transition-all duration-300 hover:-translate-y-1"
      onClick={() => setFlip(!flip)}
    >
      <div
        className={`relative h-full w-full rounded-2xl shadow-md transition-all duration-700 [transform-style:preserve-3d] group-hover:shadow-xl ${
          flip ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Sisi Depan Kartu */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="border border-gray-100 rounded-2xl overflow-hidden h-full w-full bg-white flex flex-col">
            <div className="relative h-56 w-full">
              <img
                src={`http://localhost:5000/upload/${gambar}`}
                alt={nama}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-[#3A6B4C] text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                {jenis}
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <h3 className="text-lg font-semibold text-[#3A6B4C] truncate">
                {nama}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="text-base font-bold text-[#3A6B4C]">
                  {formatPrice}
                </p>
                <Link
                  to={`/order/${id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-[#3A6B4C]/70 hover:bg-[#A8E6CF]/40 hover:text-[#3A6B4C] rounded-full transition-colors"
                  title={`Pesan paket ${nama}`}
                >
                  <FiMail size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sisi Belakang Kartu (Deskripsi) */}
        <div className="absolute inset-0 h-full w-full rounded-2xl bg-[#3A6B4C] text-white p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col items-center justify-center h-full text-center">
            <h4 className="text-xl font-semibold mb-3">Deskripsi Paket</h4>
            <p className="text-sm text-white/80 overflow-y-auto max-h-[220px] scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent pr-2">
              {deskripsi}
            </p>
            <Link
              to={`/order/${id}`}
              onClick={(e) => e.stopPropagation()}
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#3A6B4C] bg-[#A8E6CF] px-4 py-2 rounded-full hover:bg-opacity-90 transition-all"
            >
              Pesan Sekarang <FiArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaketCard;