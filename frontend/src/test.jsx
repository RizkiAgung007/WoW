// GET ALL ORDER (Perbaikan di sini)
router.get("/", auth, async (req, res) => {
  try {
    const query = `
      SELECT
          o.order_id,
          o.nama_user,
          o.email,
          o.no_telp,
          o.status_order, -- <<< PERBAIKAN: Kolom ini ditambahkan
          k.nama_paket
      FROM
          tb_order o
      JOIN
          tb_katalog k ON o.catalog_id = k.catalog_id
      ORDER BY
          o.created_at DESC;
    `;
    const [orders] = await pool.query(query);
    res.json({
      data: orders,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});