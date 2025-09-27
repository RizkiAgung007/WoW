import React, { useState, useEffect } from "react";
import {
  FiSend,
  FiMail,
  FiPhone,
  FiMapPin,
  FiMessageSquare,
} from "react-icons/fi";
import { ContactAssets } from "../assets/assets";

const ContactPage = () => {
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
          throw new Error("Gagal mengambil data pengaturan dari server.");
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

  const renderContactInfo = () => {
    if (loading)
      return <p className="text-[#3A6B4C]/70">Memuat informasi kontak...</p>;
    if (error)
      return (
        <p className="text-red-500 bg-red-50 p-4 rounded-lg">Error: {error}</p>
      );
    if (settings) {
      return (
        <div className="space-y-8">
          <h3 className="text-3xl font-semibold text-[#3A6B4C]">
            {settings.nama_web}
          </h3>
          <div className="space-y-6 text-lg">
            <div className="flex items-start gap-4">
              <FiMapPin className="h-6 w-6 text-[#3A6B4C] mt-1 flex-shrink-0" />
              <span className="text-[#3A6B4C]/80">{settings.alamat}</span>
            </div>
            <div className="flex items-center gap-4">
              <FiPhone className="h-6 w-6 text-[#3A6B4C] flex-shrink-0" />
              <span className="text-[#3A6B4C]/80">{settings.no_telp}</span>
            </div>
            <div className="flex items-center gap-4">
              <FiMail className="h-6 w-6 text-[#3A6B4C] flex-shrink-0" />
              <span className="text-[#3A6B4C]/80">{settings.email}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#3A6B4C] tracking-tight">
            Hubungi Kami
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mb-20">
          <div className="relative h-96 sm:h-[500px] lg:h-full rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img
              src={ContactAssets.contact1}
              alt="Hubungi Kami"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#3A6B4C]/60 flex items-center justify-center p-8">
              <div className="text-white text-center">
                <FiMessageSquare className="h-12 w-12 text-[#A8E6CF] mx-auto mb-4" />
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
                  Get In Touch
                </h2>
                <p className="text-lg max-w-md mx-auto text-white/90">
                  Punya pertanyaan atau ingin mendiskusikan acaramu? Kami siap
                  membantu mewujudkan hari spesial Anda.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-md">
            {/* --- Judul Form --- */}
            <h3 className="text-2xl font-semibold text-[#3A6B4C] mb-8">
              Kirimkan Pesan Anda
            </h3>

            <form action="#" method="POST" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[#3A6B4C]/90 mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Nama Anda"
                    className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#3A6B4C]/90 mb-2"
                  >
                    Alamat Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@anda.com"
                    className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-[#3A6B4C]/90 mb-2"
                >
                  Pesan
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tulis pesan Anda di sini..."
                  className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-semibold text-white bg-[#3A6B4C] hover:bg-[#2c523a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A6B4C] transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Kirim Pesan <FiSend />
              </button>
            </form>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center mt-20">
          <div>{renderContactInfo()}</div>
          <div>
            <img
              src={ContactAssets.contact2}
              alt="Info Kontak"
              className="rounded-2xl shadow-md w-full h-auto object-cover transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;