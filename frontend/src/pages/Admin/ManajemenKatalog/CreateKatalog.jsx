import React, { useState } from "react";
import { FiArrowLeft, FiSave } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const jenisPaketOptions = [
  { value: "", label: "Pilih Jenis Paket...", disabled: true },
  { value: "Basic", label: "Basic" },
  { value: "VIP", label: "VIP" },
  { value: "Exclusive", label: "Exclusive" },
];

const CreateKatalog = () => {
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
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

    if (!gambar) {
      setError("Wajib upload gambar paket");
      setLoading(false);
      return;
    }

    const dataToSubmit = new FormData();
    dataToSubmit.append("nama_paket", formData.nama_paket);
    dataToSubmit.append("deskripsi", formData.deskripsi);
    dataToSubmit.append("harga", formData.harga);
    dataToSubmit.append("jenis_paket", formData.jenis_paket);
    dataToSubmit.append("gambar", gambar);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/katalog", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: dataToSubmit,
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Gagal upload katalog.");
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
    "w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/admin/katalog")}
          className="p-2 mr-4 rounded-full hover:bg-gray-200"
        >
          <FiArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Tambah Katalog</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Kolom Kiri untuk input teks */}
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
                placeholder="Contoh: 5000000"
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

          {/* Kolom Kanan untuk upload gambar */}
          <div>
            <label className={labelClass}>Photo</label>
            <input
              type="file"
              name="gambar"
              onChange={handleImage}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
            />
            {preview && (
              <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                <p className="text-sm font-medium text-gray-600 mb-2">
                  Preview:
                </p>
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-48 object-contain rounded"
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          {error && (
            <p className="text-red-600 text-sm text-center bg-red-50 p-3 rounded-lg mb-4">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center w-full md:w-auto bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-300"
          >
            <FiSave className="mr-2" />
            {loading ? "Menyimpan..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateKatalog;
