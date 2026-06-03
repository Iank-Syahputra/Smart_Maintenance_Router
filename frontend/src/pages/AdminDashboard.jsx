import { useState, useEffect } from "react";
import { Shield, Search } from "lucide-react";
import { api } from "../api/index";
import StatusBadge from "../components/StatusBadge";
import KategoriBadge from "../components/KategoriBadge";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterKategori, setFilterKategori] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [counts, setCounts] = useState({});

  const fetchReports = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterKategori) params.set("kategori", filterKategori);
      if (filterStatus) params.set("status", filterStatus);
      const qs = params.toString() ? `?${params.toString()}` : "";
      const data = await api.reports.list(qs);
      setReports(data);

      const all = await api.reports.list();
      const c = { ALL: all.length };
      for (const r of all) {
        if (r.aiKategori) c[r.aiKategori] = (c[r.aiKategori] || 0) + 1;
      }
      setCounts(c);
    } catch {
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(); // eslint-disable-line react-hooks/set-state-in-effect
  }, [filterKategori, filterStatus]);

  const handleStatusUpdate = async (id, data) => {
    try {
      await api.reports.updateStatus(id, data);
      fetchReports();
    } catch (_) {
      // silent
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-24">
      <div className="flex items-center gap-3 py-4">
        <Shield size={22} className="text-blue-600" />
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {[
          { key: "", label: "Semua", count: counts.ALL || 0 },
          { key: "IT", label: "IT", count: counts.IT || 0 },
          { key: "MEP", label: "MEP", count: counts.MEP || 0 },
          { key: "INFRA", label: "Infra", count: counts.INFRA || 0 },
          { key: "PERABOTAN", label: "Perabotan", count: counts.PERABOTAN || 0 },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilterKategori(tab.key)}
            className={`shrink-0 flex items-center gap-1.5 px-3.5 py-2 text-sm rounded-lg font-medium transition ${
              filterKategori === tab.key
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {tab.label}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                filterKategori === tab.key ? "bg-white/20" : "bg-gray-100 text-gray-500"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Status</option>
          <option value="MENUNGGU">Menunggu</option>
          <option value="DIPROSES">Diproses</option>
          <option value="SELESAI">Selesai</option>
        </select>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : reports.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-400">
          <Search size={48} strokeWidth={1} />
          <p className="mt-3 text-sm">Tidak ada laporan ditemukan</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-blue-600">
                      {report.author?.namaLengkap?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{report.author?.namaLengkap}</p>
                    <p className="text-xs text-gray-500">{formatTime(report.createdAt)}</p>
                  </div>
                </div>
                <StatusBadge status={report.status} />
              </div>

              {report.imageUrl && (
                <div className="mb-3 rounded-lg overflow-hidden bg-gray-100 max-h-48">
                  <img
                    src={report.imageUrl}
                    alt="Bukti"
                    className="w-full h-40 object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              <p className="text-sm text-gray-800 mb-3 line-clamp-2">{report.rawText}</p>

              <div className="flex items-center gap-2 mb-3">
                {report.aiKategori && <KategoriBadge kategori={report.aiKategori} />}
                <span className="text-xs text-gray-500">
                  👍 {report._count?.upvotes || 0}
                </span>
                <span className="text-xs text-gray-500">
                  💬 {report._count?.comments || 0}
                </span>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <p className="text-[11px] text-gray-500 uppercase tracking-wider font-semibold">
                  Saran AI
                </p>
                <p className="text-sm">
                  Kategori: {report.aiKategori || "-"} — Urgensi:{" "}
                  <span className={urgensiColor(report.aiUrgensi)}>
                    {report.aiUrgensi || "-"}
                  </span>
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-gray-500 font-medium">Admin Urgensi</label>
                  <select
                    defaultValue={report.adminUrgensi || ""}
                    onChange={(e) =>
                      handleStatusUpdate(report.id, { adminUrgensi: e.target.value || null })
                    }
                    className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">— Ikuti AI —</option>
                    <option value="TINGGI">Tinggi</option>
                    <option value="SEDANG">Sedang</option>
                    <option value="RENDAH">Rendah</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] text-gray-500 font-medium">Status</label>
                  <select
                    defaultValue={report.status}
                    onChange={(e) => handleStatusUpdate(report.id, { status: e.target.value })}
                    className="w-full mt-1 text-sm border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="MENUNGGU">Menunggu</option>
                    <option value="DIPROSES">Diproses</option>
                    <option value="SELESAI">Selesai</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatTime(date) {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return "baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function urgensiColor(u) {
  if (u === "TINGGI") return "text-red-600 font-semibold";
  if (u === "SEDANG") return "text-yellow-600 font-semibold";
  if (u === "RENDAH") return "text-green-600 font-semibold";
  return "";
}
