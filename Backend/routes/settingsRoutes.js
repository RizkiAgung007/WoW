import express from "express";
import pool from "../db.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// GET UNTUK USER
router.get("/public", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT nama_web, deskripsi, alamat, email, no_telp, logo FROM tb_settings WHERE id = 1"
    );
    if (rows.length === 0) {
      return res.status(404).json({ message: "Settings tidak ditemukan" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET UNTUK ADMIN
router.get("/", auth, async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM tb_settings WHERE id = 1");
    if (rows.length === 0) {
      return res.status(404).json({ message: "Settings tidak ditemukan." });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// UPDATE UNTUK ADMIN
router.put("/", auth, upload.single("logo"), async (req, res) => {
  const { nama_web, deskripsi, alamat, email, no_telp } = req.body;
  let logoPath;

  if (req.file) {
    logoPath = req.file.path;
  }

  try {
    const query = `
            UPDATE tb_settings
            SET nama_web = ?, deskripsi = ?, alamat = ?, email = ?, no_telp = ?, logo = ?, updated_at = NOW()
            WHERE id = 1
        `;

    await pool.query(query, [
      nama_web,
      deskripsi,
      alamat,
      email,
      no_telp,
      logoPath,
    ]);
    res.json({ message: "Settings berhasil diupdate." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
