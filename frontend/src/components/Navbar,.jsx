import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FiSearch, FiX, FiMenu } from "react-icons/fi";

const Navbar = () => {
  const [webName, setWebName] = useState("WoW");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/settings/public"
        );
        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message || "Gagal mengambil setting");
        }
        const data = await response.json();
        setWebName(data.nama_web);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    fetchSettings();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/katalog?search=${encodeURIComponent(searchTerm)}`);
      setIsMenuOpen(false);
    }
    console.log("Searching: ", searchTerm);
  };

  // --- KELAS WARNA BARU ---
  // Palet: Embun Pagi di Pegunungan
  // Teks Utama: #3A6B4C (Hijau Pinus)
  // Latar Hover: #A8E6CF (Hijau Mint)
  // Latar Aktif: #A8E6CF (Hijau Mint)
  // Teks Aktif: #FFFFFF (Putih)
  
  const linkClass =
    "text-[#3A6B4C] hover:bg-[#A8E6CF]/40 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300";
  const activeLinkClass = "bg-[#A8E6CF] !text-white";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200 z-50 transition-all duration-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-[#3A6B4C] text-xl font-bold hover:opacity-80 transition-opacity"
            >
              {webName}
            </NavLink>
          </div>

          {/* Search Form */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Cari paket..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-100 text-[#3A6B4C] placeholder-[#3A6B4C]/60 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:bg-white transition-all"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2.5 mr-3 text-[#3A6B4C]/70 hover:text-[#3A6B4C] transition-colors"
              >
                <FiSearch />
              </button>
            </form>
          </div>

          {/* Menu Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              Contact
            </NavLink>
          </div>

          {/* Tombol Hamburger Menu (Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#3A6B4C] hover:opacity-80 focus:outline-none p-2"
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-200">
          {/* Search untuk mobile */}
          <form onSubmit={handleSearch} className="relative mb-3">
            <input
              type="text"
              placeholder="Cari paket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 text-[#3A6B4C] placeholder-[#3A6B4C]/60 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] focus:bg-white"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2.5 mr-3 text-[#3A6B4C]/70"
            >
              <FiSearch />
            </button>
          </form>

          <NavLink
            to="/gallery"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `block ${linkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            Gallery
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `block ${linkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `block ${linkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;