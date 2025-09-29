import express from "express";
import upload from "../middleware/upload.js";
import auth from "../middleware/auth.js";
import {
  getPublicKatalog,
  getPublicKatalogById,
  getAllKatalog,
  getKatalogById,
  createKatalog,
  updateKatalogById,
  deleteKatalogById,
} from "../controller/katalogController.js";

const router = express.Router();

// PUBLIC
router.get("/public", getPublicKatalog);
router.get("/public/:id", getPublicKatalogById);

// ADMIN
router.get("/", auth, getAllKatalog);
router.get("/:id", auth, getKatalogById);
router.post("/", auth, upload.single("gambar"), createKatalog);
router.put("/:id", auth, upload.single("gambar"), updateKatalogById);
router.delete("/:id", auth, deleteKatalogById);

export default router;