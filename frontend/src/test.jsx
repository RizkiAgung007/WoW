// pages/OrderPage.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FiArrowLeft, FiSend } from "react-icons/fi";

const OrderPage = () => {
  const { id } = useParams(); // Mengambil ID paket dari URL
  const navigate = useNavigate();

  const [paket, setPaket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState({
    nama_user: "",
    email: "",
    no_telp: "",
    alamat: "",
    note: "",
  });

  // Fetch detail paket berdasarkan ID
  useEffect(() => {
    const fetchPaketDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/katalog/public/${id}`);
        if (!response.ok) throw new Error("Paket tidak ditemukan.");
        const data = await response.json();
        setPaket(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPaketDetail();
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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dataToSubmit),
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.message || "Gagal mengirim pesanan.");
        }
        
        setSubmitSuccess(true); // Tampilkan pesan sukses
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  if (loading && !paket) return <p className="text-center py-20">Memuat...</p>;
  if (error && !paket) return <p className="text-center py-20 text-red-500">{error}</p>;

  if (submitSuccess) {
    return (
        <div className="max-w-2xl mx-auto text-center py-20">
            <h1 className="text-3xl font-bold text-green-600">Pesanan Terkirim!</h1>
            <p className="mt-4 text-gray-700">Terima kasih telah melakukan pemesanan. Tim kami akan segera menghubungi Anda melalui email atau telepon untuk konfirmasi lebih lanjut.</p>
            <Link to="/katalog" className="mt-8 inline-block bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700">
                Kembali ke Katalog
            </Link>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-24 px-4 sm:px-6 lg:px-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <FiArrowLeft className="mr-2" /> Kembali
      </button>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Form Pemesanan</h1>
      <p className="text-lg text-gray-600 mb-8">
        Anda akan memesan paket: <span className="font-bold text-blue-600">{paket?.nama_paket}</span>
      </p>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <input type="text" name="nama_user" onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" name="email" onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nomor Telepon</label>
            <input type="tel" name="no_telp" onChange={handleChange} required className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Alamat</label>
            <textarea name="alamat" rows="3" onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"></textarea>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Catatan Tambahan (Opsional)</label>
            <textarea name="note" rows="3" onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"></textarea>
          </div>
        </div>
        {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
        <div className="mt-8">
          <button type="submit" disabled={loading} className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300">
            <FiSend className="mr-2" />
            {loading ? "Mengirim..." : "Kirim Pesanan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OrderPage;