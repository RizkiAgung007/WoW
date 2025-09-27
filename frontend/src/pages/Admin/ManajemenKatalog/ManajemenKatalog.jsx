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
        <tr>
          <td colSpan="6" className="text-center py-10 text-gray-500">
            Memuat data...
          </td>
        </tr>
      );
    }
    if (error) {
      return (
        <tr>
          <td colSpan="6" className="text-center py-10 text-red-500 bg-red-50">
            {error}
          </td>
        </tr>
      );
    }
    if (katalog.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center py-10 text-gray-500">
            Tidak ada data katalog yang ditemukan.
          </td>
        </tr>
      );
    }
    return katalog.map((item, index) => (
      <tr key={item.catalog_id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
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
        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
          {item.nama_paket}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {item.jenis_paket}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          Rp {new Intl.NumberFormat("id-ID").format(item.harga)}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-center space-x-2">
          <button
            onClick={() => navigate(`/admin/katalog/edit/${item.catalog_id}`)}
            className="p-2 text-yellow-600 hover:bg-yellow-100 rounded-full"
            title="Edit"
          >
            <FiEdit2 size={16} />
          </button>
          <button
            onClick={() => handleDelete(item.catalog_id)}
            className="p-2 text-red-600 hover:bg-red-100 rounded-full"
            title="Hapus"
          >
            <FiTrash2 size={16} />
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Manajemen Katalog</h1>
        <button
          onClick={() => navigate("/admin/katalog/create")}
          className="flex items-center bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <FiPlus className="mr-2" />
          Tambah Katalog
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Gambar
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama Paket
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Jenis Paket
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Harga
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderContent()}
            </tbody>
          </table>
        </div>
      </div>

      {pagination.totalPages > 1 && (
        <div className="mt-6 flex justify-between items-center text-sm">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="bg-white border border-gray-300 py-2 px-4 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Halaman <strong>{pagination.currentPage}</strong> dari{" "}
            <strong>{pagination.totalPages}</strong>
          </span>
          <button
            onClick={() =>
              setPage((p) => Math.min(pagination.totalPages, p + 1))
            }
            disabled={page === pagination.totalPages}
            className="bg-white border border-gray-300 py-2 px-4 rounded-lg disabled:opacity-50 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ManajemenKatalog;
