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
    <div className="max-w-[680px] mx-auto px-4 pb-24">
      <div className="sticky top-16 z-30 bg-ice/95 backdrop-blur-sm pt-4 pb-3 -mx-4 px-4 border-b border-sky/40">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 bg-white rounded-lg border border-sky p-1 shadow-sm">
            <button
              onClick={() => setSort("latest")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-semibold transition-all ${
                sort === "latest" ? "bg-ocean text-white shadow" : "text-ocean/70 hover:text-ocean hover:bg-sky/20"
              }`}
            >
              <Clock size={14} strokeWidth={2.5} />
              Terbaru
            </button>
            <button
              onClick={() => setSort("trending")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] font-semibold transition-all ${
                sort === "trending" ? "bg-ocean text-white shadow" : "text-ocean/70 hover:text-ocean hover:bg-sky/20"
              }`}
            >
              <TrendingUp size={14} strokeWidth={2.5} />
              Trending
            </button>
          </div>

          <select
            value={filterKategori}
            onChange={(e) => setFilterKategori(e.target.value)}
            className="text-[13px] font-semibold text-navy border border-sky rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-ocean/30 shadow-sm"
          >
            <option value="">Semua Divisi</option>
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
        <div className="flex flex-col items-center justify-center py-20 text-ocean/50 animate-slideUp">
          <Clock size={56} strokeWidth={1.5} />
          <p className="mt-4 text-[15px] font-semibold text-navy">Belum ada laporan kerusakan</p>
          {user?.role !== "ADMIN" && (
            <>
              <p className="text-[13px] mt-1 text-ocean mb-6">Jadilah yang pertama melapor!</p>
              <button
                onClick={() => navigate("/reports/new")}
                className="px-6 py-2.5 bg-ocean text-white text-[15px] font-semibold rounded-[10px] hover:-translate-y-[1px] hover:bg-navy transition-all duration-150 shadow-md hover:shadow-lg"
              >
                Buat Laporan
              </button>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4 mt-4">
          {reports.map((report, idx) => (
            <div 
              key={report.id} 
              className="animate-slideUp"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <ReportCard report={report} />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
