import express from "express";
import pool from "../db.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// POST NEW ORDER
router.post("/public", async (req, res) => {
  const { catalog_id, nama_user, email, alamat, note, no_telp } = req.body;

  if (!catalog_id || !nama_user || !email || !no_telp) {
    return res
      .status(404)
      .json({ message: "Data yang diperlukan tidak lengkap." });
  }

  try {
    const query = `
            INSERT INTO tb_order 
            (catalog_id, nama_user, email, alamat, note, no_telp, status_order, created_at) 
            VALUES (?, ?, ?, ?, ?, ?, 'request', NOW())
        `;

    const [result] = await pool.query(query, [
      catalog_id,
      nama_user,
      email,
      alamat,
      note,
      no_telp,
    ]);

    res.status(201).json({
      message: "Pesanan anda berhasil terkirim, silahkan tunggu balasan admin.",
      orderId: result.insertId,
    });
  } catch (err) {
    console.error("Error saat mengirim pesanan.", err.message);
    res.status(500).send("Server Error");
  }
});

// GET ALL ORDER
router.get("/", auth, async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  try {
    const [totalResult] = await pool.query(
      "SELECT COUNT(*) as total FROM tb_order"
    );
    const totalItems = totalResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    const query = `
            SELECT
                o.order_id,
                o.nama_user,
                o.email,
                o.no_telp,
                k.nama_paket
            FROM
                tb_order o
            JOIN
                tb_katalog k ON o.catalog_id = k.catalog_id
            ORDER BY
                o.created_at DESC
            LIMIT ? OFFSET ?;
        `;

    const [orders] = await pool.query(query, [limit, offset]);

    res.json({
      data: orders,
      pagination: { currentPage: page, totalPages: totalPages },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// PUT STATUS ORDER
router.put("/:order_id/status", auth, async (req, res) => {
  const { order_id } = req.params;
  const { status_order } = req.body;

  const allowedStatuses = ["approved", "rejected", "request"];
  if (!status_order || !allowedStatuses.includes(status_order)) {
    return res.status(400).json({ message: "Status tidak valid." });
  }

  try {
    const query =
      "UPDATE tb_order SET status_order = ?, updated_at = NOW() WHERE order_id = ?";
    const [result] = await pool.query(query, [status_order, order_id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Order tidak ditemukan." });
    }

    res.json({
      message: `Status order berhasil diperbarui menjadi: '${status_order}.'`,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default router;
