import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import ReportCard from "../components/ReportCard";
import TrendingPanel from "../components/TrendingPanel";

export default function Feed() {
  const reports = [
    {
      id: 1,
      title: "AC Lab Dasar Mati",
      urgency: "Tinggi",
      votes: 42,
      status: "Diproses",
    },
    {
      id: 2,
      title: "Proyektor Ruang A Rusak",
      urgency: "Sedang",
      votes: 15,
      status: "Pending",
    },
    {
      id: 3,
      title: "Kursi Kuliah Patah",
      urgency: "Rendah",
      votes: 8,
      status: "Selesai",
    },
    {
      id: 4,
      title: "Internet FMIPA Putus",
      urgency: "Tinggi",
      votes: 90,
      status: "Diproses",
    },
  ];

  const [filter, setFilter] = useState("ai");

  const urgencyRank = {
    Tinggi: 3,
    Sedang: 2,
    Rendah: 1,
  };

  const filteredReports = [...reports];

  if (filter === "ai") {
    filteredReports.sort(
      (a, b) =>
        urgencyRank[b.urgency] -
        urgencyRank[a.urgency]
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

  return (
    <MainLayout>

      {/* Filter Buttons */}
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

      {/* Main Content */}
      <div className="flex flex-col gap-8 lg:flex-row">

        {/* Feed */}
        <div className="w-full lg:w-[70%]">

          <div className="space-y-8">

            {finalReports.map((report) => (
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
            ))}

          </div>

        </div>

        {/* Trending */}
        <div className="w-full lg:w-[30%]">

          <TrendingPanel />

        </div>

      </div>

    </MainLayout>
  );
}