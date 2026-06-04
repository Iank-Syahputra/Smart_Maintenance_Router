import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

import MainLayout from "../layouts/MainLayout";

export default function CreateReport() {
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files?.[0] || null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!description.trim()) {
      setError("Deskripsi laporan wajib diisi.");
      return;
    }

    if (!file) {
      setError("Foto bukti kerusakan wajib diunggah.");
      return;
    }

    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("text", description.trim());
      formData.append("image", file);

      await api.post("/reports", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSuccess("Laporan berhasil dikirim.");
      setDescription("");
      setFile(null);

      navigate("/");
    } catch (err) {
      console.error("Error submitting report:", err);
      setError(
        err.response?.data?.message ||
          "Gagal mengirim laporan. Pastikan Anda sudah login."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h1 className="mb-6 text-3xl font-bold text-slate-900">
                Create Report
              </h1>

              {error && (
                <div className="mb-4 rounded-xl bg-red-100 px-4 py-3 text-red-700">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-4 rounded-xl bg-green-100 px-4 py-3 text-green-700">
                  {success}
                </div>
              )}

              <div className="mb-5">
                <label className="mb-2 block font-medium text-slate-700">
                  Upload Evidence Photo *
                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-700"
                />
              </div>

              <div className="mb-5">
                <label className="mb-2 block font-medium text-slate-700">
                  Report Description *
                </label>

                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows="8"
                  placeholder="Contoh: Di Lab Dasar Komputer FMIPA, AC mati total sejak kemarin sehingga ruangan sangat panas..."
                  className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 text-slate-700 outline-none transition focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-amber-500 py-3 font-semibold text-white transition-all duration-300 hover:bg-amber-400 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Mengirim laporan..." : "Submit Report"}
              </button>
            </form>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="mb-5 text-xl font-bold text-slate-900">
                AI Analysis
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="text-sm text-slate-500">Predicted Category</p>
                  <p className="mt-1 font-semibold text-amber-600">
                    Kelistrikan & Tata Udara (MEP)
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Recommended Urgency</p>
                  <p className="mt-1 font-semibold text-red-500">Tinggi</p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">Confidence Score</p>
                  <p className="mt-1 font-semibold text-green-600">98.35%</p>
                </div>

                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="text-sm text-slate-700">
                    AI akan menganalisis laporan secara otomatis menggunakan model
                    IndoBERT dan memberikan rekomendasi kategori serta tingkat
                    urgensi untuk membantu admin melakukan validasi.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}