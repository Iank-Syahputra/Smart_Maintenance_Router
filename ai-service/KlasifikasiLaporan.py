import json
import pickle
from pathlib import Path

import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification



class KlasifikasiLaporan:
    """Main class for campus facility damage report classification.
    
    Usage:
        model = KlasifikasiLaporan("../models")
        result = model.predict("AC ruang kelas mati, panas sekali")
        print(result["kategori"])  # -> "Kelistrikan & Tata Udara (MEP)"
        print(result["urgensi"])   # -> "Tinggi"
    """

    def __init__(self, model_dir="../models"):
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        model_path = Path(model_dir)

        with open(model_path / "label_encoder_kategori.pkl", "rb") as f:
            self.le_kategori = pickle.load(f)
        with open(model_path / "label_encoder_urgensi.pkl", "rb") as f:
            self.le_urgensi = pickle.load(f)

        self.tokenizer = AutoTokenizer.from_pretrained(str(model_path / "tokenizer"))

        self.model_kategori = AutoModelForSequenceClassification.from_pretrained(
            str(model_path / "kategori")
        ).to(self.device).eval()

        self.model_urgensi = AutoModelForSequenceClassification.from_pretrained(
            str(model_path / "urgensi")
        ).to(self.device).eval()

    def predict(self, text):
        if not isinstance(text, str) or not text.strip():
            return {"error": "Input must be a non-empty string"}

        clean = text.strip().lower()
        inputs = self.tokenizer(
            clean, truncation=True, padding="max_length",
            max_length=256, return_tensors="pt"
        ).to(self.device)

        with torch.no_grad():
            out_k = self.model_kategori(**inputs)
            out_u = self.model_urgensi(**inputs)

        prob_k = torch.softmax(out_k.logits, dim=1).cpu().numpy()[0]
        prob_u = torch.softmax(out_u.logits, dim=1).cpu().numpy()[0]

        idx_k = prob_k.argmax()
        idx_u = prob_u.argmax()

        return {
            "kategori": self.le_kategori.classes_[idx_k],
            "urgensi": self.le_urgensi.classes_[idx_u],
            "confidence_kategori": float(prob_k[idx_k]),
            "confidence_urgensi": float(prob_u[idx_u]),
            "probabilities_kategori": {
                str(cls): float(p)
                for cls, p in zip(self.le_kategori.classes_, prob_k)
            },
            "probabilities_urgensi": {
                str(cls): float(p)
                for cls, p in zip(self.le_urgensi.classes_, prob_u)
            },
        }

    def predict_batch(self, texts):
        return [self.predict(t) for t in texts]


    if __name__ == "__main__":
        clf = KlasifikasiLaporan("models")

        res = clf.predict(
            "AC ruang kelas mati total, panas sekali kasian kita belajar di dalam."
        )

        print(res)