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

  const linkClass =
    "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClass = "bg-gray-900 text-white";

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800/90 backdrop-blur-md shadow-lg z-50 transition-all duration-300">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand/Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-white text-xl font-bold hover:text-gray-200 transition-colors"
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
                className="w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-700 transition-all"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-2 mr-3 text-gray-400 hover:text-white transition-colors"
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
              className="text-gray-300 hover:text-white focus:outline-none p-2"
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
        <div className="px-4 pt-2 pb-3 space-y-2 bg-gray-800/95 backdrop-blur-md border-t border-gray-700">
          {/* Search untuk mobile */}
          <form onSubmit={handleSearch} className="relative mb-3">
            <input
              type="text"
              placeholder="Cari paket..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 mt-2 mr-3 text-gray-400"
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
