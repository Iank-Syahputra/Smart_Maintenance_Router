import { Router } from "express";

const router = Router();
const AI_SERVICE_URL = process.env.AI_SERVICE_URL || "http://localhost:8000";

router.post("/predict", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ message: "Teks wajib diisi" });
    }

    const aiRes = await fetch(`${AI_SERVICE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });

    if (!aiRes.ok) {
      const errData = await aiRes.json().catch(() => ({}));
      return res.status(503).json({
        message: "AI Service sedang tidak tersedia",
        detail: errData,
      });
    }

    const data = await aiRes.json();
    res.json({
      kategori: data.kategori,
      urgensi: data.urgensi,
      confidence_kategori: data.confidence_kategori,
      confidence_urgensi: data.confidence_urgensi,
      kategori_label: data.kategori_label,
      urgensi_label: data.urgensi_label,
      probabilities_kategori: data.probabilities_kategori,
      probabilities_urgensi: data.probabilities_urgensi,
      latency_ms: data.latency_ms,
      model: "indobert-base-p2",
    });
  } catch (err) {
    res.status(503).json({
      message: "AI Service sedang tidak tersedia",
      detail: err.message,
    });
  }
});

router.post("/predict/batch", async (req, res) => {
  try {
    const { texts } = req.body;
    if (!texts || !Array.isArray(texts) || texts.length === 0) {
      return res.status(400).json({ message: "Array teks wajib diisi" });
    }

    const aiRes = await fetch(`${AI_SERVICE_URL}/predict/batch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(texts),
    });

    if (!aiRes.ok) {
      return res.status(503).json({ message: "AI Service sedang tidak tersedia" });
    }

    const data = await aiRes.json();
    res.json(data);
  } catch (err) {
    res.status(503).json({ message: "AI Service sedang tidak tersedia", detail: err.message });
  }
});

export default router;
