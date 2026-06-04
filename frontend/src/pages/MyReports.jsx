import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ReportCard from "../components/ReportCard";
import api from "../api";

export default function MyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyReports = async () => {
      try {
        setLoading(true);

        const [userResponse, reportsResponse] =
          await Promise.all([
            api.get("/auth/me"),
            api.get("/reports"),
          ]);

        const currentUser = userResponse.data;

        const allReports =
          reportsResponse.data?.reports || [];

        const myReports = allReports.filter(
          (report) =>
            report.authorId === currentUser.id
        );

        const mappedReports = myReports.map(
          (report) => ({
            id: report.id,
            title: report.rawText,

            urgency: report.adminUrgensi
              ? report.adminUrgensi.charAt(0) +
                report.adminUrgensi
                  .slice(1)
                  .toLowerCase()
              : report.aiUrgensi,

            votes:
              report._count?.upvotes || 0,

            status:
              report.status === "SELESAI"
                ? "Selesai"
                : report.status === "PENDING"
                ? "Pending"
                : report.status,

            author: report.author,
            imageUrl: report.imageUrl,
            category: report.aiKategori,
            createdAt: report.createdAt,
            commentsCount:
              report._count?.comments || 0,
          })
        );

        setReports(mappedReports);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Gagal memuat laporan."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMyReports();
  }, []);

  return (
    <MainLayout>
      <div>
        <h1 className="mb-6 text-3xl font-bold">
          My Reports
        </h1>

        {loading && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            Loading reports...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {reports.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 text-slate-500">
                Anda belum memiliki laporan.
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {reports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </MainLayout>
  );
}