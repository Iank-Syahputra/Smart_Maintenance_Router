import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import reportRoutes from "./routes/reports.js";
import commentRoutes from "./routes/comments.js";
import upvoteRoutes from "./routes/upvotes.js";
import aiRoutes from "./routes/ai.js";
import { authenticate } from "./middleware/auth.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

global.sseClients = [];

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/events", (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const client = { id: Date.now(), res };
  global.sseClients.push(client);

  res.write(`data: ${JSON.stringify({ type: "connected" })}\n\n`);

  req.on("close", () => {
    global.sseClients = global.sseClients.filter((c) => c.id !== client.id);
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/reports/:reportId/comments", authenticate, commentRoutes);
app.use("/api/reports/:reportId/upvotes", authenticate, upvoteRoutes);
app.use("/api/ai", aiRoutes);

app.use((err, req, res, next) => {
  if (err.name === "MulterError") {
    return res.status(400).json({ message: err.message });
  }
  if (err.message?.includes("Hanya file gambar")) {
    return res.status(400).json({ message: err.message });
  }
  console.error(err.stack);
  res.status(500).json({ message: "Terjadi kesalahan server" });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
