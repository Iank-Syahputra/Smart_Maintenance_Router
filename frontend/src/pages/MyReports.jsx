import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { ClipboardList, Trash2, AlertTriangle } from "lucide-react";
import { api } from "../api/index";
import { useAuth } from "../context/AuthContext";
import ReportCard from "../components/ReportCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSSE } from "../hooks/useSSE";

export default function MyReports() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const data = await api.reports.list(filter ? `?status=${filter}` : "");
      setReports(data);
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [filter]);

  const handleSSEEvent = useCallback((data) => {
    if (data.type === "status_update") {
      setReports((prev) =>
        prev.map((r) => (r.id === data.report.id ? { ...r, ...data.report } : r))
      );
    }
  }, []);

  useSSE(handleSSEEvent);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      await api.reports.delete(deleteId);
      setReports((prev) => prev.filter((r) => r.id !== deleteId));
      setDeleteId(null);
    } catch (e) {
      console.error(e);
    } finally {
      setDeleting(false);
    }
  };

  const myReports = reports.filter((r) => r.authorId === user?.id);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24">
      <div className="flex items-center gap-3 py-4">
        <ClipboardList size={22} className="text-blue-600" />
        <h1 className="text-lg font-bold">Laporan Saya</h1>
      </div>

      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-1">
        {["", "MENUNGGU", "DIPROSES", "SELESAI"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`shrink-0 px-3 py-1.5 text-sm rounded-lg font-medium transition ${
              filter === s
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {s ? statusLabel(s) : "Semua"}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : myReports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <ClipboardList size={48} strokeWidth={1} />
          <p className="mt-3 text-sm">Belum ada laporan</p>
          <button
            onClick={() => navigate("/reports/new")}
            className="mt-3 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
          >
            Buat Laporan
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {myReports.map((r) => (
            <div key={r.id} className="relative group">
              <ReportCard report={r} />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setDeleteId(r.id);
                }}
                className="absolute top-3 right-3 p-2 bg-white/90 border border-gray-200 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm hover:bg-red-50 hover:border-red-200 md:opacity-0 md:group-hover:opacity-100"
                title="Hapus laporan"
              >
                <Trash2 size={16} className="text-red-500" />
              </button>
            </div>
          ))}
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle size={22} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-gray-900">Hapus laporan?</p>
                <p className="text-xs text-gray-500 mt-1">
                  Laporan akan dihapus permanen beserta komentar dan dukungan di dalamnya.
                </p>
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                  >
                    {deleting ? "Menghapus..." : "Ya, Hapus"}
                  </button>
                  <button
                    onClick={() => setDeleteId(null)}
                    className="px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function statusLabel(s) {
  const map = { MENUNGGU: "Menunggu", DIPROSES: "Diproses", SELESAI: "Selesai" };
  return map[s] || s;
}
