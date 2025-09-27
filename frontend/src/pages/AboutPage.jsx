import React, { useState, useEffect } from "react";
import { AboutAssets } from "../assets/assets";
import { FiAward, FiUsers } from "react-icons/fi";

const AboutPage = () => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/settings/public"
        );
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari server.");
        }
        const data = await response.json();
        setSettings(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const renderDescription = () => {
    if (loading) return <p className="text-[#3A6B4C]/70">Memuat deskripsi...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;
    if (settings) {
      return (
        <p className="mt-4 text-lg text-[#3A6B4C]/80 max-w-3xl mx-auto">
          {settings.deskripsi || "Deskripsi tidak ditemukan."}
        </p>
      );
    }
    return null;
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* --- SECTION 1: DESKRIPSI UTAMA DARI DB --- */}
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#3A6B4C] tracking-tight">
            Tentang Kami
          </h1>
          {renderDescription()}
        </div>

        {/* --- SECTION 2: TEKS KIRI, GAMBAR KANAN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <div className="space-y-6 lg:order-1">
            <div className="w-16 h-16 bg-[#3A6B4C] rounded-full flex items-center justify-center">
              <FiAward className="h-8 w-8 text-[#A8E6CF]" />
            </div>
            <h2 className="text-3xl font-semibold text-[#3A6B4C] tracking-tight">
              Visi & Misi Kami
            </h2>
            <p className="text-[#3A6B4C]/80 text-lg leading-relaxed">
              Mewujudkan pernikahan impian setiap pasangan dengan perencanaan
              yang teliti, eksekusi yang sempurna, dan sentuhan personal yang
              tak terlupakan. Kami berkomitmen untuk memberikan layanan terbaik
              yang melebihi ekspektasi.
            </p>
            <div className="pt-4">
              <p className="font-bold text-[#3A6B4C]">Jane Doe</p>
              <p className="text-sm text-[#3A6B4C]/70">
                Founder & Creative Director
              </p>
            </div>
          </div>
          <div className="lg:order-2">
            <img
              src={AboutAssets.about1}
              alt="Tim Kami"
              className="rounded-2xl shadow-md w-full h-auto object-cover transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            />
          </div>
        </div>

        {/* --- SECTION 3: GAMBAR KIRI, TEKS KANAN --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="lg:order-2">
            <div className="w-16 h-16 bg-[#3A6B4C] rounded-full flex items-center justify-center">
              <FiUsers className="h-8 w-8 text-[#A8E6CF]" />
            </div>
            <h2 className="text-3xl font-semibold text-[#3A6B4C] tracking-tight mt-6">
              Tim Profesional Kami
            </h2>
            <p className="text-[#3A6B4C]/80 text-lg leading-relaxed mt-6">
              Di balik setiap acara yang sukses, ada tim yang solid dan penuh
              dedikasi. Tim kami terdiri dari para profesional berpengalaman di
              bidangnya masing-masing, siap untuk berkolaborasi dan memastikan
              setiap detail acara Anda sempurna.
            </p>
            <div className="pt-4 mt-6">
              <p className="font-bold text-[#3A6B4C]">John Smith</p>
              <p className="text-sm text-[#3A6B4C]/70">Head of Operations</p>
            </div>
          </div>
          <div className="lg:order-1">
            <img
              src={AboutAssets.about2}
              alt="Proses Kerja"
              className="rounded-2xl shadow-md w-full h-auto object-cover transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;