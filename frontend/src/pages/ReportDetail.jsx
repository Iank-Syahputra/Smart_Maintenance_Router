import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArrowBigUp, MessageCircle, Clock3 } from "lucide-react";
import api from "../api";

import MainLayout from "../layouts/MainLayout";

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [commentError, setCommentError] = useState(null);

  const imageUrl =
    report?.imageUrl &&
    (report.imageUrl.startsWith("http")
      ? report.imageUrl
      : `http://localhost:5000${report.imageUrl}`);

  const urgencyLabel = report?.adminUrgensi
    ? report.adminUrgensi.charAt(0) +
      report.adminUrgensi.slice(1).toLowerCase()
    : report?.aiUrgensi;

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/reports/${id}`);
      setReport(response.data.report);
    } catch (err) {
      console.error("Error loading report:", err);
      setError("Gagal memuat detail laporan.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) {
      setCommentError("Komentar tidak boleh kosong.");
      return;
    }

    setCommentError(null);
    setSubmitting(true);

    try {
      await api.post(`/reports/${id}/comments`, {
        content: comment.trim(),
      });

      setComment("");
      await fetchReport();
    } catch (err) {
      console.error("Error sending comment:", err);
      setCommentError("Gagal mengirim komentar. Pastikan Anda sudah login.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-16 text-slate-500">
          Memuat laporan...
        </div>
      </MainLayout>
    );
  }

  if (error || !report) {
    return (
      <MainLayout>
        <div className="text-center py-16 text-red-500">
          {error || "Laporan tidak ditemukan."}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <img
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            }
            alt="report"
            className="h-[450px] w-full object-cover"
          />
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="mb-5 text-3xl font-bold text-slate-900">
            {report.rawText}
          </h1>

          <div className="mb-6 flex flex-wrap gap-3">
            <span className="rounded-full bg-amber-100 px-4 py-1 text-sm font-medium text-amber-700">
              {report.aiKategori}
            </span>

            <span className="rounded-full bg-orange-100 px-4 py-1 text-sm font-medium text-orange-700">
              {report.status === "SELESAI"
                ? "Selesai"
                : report.status === "PENDING"
                ? "Pending"
                : report.status}
            </span>
          </div>

          <div className="mb-6 flex flex-wrap gap-3 text-sm text-slate-500">
            <span>{urgencyLabel ? `Urgensi: ${urgencyLabel}` : ""}</span>
            <span>{`Upvotes: ${report._count?.upvotes || 0}`}</span>
            <span>{`Komentar: ${report._count?.comments || 0}`}</span>
            <span>{new Date(report.createdAt).toLocaleString()}</span>
          </div>

          <button
            className="flex items-center gap-2 rounded-xl border border-amber-300 bg-amber-50 px-5 py-3 font-medium text-amber-700 transition-all duration-300 hover:bg-amber-400 hover:text-white hover:shadow-md"
            type="button"
          >
            <ArrowBigUp size={20} />
            {report._count?.upvotes || 0} Upvotes
          </button>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <MessageCircle size={22} className="text-amber-600" />
            <h2 className="text-xl font-semibold text-slate-900">Comments</h2>
          </div>

          <textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="Tulis komentar..."
            className="mb-4 h-32 w-full rounded-xl border border-slate-300 bg-slate-50 p-4 outline-none transition focus:border-amber-400"
          />

          {commentError && (
            <div className="mb-4 text-sm text-red-500">
              {commentError}
            </div>
          )}

          <button
            onClick={handleCommentSubmit}
            disabled={submitting}
            className="mb-6 rounded-xl bg-amber-500 px-5 py-2 font-medium text-white transition-all duration-300 hover:bg-amber-400 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            type="button"
          >
            {submitting ? "Mengirim..." : "Kirim"}
          </button>

          <div className="mt-8 space-y-4">
            {report.comments.length > 0 ? (
              report.comments.map((commentItem) => (
                <div
                  key={commentItem.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="mb-2 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-slate-300" />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {commentItem.author?.namaLengkap || "Pengguna"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {new Date(commentItem.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-700">{commentItem.content}</p>
                </div>
              ))
            ) : (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-slate-500">
                Belum ada komentar.
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}