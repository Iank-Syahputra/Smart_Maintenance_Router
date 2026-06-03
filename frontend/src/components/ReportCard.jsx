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
      className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden active:scale-[0.99] transition-transform cursor-pointer"
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <span className="text-xs font-bold text-blue-600">
                {report.author?.namaLengkap?.charAt(0) || "?"}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {report.author?.namaLengkap || "Unknown"}
              </p>
              <p className="text-xs text-gray-500">{timeAgo}</p>
            </div>
          </div>
          <StatusBadge status={report.status} />
        </div>

        {report.imageUrl && (
          <div className="mb-3 rounded-lg overflow-hidden bg-gray-100">
            <img
              src={report.imageUrl}
              alt="Bukti kerusakan"
              className="w-full h-48 sm:h-56 object-cover"
              loading="lazy"
            />
          </div>
        )}

        <p className="text-sm text-gray-800 leading-relaxed mb-3 line-clamp-3">
          {report.rawText}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-2">
          {report.aiKategori && <KategoriBadge kategori={report.aiKategori} />}
          <div className="flex items-center gap-3 text-gray-500">
            <span className="flex items-center gap-1 text-sm">
              <ThumbsUp
                size={16}
                className={report.hasUpvoted ? "fill-blue-600 text-blue-600" : ""}
              />
              {report._count?.upvotes || 0}
            </span>
            <span className="flex items-center gap-1 text-sm">
              <MessageCircle size={16} />
              {report._count?.comments || 0}
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
