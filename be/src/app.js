import express from "express";
import productRouter from "./routers/product.js";
import authRouter from "./routers/auth.js";
import categoryRouter from "./routers/category.js";
import cartRouter from "./routers/cart.js";
import orderRouter from "./routers/order.js";
import dashboardRouter from "./routers/dashboard.js";
import paymentRouter from "./routers/payment.js";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import connectDB from "./config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
dotenv.config();

// Middleware
app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Public folder cho ảnh
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Đảm bảo thư mục uploads tồn tại
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log("Tạo thư mục uploads thành công tại:", uploadsDir);
} else {
  console.log("Thư mục uploads đã tồn tại tại:", uploadsDir);
}

// Route để phục vụ file ảnh
app.get("/api/uploads/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(uploadsDir, filename);

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ message: "File không tồn tại" });
  }

  res.sendFile(filePath);
});

// Routes khác
app.use("/api", productRouter);
app.use("/api", authRouter);
app.use("/api", categoryRouter);
app.use("/api", cartRouter);
app.use("/api", orderRouter);
app.use("/api", dashboardRouter);
app.use("/api/payment", paymentRouter);

// Kết nối MongoDB
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy trên cổng ${PORT}`);
});

export const viteNodeApp = app;
