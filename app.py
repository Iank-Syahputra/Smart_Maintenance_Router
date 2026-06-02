import streamlit as st
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), "ai-service"))
from KlasifikasiLaporan import KlasifikasiLaporan
from pathlib import Path

st.set_page_config(
    page_title="Smart Maintenance Router",
    page_icon="🏫",
    layout="wide"
)

@st.cache_resource
def load_model():
    model_dir = Path(__file__).resolve().parent / "ai-service" / "models"
    return KlasifikasiLaporan(str(model_dir))

model = load_model()

st.title("🏫 Smart Maintenance Router")
st.subheader("Sistem Klasifikasi Laporan Kerusakan Fasilitas Kampus")

laporan = st.text_area(
    "Masukkan laporan kerusakan",
    height=200,
    placeholder="Contoh: AC ruang kelas mati total dan ruangan sangat panas..."
)

if st.button("🔍 Analisis Laporan"):

    if laporan.strip():

        hasil = model.predict(laporan)

        col1, col2 = st.columns(2)

        with col1:
            st.success("Kategori")
            st.markdown(f"### {hasil['kategori']}")
            st.progress(float(hasil["confidence_kategori"]))

        with col2:
            st.warning("Urgensi")
            st.markdown(f"### {hasil['urgensi']}")
            st.progress(float(hasil["confidence_urgensi"]))

        st.divider()

        st.subheader("Confidence Score")

        st.write(
            f"Kategori: {hasil['confidence_kategori']:.2%}"
        )

        st.write(
            f"Urgensi: {hasil['confidence_urgensi']:.2%}"
        )

        st.subheader("Probabilitas Kategori")

        st.json(
            hasil["probabilities_kategori"]
        )

        st.subheader("Probabilitas Urgensi")

        st.json(
            hasil["probabilities_urgensi"]
        )

    else:
        st.error("Masukkan laporan terlebih dahulu")