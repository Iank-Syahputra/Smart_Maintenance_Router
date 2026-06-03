import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, Clock } from "lucide-react";
import { api } from "../api/index";
import ReportCard from "../components/ReportCard";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSSE } from "../hooks/useSSE";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("latest");
  const [filterKategori, setFilterKategori] = useState("");

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (sort === "trending") params.set("sort", "trending");
      if (filterKategori) params.set("kategori", filterKategori);
      const qs = params.toString() ? `?${params.toString()}` : "";
      const data = await api.reports.list(qs);
      setReports(data);
    } catch (_) {
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [sort, filterKategori]);

  const handleSSEEvent = useCallback((data) => {
    if (data.type === "status_update") {
      setReports((prev) =>
        prev.map((r) => (r.id === data.report.id ? { ...r, ...data.report } : r))
      );
    }
  }, []);

  useSSE(handleSSEEvent);

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24">
      <div className="sticky top-14 z-30 bg-gray-50/95 backdrop-blur-sm pt-3 pb-2 -mx-4 px-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-0.5">
            <button
              onClick={() => setSort("latest")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                sort === "latest" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Clock size={14} />
              Terbaru
            </button>
            <button
              onClick={() => setSort("trending")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-sm font-medium transition ${
                sort === "trending" ? "bg-blue-600 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <TrendingUp size={14} />
              Trending
            </button>
          </div>

          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="text-sm border border-gray-200 rounded-lg px-2.5 py-1.5 bg-white outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Semua</option>
            <option value="IT">IT & Jaringan</option>
            <option value="MEP">Kelistrikan & AC</option>
            <option value="INFRA">Infrastruktur</option>
            <option value="PERABOTAN">Perabotan</option>
          </select>
        </div>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Clock size={48} strokeWidth={1} />
          <p className="mt-3 text-sm">Belum ada laporan kerusakan</p>
          {user?.role !== "ADMIN" && (
            <>
              <p className="text-xs mt-1">Jadilah yang pertama melapor!</p>
              <button
                onClick={() => navigate("/reports/new")}
                className="mt-4 px-5 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buat Laporan
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-3 mt-3">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}

    </div>
  );
}
