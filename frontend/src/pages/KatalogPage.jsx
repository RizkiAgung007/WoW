import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import PaketCard from "../components/PaketCard";
import Pagination from "../components/Pagination";

const PAGE_LIMIT = 10;

const PaketFilter = [
  { id: "Basic", nama: "Basic" },
  { id: "VIP", nama: "VIP" },
  { id: "Exclusive", nama: "Exclusive" },
];

const KatalogPage = () => {
  const [katalog, setKatalog] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState("semua");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    const fetchKatalog = async () => {
      setLoading(true);
      setError("");

      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: PAGE_LIMIT,
        });

        if (selected !== "semua") {
          params.append("jenis", selected);
        }

        if (searchTerm) {
          params.append("search", searchTerm);
        }

        const response = await fetch(
          `http://localhost:5000/api/katalog/public?${params.toString()}`
        );
        if (!response.ok) throw new Error("Gagal memuat data katalog");

        const data = await response.json();
        setKatalog(data.data);
        setTotalPages(data.pagination.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchKatalog();
  }, [currentPage, selected, searchTerm]);

  const handleFilter = (id) => {
    setSelected(id);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-gray-900">
          Jelajahi Katalog Kami
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Temukan paket yang paling sesuai untuk hari istimewa Anda.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center flex-wrap gap-2 mb-12">
        <button
          onClick={() => handleFilter("semua")}
          className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
            selected === "semua"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Semua
        </button>
        {PaketFilter.map((jenis) => (
          <button
            key={jenis.id}
            onClick={() => handleFilter(jenis.id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              selected === jenis.id
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {jenis.nama}
          </button>
        ))}
      </div>

      {/* Tampilan Konten Katalog */}
      {loading ? (
        <p className="text-center text-gray-500">Memuat katalog...</p>
      ) : error ? (
        <p className="text-center text-red-500 bg-red-50 p-4 rounded-lg">
          {error}
        </p>
      ) : katalog.length === 0 ? (
        <p className="text-center text-gray-500">
          Tidak ada katalog yang ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {katalog.map((paket) => (
            <PaketCard
              key={paket.catalog_id}
              id={paket.catalog_id}
              gambar={paket.gambar}
              nama={paket.nama_paket}
              harga={paket.harga}
              jenis={paket.jenis_paket}
              deskripsi={paket.deskripsi}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!loading && !error && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default KatalogPage;
