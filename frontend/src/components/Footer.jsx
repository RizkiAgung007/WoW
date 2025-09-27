import React, { useState, useEffect } from "react";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

const Footer = () => {
  const [settings, setSettings] = useState({
    nama_web: "Wedding WO",
    deskripsi: "Memuat deskripsi...",
    alamat: "Memuat alamat...",
    email: "memuat@email.com",
    no_telp: "Memuat nomor...",
    instagram_url: "#",
    facebook_url: "#",
    twitter_url: "#",
  });
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/settings/public"
        );
        if (!response.ok) {
          console.error(
            "Gagal mengambil data settings, status:",
            response.status
          );
          return;
        }
        const data = await response.json();

        setSettings({
          nama_web: data.nama_web || "NamaWeb",
          deskripsi: data.deskripsi || "Deskripsi tidak tersedia.",
          alamat: data.alamat || "Alamat tidak tersedia.",
          email: data.email || "Email tidak tersedia.",
          no_telp: data.no_telp || "Telepon tidak tersedia.",
          instagram_url: data.instagram_url || "#",
          facebook_url: data.facebook_url || "#",
          twitter_url: data.twitter_url || "#",
        });
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil setting:", error);
      }
    };
    fetchSettings();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:divide-x divide-gray-700">
          {/* Nama Web & Deskripsi */}
          <div className="md:pr-8">
            <h2 className="text-2xl font-bold text-white mb-2">
              {settings.nama_web}
            </h2>
            <p className="text-sm text-gray-400">{settings.deskripsi}</p>
          </div>

          {/* Alamat */}
          <div className="md:px-8">
            <h3 className="font-semibold text-white tracking-wider uppercase mb-4">
              Alamat
            </h3>
            <p className="text-sm text-gray-400 whitespace-pre-line">
              {settings.alamat}
            </p>
          </div>

          {/* Kontak */}
          <div className="md:px-8">
            <h3 className="font-semibold text-white tracking-wider uppercase mb-4">
              Kontak
            </h3>
            <div className="text-sm text-gray-400">
              <p>
                <strong>Telp:</strong> {settings.no_telp}
              </p>
              <p className="mt-2">
                <strong>Email:</strong> {settings.email}
              </p>
            </div>
          </div>

          {/* Copyright & Media Sosial */}
          <div className="md:pl-8 flex flex-col justify-between items-start md:items-end">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              &copy; {currentYear} {settings.nama_web}. All Rights Reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href={settings.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href={settings.facebook_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaFacebookF size={22} />
              </a>
              <a
                href={settings.twitter_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X/Twitter"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FaXTwitter size={22} />
              </a>
              <a
                href={`mailto:${settings.email}`}
                aria-label="Email"
                className="text-gray-400 hover:text-white transition-colors duration-300"
              >
                <FiMail size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
