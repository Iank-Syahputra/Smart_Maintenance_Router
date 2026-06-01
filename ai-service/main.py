from fastapi import FastAPI
from pydantic import BaseModel

from KlasifikasiLaporan import KlasifikasiLaporan

app = FastAPI(
    title="Smart Maintenance Router AI Service",
    version="1.0.0"
)

model = KlasifikasiLaporan("models")


class PredictionRequest(BaseModel):
    text: str


@app.get("/")
def root():
    return {
        "status": "running",
        "service": "Smart Maintenance Router AI"
    }


@app.post("/predict")
def predict(data: PredictionRequest):

    result = model.predict(data.text)

    return result