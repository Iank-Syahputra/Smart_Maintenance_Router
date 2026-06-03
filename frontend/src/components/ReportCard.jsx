import { useNavigate } from "react-router-dom";
import { ThumbsUp, MessageCircle } from "lucide-react";
import StatusBadge from "./StatusBadge";
import KategoriBadge from "./KategoriBadge";

export default function ReportCard({ report }) {
  const navigate = useNavigate();
  const timeAgo = getTimeAgo(report.createdAt);

  return (
    <div
      onClick={() => navigate(`/reports/${report.id}`)}
      className="bg-white rounded-2xl border border-sky shadow-card hover:shadow-card-hover hover:border-cyan transition-all duration-200 cursor-pointer overflow-hidden active:scale-[0.99]"
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-full bg-ice flex items-center justify-center flex-shrink-0 border border-sky">
              <span className="text-sm font-bold text-ocean">
                {report.author?.namaLengkap?.charAt(0) || "?"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-navy truncate">
                {report.author?.namaLengkap || "Unknown"}
              </p>
              <p className="text-[13px] text-ocean">{timeAgo}</p>
            </div>
          </div>
          <StatusBadge status={report.status} />
        </div>

        {report.imageUrl && (
          <div className="mb-3 rounded-[12px] overflow-hidden bg-ice border border-sky/30">
            <img
              src={report.imageUrl}
              alt="Bukti kerusakan"
              className="w-full h-48 sm:h-56 object-cover"
              loading="lazy"
            />
          </div>
        )}

        <p className="text-[15px] text-navy leading-relaxed mb-4 line-clamp-3">
          {report.rawText}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          {report.aiKategori && <KategoriBadge kategori={report.aiKategori} />}
          <div className="flex items-center gap-2">
            <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border-[1.5px] transition-colors ${
              report.hasUpvoted
                ? "bg-ocean text-white border-ocean"
                : "bg-ice text-ocean border-sky"
            }`}>
              <ThumbsUp
                size={16}
                strokeWidth={report.hasUpvoted ? 2.5 : 2}
              />
              <span className="text-[13px] font-semibold">{report._count?.upvotes || 0}</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-ocean">
              <MessageCircle size={16} strokeWidth={2} />
              <span className="text-[13px] font-semibold">{report._count?.comments || 0}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function getTimeAgo(date) {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000);
  if (diff < 60) return "baru saja";
  if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)} hari lalu`;
  return new Date(date).toLocaleDateString("id-ID");
}
