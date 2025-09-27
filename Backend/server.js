import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import authRoutes from "./routes/authRoutes.js";
import katalogRoutes from "./routes/katalogRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use("/api/auth", authRoutes);
app.use("/api/katalog", katalogRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/settings", settingsRoutes);

app.listen(port, () => {
  console.log(`🚀 Server berjalan di port ${port}`);
});
