import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiSend, FiCheckCircle } from "react-icons/fi";

const OrderPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [paket, setPaket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  const [formData, setFormData] = useState({
    nama_user: "",
    email: "",
    no_telp: "",
    alamat: "",
    note: "",
  });

  useEffect(() => {
    const fetchPaket = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/katalog/public/${id}`
        );

        if (!response.ok) throw new Error("Paket tidak ditemukan.");
        const data = await response.json();
        setPaket(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPaket();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const dataToSubmit = { ...formData, catalog_id: id };
      const response = await fetch(`http://localhost:5000/api/orders/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSubmit),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Gagal mengirim pesan.");
      }

      setSubmit(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !paket)
    return <p className="text-center py-20 text-[#3A6B4C]/70">Memuat...</p>;
  if (error && !paket)
    return (
      <p className="text-center py-20 text-red-500 bg-red-50 p-4 rounded-lg mx-auto max-w-md">
        {error}
      </p>
    );

  if (submit) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <FiCheckCircle className="text-[#A8E6CF] text-6xl mx-auto mb-4" />
          <h1 className="text-3xl font-semibold text-[#3A6B4C]">
            Pesanan Terkirim!
          </h1>
          <p className="mt-4 text-[#3A6B4C]/80">
            Terima kasih telah melakukan pemesanan. Tim kami akan segera
            menghubungi Anda melalui email atau telepon untuk konfirmasi lebih
            lanjut.
          </p>
          <Link
            to="/katalog"
            className="mt-8 inline-block bg-[#3A6B4C] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#2c523a] transition-colors duration-300 cursor-pointer"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#3A6B4C]/80 hover:text-[#3A6B4C] mb-8 font-medium transition-colors"
        >
          <FiArrowLeft /> Kembali ke Katalog
        </button>

        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#3A6B4C] tracking-tight mb-4">
            Form Pemesanan
          </h1>
          <p className="text-lg text-[#3A6B4C]/80 mb-10">
            Anda akan memesan paket:{" "}
            <span className="font-bold text-[#3A6B4C]">
              {paket?.nama_paket}
            </span>
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 sm:p-10 rounded-2xl shadow-md"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#3A6B4C]/90 mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                name="nama_user"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3A6B4C]/90 mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#3A6B4C]/90 mb-2">
                Nomor Telepon
              </label>
              <input
                type="tel"
                name="no_telp"
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#3A6B4C]/90 mb-2">
                Alamat
              </label>
              <textarea
                name="alamat"
                rows="3"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-[#3A6B4C]/90 mb-2">
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                name="note"
                rows="3"
                onChange={handleChange}
                className="w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300"
              ></textarea>
            </div>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
          )}
          <div className="mt-8">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-semibold text-white bg-[#3A6B4C] hover:bg-[#2c523a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3A6B4C] transition-all duration-300 ease-in-out transform hover:scale-105 disabled:bg-[#3A6B4C]/50 disabled:scale-100 cursor-pointer"
            >
              <FiSend />
              {loading ? "Mengirim..." : "Kirim Pesanan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderPage;