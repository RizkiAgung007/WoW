import express from "express";
import pool from "../db.js";
import auth from "../middleware/auth.js";
import sendEmail from "../utils/sendMail.js";

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
                o.status_order,
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

    const [orders] = await pool.query(
      `SELECT o.nama_user, o.email, k.nama_paket, k.harga, k.jenis_paket
       FROM tb_order o
       JOIN tb_katalog k ON o.catalog_id = k.catalog_id
       WHERE o.order_id = ?`,
      [order_id]
    );

    // Kirim email hanya jika statusnya 'approved' atau 'rejected'
    if (
      orders.length > 0 &&
      (status_order === "approved" || status_order === "rejected")
    ) {
      const user = orders[0];
      let subject, htmlBody;

      const formatedPrice = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
      }).format(user.harga)

      // 2. Gunakan template email yang lebih profesional
      if (status_order === "approved") {
        subject = `✅ Pesanan Anda untuk Paket "${user.nama_paket}" Telah Disetujui!`;
        htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #3A6B4C;">Status Pesanan Anda Diperbarui</h2>
            <p>Halo <b>${user.nama_user}</b>,</p>
            <p>Kabar baik! Pesanan Anda telah kami setujui. Berikut adalah detailnya:</p>
            <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 5px 0;"><b>ID Pesanan:</b> #${order_id}</p>
              <p style="margin: 5px 0;"><b>Paket Dipesan:</b> ${user.nama_paket}</p>
              <p style="margin: 5px 0;"><b>Jenis Paket:</b> ${user.jenis_paket}</p>
              <p style="margin: 5px 0;"><b>Harga:</b> ${formatedPrice}</p>
              <p style="margin: 5px 0;"><b>Status:</b> <span style="color: green; font-weight: bold;">APPROVED</span></p>
            </div>
            <p>Tim kami akan segera menghubungi Anda melalui email atau telepon untuk membahas langkah selanjutnya.</p>
            <p>Terima kasih telah memilih layanan kami! 🙏</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">Email ini dibuat secara otomatis. Mohon untuk tidak membalas email ini.</p>
          </div>
        `;
      } else if (status_order === "rejected") {
        subject = `❌ Pesanan Anda untuk Paket "${user.nama_paket}" Ditolak`;
        htmlBody = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <h2 style="color: #D32F2F;">Status Pesanan Anda Diperbarui</h2>
            <p>Halo <b>${user.nama_user}</b>,</p>
            <p>Dengan berat hati kami memberitahukan bahwa pesanan Anda belum dapat kami proses saat ini. Berikut adalah detailnya:</p>
            <div style="background-color: #f7f7f7; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p style="margin: 5px 0;"><b>ID Pesanan:</b> #${order_id}</p>
              <p style="margin: 5px 0;"><b>Paket Dipesan:</b> ${user.nama_paket}</p>
              <p style="margin: 5px 0;"><b>Jenis Paket:</b> ${user.jenis_paket}</p>
              <p style="margin: 5px 0;"><b>Harga:</b> ${formatedPrice}</p>
              <p style="margin: 5px 0;"><b>Status:</b> <span style="color: red; font-weight: bold;">REJECTED</span></p>
            </div>
            <p>Silakan hubungi admin kami secara langsung untuk mendapatkan informasi lebih lanjut mengenai alasan penolakan.</p>
            <p>Kami mohon maaf atas ketidaknyamanannya.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #888;">Email ini dibuat secara otomatis. Mohon untuk tidak membalas email ini.</p>
          </div>
        `;
      }

      await sendEmail(user.email, subject, htmlBody);
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
