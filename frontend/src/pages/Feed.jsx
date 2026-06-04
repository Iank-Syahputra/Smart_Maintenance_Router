import { useEffect, useState } from "react";
import api from "../api";

import MainLayout from "../layouts/MainLayout";
import ReportCard from "../components/ReportCard";
import TrendingPanel from "../components/TrendingPanel";

export default function Feed() {
  const [reports, setReports] = useState([]);
  const [filter, setFilter] = useState("ai");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const response = await api.get("/reports");

        const user = JSON.parse(localStorage.getItem("user"));

        const mappedReports = response.data.reports.map(
          (report) => ({
            id: report.id,
            rawText: report.rawText,
            urgency: report.adminUrgensi
              ? report.adminUrgensi.charAt(0) +
                report.adminUrgensi
                  .slice(1)
                  .toLowerCase()
              : report.aiUrgensi,
            votes: report._count?.upvotes || 0,
            hasUpvoted: user
              ? report.upvotes?.some((upvote) => upvote.userId === user.id)
              : false,
            status:
              report.status === "SELESAI"
                ? "Selesai"
                : report.status === "PENDING"
                ? "Pending"
                : report.status,
            author: report.author,
            imageUrl: report.imageUrl,
            category: report.aiKategori,
            aiUrgensi: report.aiUrgensi,
            adminUrgensi: report.adminUrgensi,
            createdAt: report.createdAt,
            commentsCount: report._count?.comments || 0,
          })
        );

        setReports(mappedReports);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Gagal memuat laporan.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const urgencyRank = {
    Tinggi: 3,
    Sedang: 2,
    Rendah: 1,
  };

  const filteredReports = [...reports];

  if (filter === "ai") {
    filteredReports.sort(
      (a, b) =>
        (urgencyRank[b.urgency] || 0) -
        (urgencyRank[a.urgency] || 0)
    );
  }

  if (filter === "upvotes") {
    filteredReports.sort(
      (a, b) => b.votes - a.votes
    );
  }

  const finalReports =
    filter === "resolved"
      ? filteredReports.filter(
          (report) => report.status === "Selesai"
        )
      : filteredReports;

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center py-10 text-slate-400">
          Loading reports...
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="text-center py-10 text-red-400">
          {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => setFilter("ai")}
          className={`rounded-full px-5 py-2 font-medium transition ${
            filter === "ai"
              ? "bg-blue-700 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          By AI
        </button>

        <button
          onClick={() => setFilter("upvotes")}
          className={`rounded-full px-5 py-2 font-medium transition ${
            filter === "upvotes"
              ? "bg-blue-700 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Most Upvoted
        </button>

        <button
          onClick={() => setFilter("resolved")}
          className={`rounded-full px-5 py-2 font-medium transition ${
            filter === "resolved"
              ? "bg-blue-700 text-white"
              : "bg-slate-800 text-slate-300 hover:bg-slate-700"
          }`}
        >
          Resolved
        </button>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="w-full lg:w-[70%]">
          <div className="space-y-8">
            {finalReports.length > 0 ? (
              finalReports.map((report) => (
                <div
                  key={report.id}
                  className="
                    border-b
                    border-slate-800
                    pb-8
                    last:border-b-0
                    last:pb-0
                  "
                >
                  <ReportCard report={report} />
                </div>
              ))
            ) : (
              <div className="text-center text-slate-400 py-10">
                Tidak ada laporan.
              </div>
            )}
          </div>
        </div>

        <div className="w-full lg:w-[30%]">
          <TrendingPanel />
        </div>
      </div>
    </MainLayout>
  );
}