import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft, FiSave, FiUploadCloud } from "react-icons/fi";

const jenisPaketOptions = [
  { value: "", label: "Pilih Jenis Paket...", disabled: true },
  { value: "Basic", label: "Basic" },
  { value: "VIP", label: "VIP" },
  { value: "Exclusive", label: "Exclusive" },
];

const EditKatalog = () => {
  const [formData, setFormData] = useState({
    nama_paket: "",
    deskripsi: "",
    harga: "",
    jenis_paket: "",
  });
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchKatalogData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:5000/api/katalog/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil data katalog.");
        }

        const data = await response.json();
        setFormData({
          nama_paket: data.nama_paket,
          deskripsi: data.deskripsi,
          harga: data.harga,
          jenis_paket: data.jenis_paket,
        });

        if (data.gambar) {
          setPreview(
            `http://localhost:5000/upload/${data.gambar.replace(/\\/g, "/")}`
          );
        }
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };
    fetchKatalogData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGambar(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const dataToSubmit = new FormData();
    dataToSubmit.append("nama_paket", formData.nama_paket);
    dataToSubmit.append("deskripsi", formData.deskripsi);
    dataToSubmit.append("harga", formData.harga);
    dataToSubmit.append("jenis_paket", formData.jenis_paket);
    if (gambar) {
      dataToSubmit.append("gambar", gambar);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:5000/api/katalog/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: dataToSubmit,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Gagal update katalog.");
      }

      navigate("/admin/katalog");
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-3 bg-gray-100 border-transparent rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#A8E6CF] transition-colors duration-300";
  const labelClass = "block text-sm font-medium text-[#3A6B4C]/90 mb-2";

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/katalog")}
          className="p-2 mr-4 rounded-full hover:bg-[#A8E6CF]/40 text-[#3A6B4C] transition-colors cursor-pointer"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-semibold text-[#3A6B4C]">Edit Katalog</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-8 rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri */}
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Nama Paket</label>
              <input
                type="text"
                name="nama_paket"
                value={formData.nama_paket}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Jenis Paket</label>
              <select
                name="jenis_paket"
                value={formData.jenis_paket}
                onChange={handleChange}
                className={inputClass}
                required
              >
                {jenisPaketOptions.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Harga</label>
              <input
                type="number"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Deskripsi</label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                rows="5"
                className={inputClass}
              ></textarea>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            <div>
              <label className={labelClass}>
                Ganti Gambar Paket (Opsional)
              </label>
              <input
                type="file"
                name="gambar"
                onChange={handleChangeImage}
                className="w-full text-sm text-[#3A6B4C]/80 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#A8E6CF]/50 file:text-[#3A6B4C] hover:file:bg-[#A8E6CF]/80 cursor-pointer"
              />
            </div>
            {preview ? (
              <div className="mt-4 p-4 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-64 object-contain rounded"
                />
              </div>
            ) : (
                <div className="mt-4 flex flex-col items-center justify-center text-center p-4 h-full border-2 border-dashed border-gray-200 rounded-lg bg-gray-50 text-[#3A6B4C]/70">
                <FiUploadCloud size={40} className="mb-2" />
                <p className="text-sm">Preview gambar akan tampil di sini</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
          <div>
            {error && (
              <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg mb-4">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center w-full md:w-auto bg-[#3A6B4C] text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-[#2c523a] transition-colors disabled:bg-[#3A6B4C]/50 cursor-pointer"
            >
              <FiSave className="mr-2" />
              {loading ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditKatalog;