import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ImageIcon } from "lucide-react";
import { api } from "../api/index";

export default function NewReport() {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Hanya file gambar yang diizinkan");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran maksimal 5MB");
      return;
    }
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      setError("Foto bukti kerusakan wajib diupload");
      return;
    }
    if (!text.trim()) {
      setError("Deskripsi kerusakan wajib diisi");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const fd = new FormData();
      fd.append("image", image);
      fd.append("rawText", text);
      await api.reports.create(fd);
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24">
      <div className="flex items-center gap-3 py-4">
        <button onClick={() => navigate(-1)} className="p-2 rounded-lg hover:bg-gray-100">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-lg font-bold">Buat Laporan Baru</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-50 rounded-lg">{error}</div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto Bukti Kerusakan <span className="text-red-500">*</span>
          </label>
          <label
            className={`relative flex flex-col items-center justify-center h-48 border-2 border-dashed rounded-xl cursor-pointer transition ${
              preview ? "border-blue-400 bg-blue-50/30" : "border-gray-300 bg-gray-50 hover:bg-gray-100"
            }`}
          >
            {preview ? (
              <img src={preview} alt="Preview" className="h-full w-full object-cover rounded-xl" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-gray-400">
                <ImageIcon size={40} strokeWidth={1} />
                <p className="text-sm font-medium">Tap untuk upload foto</p>
                <p className="text-xs">atau ambil dari kamera</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleImage}
              className="hidden"
            />
          </label>
          {preview && (
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
              className="mt-1 text-xs text-red-600 hover:underline"
            >
              Hapus foto
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Kerusakan <span className="text-red-500">*</span>
          </label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Sebutkan ruangannya, misal: Di Lab Dasar Komputer FMIPA, kabel proyektor putus. Mohon segera diperbaiki karena ada praktikum besok."
            rows={5}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            maxLength={500}
          />
          <p className="text-xs text-gray-400 mt-1 text-right">{text.length}/500</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
        >
          {loading ? "Mengirim..." : "Kirim Laporan"}
        </button>
      </form>
    </div>
  );
}
