import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ThumbsUp, Send, Trash2, AlertTriangle } from "lucide-react";
import { api } from "../api/index";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import KategoriBadge from "../components/KategoriBadge";
import LoadingSpinner from "../components/LoadingSpinner";
import { useSSE } from "../hooks/useSSE";

export default function ReportDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [report, setReport] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    Promise.all([api.reports.getById(id), api.comments.list(id)])
      .then(([r, c]) => {
        setReport(r);
        setComments(c);
      })
      .catch(() => navigate("/"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSSEEvent = useCallback((data) => {
    if (data.type === "status_update" && data.report.id === id) {
      setReport((prev) => (prev ? { ...prev, ...data.report } : prev));
    }
  }, [id]);

  useSSE(handleSSEEvent);

  const handleUpvote = async () => {
    try {
      const data = await api.upvotes.toggle(id);
      setReport((prev) => ({
        ...prev,
        hasUpvoted: data.upvoted,
        _count: { ...prev._count, upvotes: data.count },
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setSending(true);
    try {
      const data = await api.comments.create(id, newComment);
      setComments((prev) => [...prev, data.comment]);
      setNewComment("");
      setReport((prev) => ({
        ...prev,
        _count: { ...prev._count, comments: (prev._count?.comments || 0) + 1 },
      }));
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await api.comments.delete(id, commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setReport((prev) => ({
        ...prev,
        _count: { ...prev._count, comments: (prev._count?.comments || 0) - 1 },
      }));
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteReport = async () => {
    setDeleting(true);
    try {
      await api.reports.delete(id);
      navigate("/", { replace: true });
    } catch (e) {
      console.error(e);
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const canDelete = report && (user?.id === report.authorId || user?.role === "ADMIN");

  if (loading) return <LoadingSpinner fullScreen />;
  if (!report) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-lg hover:bg-gray-100">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-lg font-bold">Detail Laporan</h1>
        </div>
        {canDelete && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <Trash2 size={16} />
            <span className="hidden sm:inline">Hapus</span>
          </button>
        )}
      </div>

      {showDeleteConfirm && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-start gap-3">
            <AlertTriangle size={20} className="text-red-500 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Hapus laporan ini?</p>
              <p className="text-xs text-red-600 mt-1">
                Tindakan ini tidak dapat dibatalkan. Semua komentar dan dukungan pada laporan ini juga akan dihapus.
              </p>
              <div className="flex items-center gap-2 mt-3">
                <button
                  onClick={handleDeleteReport}
                  disabled={deleting}
                  className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                  {deleting ? "Menghapus..." : "Ya, Hapus"}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">
                  {report.author?.namaLengkap?.charAt(0) || "?"}
                </span>
              </div>
              <div>
                <p className="text-sm font-medium">{report.author?.namaLengkap}</p>
                <p className="text-xs text-gray-500">{formatTime(report.createdAt)}</p>
              </div>
            </div>
            <StatusBadge status={report.status} />
          </div>

          {report.imageUrl && (
            <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
              <img src={report.imageUrl} alt="Bukti" className="w-full h-auto max-h-96 object-cover" />
            </div>
          )}

          <p className="text-sm text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">
            {report.rawText}
          </p>

          <div className="flex items-center flex-wrap gap-2 mb-4">
            {report.aiKategori && <KategoriBadge kategori={report.aiKategori} />}
          </div>

          {report.aiUrgensi && (
            <div className="p-3 bg-gray-50 rounded-lg mb-4">
              <p className="text-xs text-gray-500">Saran AI</p>
              <p className="text-sm font-medium">
                Kategori: {kategoriLabel(report.aiKategori)} — Urgensi:{" "}
                <span className={urgensiColor(report.aiUrgensi)}>{report.aiUrgensi}</span>
                {report.aiConfidence && (
                  <span className="text-gray-400 font-normal">
                    {" "}
                    ({(report.aiConfidence * 100).toFixed(0)}%)
                  </span>
                )}
              </p>
            </div>
          )}

          <button
            onClick={handleUpvote}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
              report.hasUpvoted
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <ThumbsUp size={18} className={report.hasUpvoted ? "fill-blue-600" : ""} />
            Dukung ({report._count?.upvotes || 0})
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Komentar ({comments.length})
        </h3>

        <div className="space-y-3">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-600">
                      {comment.author?.namaLengkap?.charAt(0) || "?"}
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">{comment.author?.namaLengkap}</span>
                    {comment.author?.role === "ADMIN" && (
                      <span className="ml-1 text-[10px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
                        Admin
                      </span>
                    )}
                    <span className="text-xs text-gray-400 ml-2">{formatTime(comment.createdAt)}</span>
                  </div>
                </div>
                {(user?.id === comment.authorId || user?.role === "ADMIN") && (
                  <button
                    onClick={() => handleDeleteComment(comment.id)}
                    className="p-1 text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <p className="text-sm text-gray-700 ml-9">{comment.content}</p>
            </div>
          ))}

          {comments.length === 0 && (
            <p className="text-center text-sm text-gray-400 py-4">
              Belum ada komentar. Jadilah yang pertama!
            </p>
          )}
        </div>

        <form onSubmit={handleComment} className="mt-4 flex items-center gap-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Tulis komentar..."
            maxLength={200}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            disabled={!newComment.trim() || sending}
            className="p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
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
  if (diff < 2592000) return `${Math.floor(diff / 86400)} hari lalu`;
  return d.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
}

function kategoriLabel(k) {
  const map = { IT: "IT & Jaringan", MEP: "Kelistrikan & AC", INFRA: "Infrastruktur", PERABOTAN: "Perabotan" };
  return map[k] || k;
}

function urgensiColor(u) {
  if (u === "TINGGI") return "text-red-600 font-semibold";
  if (u === "SEDANG") return "text-yellow-600 font-semibold";
  return "text-green-600 font-semibold";
}
