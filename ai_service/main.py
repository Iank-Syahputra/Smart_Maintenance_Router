import os
import sys
import time
import logging
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

sys.path.insert(0, str(Path(__file__).parent))
from model import KlasifikasiLaporan  # noqa: E402

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("ai-service")

MODEL_DIR = os.getenv("MODEL_DIR", str(Path(__file__).resolve().parent.parent / "models"))
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))

logger.info("Loading models from %s ...", MODEL_DIR)
clf = KlasifikasiLaporan(MODEL_DIR)
logger.info("Models loaded successfully!")

app = FastAPI(
    title="Smart Maintenance AI Service",
    description="NLP Inference Engine using IndoBERT for report classification",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictRequest(BaseModel):
    text: str = Field(..., min_length=1, description="Report text in Indonesian")


class PredictResponse(BaseModel):
    kategori: str
    urgensi: str
    confidence_kategori: float
    confidence_urgensi: float
    kategori_label: str | None = None
    urgensi_label: str | None = None
    probabilities_kategori: dict[str, float] | None = None
    probabilities_urgensi: dict[str, float] | None = None
    latency_ms: float | None = None


class HealthResponse(BaseModel):
    status: str
    device: str
    model: str


@app.get("/health", response_model=HealthResponse)
def health():
    return HealthResponse(
        status="ok",
        device=str(clf.device),
        model="indobenchmark/indobert-base-p2",
    )


@app.post("/predict", response_model=PredictResponse)
def predict(req: PredictRequest):
    start = time.time()
    result = clf.predict(req.text)
    latency = round((time.time() - start) * 1000, 2)

    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])

    return PredictResponse(
        kategori=result["kategori"],
        urgensi=result["urgensi"],
        confidence_kategori=result["confidence_kategori"],
        confidence_urgensi=result["confidence_urgensi"],
        kategori_label=result.get("kategori_label"),
        urgensi_label=result.get("urgensi_label"),
        probabilities_kategori=result.get("probabilities_kategori"),
        probabilities_urgensi=result.get("probabilities_urgensi"),
        latency_ms=latency,
    )


@app.post("/predict/batch")
def predict_batch(texts: list[str]):
    start = time.time()
    results = clf.predict_batch(texts)
    latency = round((time.time() - start) * 1000, 2)
    return {"results": results, "latency_ms": latency, "count": len(results)}
