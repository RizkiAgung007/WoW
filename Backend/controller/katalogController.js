import pool from "../config/db.js";

// GET KATALOG PUBLIK DENGAN PAGINATION & FILTER
export const getPublicKatalog = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const jenis = req.query.jenis;
  const search = req.query.search;

  try {
    let baseQuery = "FROM tb_katalog";
    let whereClauses = [];
    const params = [];

    if (jenis) {
      whereClauses.push("jenis_paket = ?");
      params.push(jenis);
    }

    if (search) {
      whereClauses.push("(nama_paket LIKE ? OR deskripsi LIKE ?)");
      params.push(`%${search}%`, `%${search}%`);
    }

    if (whereClauses.length > 0) {
      baseQuery += " WHERE " + whereClauses.join(" AND ");
    }

    const countQuery = "SELECT COUNT(*) as total " + baseQuery;
    const [totalResult] = await pool.query(countQuery, params);
    const totalItems = totalResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    const dataQuery =
      "SELECT * " + baseQuery + " ORDER BY created_at DESC LIMIT ? OFFSET ?";
    params.push(limit, offset);

    const [katalog] = await pool.query(dataQuery, params);

    res.json({
      data: katalog,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// GET KATALOG PUBLIK BY ID
export const getPublicKatalogById = async (req, res) => {
  try {
    const [item] = await pool.query(
      "SELECT * FROM tb_katalog WHERE catalog_id = ?",
      [req.params.id]
    );

    if (item.length === 0) {
      return res.status(404).json({ message: "Katalog tidak ditemukan." });
    }
    res.json(item[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// GET ALL KATALOG ADMIN
export const getAllKatalog = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const [totalResult] = await pool.query(
      "SELECT COUNT(*) as total FROM tb_katalog"
    );

    const totalItems = totalResult[0].total;
    const totalPages = Math.ceil(totalItems / limit);

    const [katalog] = await pool.query(
      "SELECT * FROM tb_katalog ORDER BY created_at DESC LIMIT ? OFFSET ?",
      [limit, offset]
    );

    res.json({
      data: katalog,
      pagination: {
        currentPage: page,
        totalPages: totalPages,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// GET KATALOG BY ID ADMIN
export const getKatalogById = async (req, res) => {
  try {
    const [item] = await pool.query(
      "SELECT * FROM tb_katalog WHERE catalog_id = ?",
      [req.params.id]
    );

    if (item.length === 0) {
      return res.status(404).json({ message: "Katalog tidak ditemukan." });
    }
    res.json(item[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// POST NEW KATALOG
export const createKatalog = async (req, res) => {
  const { nama_paket, deskripsi, harga, jenis_paket } = req.body;
  const gambar = req.file ? req.file.filename : null;

  if (!gambar) {
    return res.status(400).json({ message: "Gambar wajib diunggah." });
  }

  try {
    const query =
      "INSERT INTO tb_katalog (nama_paket, deskripsi, gambar, harga, jenis_paket, created_at) VALUES (?, ?, ?, ?, ?, NOW())";
    const [result] = await pool.query(query, [
      nama_paket,
      deskripsi,
      gambar,
      harga,
      jenis_paket,
    ]);
    res.status(201).json({ catalog_id: result.insertId, ...req.body, gambar });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// PUT KATALOG BY ID
export const updateKatalogById = async (req, res) => {
  const { id } = req.params;
  const { nama_paket, deskripsi, harga, jenis_paket } = req.body;
  let imagePath;

  if (req.file) {
    imagePath = req.file.filename;
  } else {
    const [currentItem] = await pool.query(
      "SELECT gambar FROM tb_katalog WHERE catalog_id = ?",
      [id]
    );
    if (currentItem.length > 0) {
      imagePath = currentItem[0].gambar;
    }
  }

  try {
    const query =
      "UPDATE tb_katalog SET nama_paket = ?, deskripsi = ?, gambar = ?, harga = ?, jenis_paket = ?, updated_at = NOW() WHERE catalog_id = ?";
    await pool.query(query, [
      nama_paket,
      deskripsi,
      imagePath,
      harga,
      jenis_paket,
      id,
    ]);
    res.json({ message: "Katalog berhasil diperbarui." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// DELETE KATALOG BY ID
export const deleteKatalogById = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM tb_katalog WHERE catalog_id = ?", [id]);
    res.json({ message: "Katalog berhasil dihapus." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};