import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

const ManajemenKatalog = () => {
  const [katalog, setKatalog] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loadKatalog = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/katalog?page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Gagal mengambil data katalog. Silakan coba lagi.");
      }
      const data = await response.json();
      setKatalog(data.data);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKatalog();
  }, [page]);

  const handleDelete = async (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus katalog ini?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/katalog/${id}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Gagal menghapus katalog.");
        }
        loadKatalog();
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="text-center py-10 text-[#3A6B4C]/70">
          Memuat data...
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center py-10 text-red-600 bg-red-50 p-4 rounded-lg">
          {error}
        </div>
      );
    }
    if (katalog.length === 0) {
      return (
        <div className="text-center py-10 text-[#3A6B4C]/70">
          Tidak ada data katalog yang ditemukan.
        </div>
      );
    }
    return (
      <>
        {/* Mobile View - Cards */}
        <div className="space-y-4 md:hidden">
          {katalog.map((item, index) => (
            <div
              key={item.catalog_id}
              className="bg-white p-4 rounded-lg shadow-md border"
            >
              <div className="flex items-start gap-4">
                <img
                  src={`http://localhost:5000/upload/${item.gambar.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={item.nama_paket}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-grow">
                  <span className="text-xs bg-[#A8E6CF]/50 text-[#3A6B4C] font-semibold px-2 py-1 rounded-full">
                    {item.jenis_paket}
                  </span>
                  <h3 className="font-semibold text-[#3A6B4C] mt-2">
                    {item.nama_paket}
                  </h3>
                  <p className="text-sm text-[#3A6B4C]/80">
                    Rp {new Intl.NumberFormat("id-ID").format(item.harga)}
                  </p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4 border-t pt-3">
                <button
                  onClick={() =>
                    navigate(`/admin/katalog/edit/${item.catalog_id}`)
                  }
                  className="p-2 text-[#3A6B4C]/80 hover:bg-[#A8E6CF]/40 rounded-full transition-colors cursor-pointer"
                  title="Edit"
                >
                  <FiEdit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(item.catalog_id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View - Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  Gambar
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  Nama Paket
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  Jenis Paket
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  Harga
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {katalog.map((item, index) => (
                <tr key={item.catalog_id} className="hover:bg-[#A8E6CF]/20">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3A6B4C]">
                    {(page - 1) * 10 + index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <img
                      src={`http://localhost:5000/upload/${item.gambar.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt={item.nama_paket}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#3A6B4C]">
                    {item.nama_paket}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3A6B4C]/80">
                    {item.jenis_paket}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3A6B4C]/80">
                    Rp {new Intl.NumberFormat("id-ID").format(item.harga)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/katalog/edit/${item.catalog_id}`)
                      }
                      className="p-2 text-[#3A6B4C]/80 hover:bg-[#A8E6CF]/40 rounded-full transition-colors cursor-pointer"
                      title="Edit"
                    >
                      <FiEdit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.catalog_id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors cursor-pointer"
                      title="Hapus"
                    >
                      <FiTrash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
        <h1 className="text-3xl font-semibold text-[#3A6B4C]">
          Manajemen Katalog
        </h1>
        <button
          onClick={() => navigate("/admin/katalog/create")}
          className="flex items-center justify-center bg-[#3A6B4C] text-white py-2 px-4 rounded-lg hover:bg-[#2c523a] transition-colors shadow-sm font-semibold w-full md:w-auto cursor-pointer"
        >
          <FiPlus className="mr-2" />
          Tambah Katalog
        </button>
      </div>

      <div className="bg-white shadow-md rounded-2xl md:overflow-hidden">
        {renderContent()}
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-sm gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="bg-white border border-gray-200 py-2 px-4 rounded-lg disabled:opacity-50 hover:bg-gray-50 text-[#3A6B4C]/80 font-medium w-full md:w-auto"
          >
            Previous
          </button>
          <span className="text-[#3A6B4C]/80">
            Halaman{" "}
            <strong className="text-[#3A6B4C]">
              {pagination.currentPage}
            </strong>{" "}
            dari{" "}
            <strong className="text-[#3A6B4C]">
              {pagination.totalPages}
            </strong>
          </span>
          <button
            onClick={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={page === pagination.totalPages}
            className="bg-white border border-gray-200 py-2 px-4 rounded-lg disabled:opacity-50 hover:bg-gray-50 text-[#3A6B4C]/80 font-medium w-full md:w-auto"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManajemenKatalog;