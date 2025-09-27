import React, { useState, useEffect } from "react";

const ManajemenSettings = () => {
  const [formData, setFormData] = useState({
    nama_web: "",
    deskripsi: "",
    alamat: "",
    email: "",
    no_telp: "",
  });
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/api/settings", {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Gagal mengambil data settings.");

        const data = await response.json();
        setFormData(data);
        if (data.logo) {
          const logoPath = data.logo.replace(/\\/g, "/");
          setLogoPreview(`http://localhost:5000/${logoPath}`);
        }
      } catch (error) {
        console.error(error);
        setNotification({ message: error.message, type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ message: "Menyimpan perubahan...", type: "info" });

    const dataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== "logo") {
        dataToSubmit.append(key, formData[key] || "");
      }
    });
    if (logoFile) {
      dataToSubmit.append("logo", logoFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/settings", {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: dataToSubmit,
      });

      if (!response.ok) throw new Error("Gagal memperbarui settings.");

      setNotification({
        message: "Settings berhasil diperbarui!",
        type: "success",
      });
    } catch (error) {
      setNotification({ message: error.message, type: "error" });
    }

    setTimeout(() => setNotification({ message: "", type: "" }), 4000);
  };

  if (loading) {
    return <p className="text-center mt-8 text-gray-600">Memuat settings...</p>;
  }

  const inputClass =
    "w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900";
  const labelClass = "block text-sm font-medium text-gray-700 mb-1";

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Settings Website
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {/* Kolom Kiri */}
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Nama Website</label>
              <input
                type="text"
                name="nama_web"
                value={formData.nama_web || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>No. Telepon</label>
              <input
                type="text"
                name="no_telp"
                value={formData.no_telp || ""}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Alamat</label>
              <textarea
                name="alamat"
                value={formData.alamat || ""}
                onChange={handleChange}
                rows="4"
                className={inputClass}
              ></textarea>
            </div>
          </div>

          {/* Kolom Kanan */}
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Deskripsi (About)</label>
              <textarea
                name="deskripsi"
                value={formData.deskripsi || ""}
                onChange={handleChange}
                rows="8"
                className={inputClass}
              ></textarea>
            </div>
            <div>
              <label className={labelClass}>Logo Website</label>
              <input
                type="file"
                name="logo"
                onChange={handleLogoChange}
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer"
              />
              {logoPreview && (
                <div className="mt-4 p-4 border rounded-lg bg-gray-50">
                  <p className="text-sm font-medium text-gray-600 mb-2">
                    Preview Logo:
                  </p>
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="h-20 w-auto rounded"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t flex items-center justify-between">
          <button
            type="submit"
            className="bg-indigo-600 text-white font-semibold py-2.5 px-6 rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
          >
            Simpan Perubahan
          </button>
          {notification.message && (
            <p
              className={`text-sm ${
                notification.type === "success"
                  ? "text-green-600"
                  : notification.type === "error"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {notification.message}
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default ManajemenSettings;
