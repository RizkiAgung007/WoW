import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi";

const PaketCard = ({ id, gambar, nama, harga, jenis, deskripsi }) => {
  const [flip, setFlip] = useState(false);

  const formatPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(harga);

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <div className="group h-80 [perspective:1000px]" onClick={handleFlip}>
      <div
        className={`relative h-full w-full rounded-lg shadow-lg transition-all duration-700 [transform-style:preserve-3d] ${
          flip ? "[transform:rotateY(180deg)]" : ""
        }`}
      >
        {/* Sisi Depan Kartu */}
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <div className="border rounded-lg overflow-hidden h-full w-full">
            <div className="relative h-56 w-full">
              <img
                src={`http://localhost:5000/upload/${gambar}`}
                alt={nama}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {jenis}
              </div>
            </div>
            <div className="p-4 bg-white h-24">
              <h3 className="text-lg font-bold text-gray-800 truncate group-hover:text-blue-600">
                {nama}
              </h3>
              <div className="flex justify-between items-center mt-2">
                <p className="mt-2 text-base font-semibold text-gray-900">
                  {formatPrice}
                </p>
                <Link
                  to={`/order/${id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="p-2 text-gray-500 hover:bg-blue-100 hover:text-blue-600 rounded-full transition-colors"
                  title={`Pesan paket ${nama}`}
                >
                  <FiMail size={20} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sisi Belakang Kartu (Deskripsi) */}
        <div className="absolute inset-0 h-full w-full rounded-lg bg-gray-800 text-white p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex flex-col items-center justify-center h-full">
            <h4 className="text-xl font-bold mb-3">Deskripsi Paket</h4>
            <p className="text-sm text-center text-gray-300 overflow-y-auto max-h-[220px]">
              {deskripsi}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaketCard;
