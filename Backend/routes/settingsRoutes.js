import express from "express";
import auth from "../middleware/auth.js";
import upload from "../middleware/upload.js";
import {
  getPublicSettings,
  getSettings,
  updateSettings,
} from "../controller/settingController.js";

const router = express.Router();

// PUBLIC
router.get("/public", getPublicSettings);

// ADMIN
router.get("/", auth, getSettings);
router.put("/", auth, upload.single("logo"), updateSettings);

export default router;
