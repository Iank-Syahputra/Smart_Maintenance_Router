import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api";

export default function AdminDashboard() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);

        const response = await api.get("/reports");

        const reportsData =
          response.data?.reports || [];

        setReports(reportsData);

        const total = reportsData.length;

        const pending = reportsData.filter(
          (report) =>
            report.status?.toUpperCase() ===
            "PENDING"
        ).length;

        const inProgress = reportsData.filter(
          (report) =>
            report.status?.toUpperCase() ===
              "DIPROSES" ||
            report.status?.toUpperCase() ===
              "IN_PROGRESS"
        ).length;

        const resolved = reportsData.filter(
          (report) =>
            report.status?.toUpperCase() ===
            "SELESAI"
        ).length;

        setStats({
          total,
          pending,
          inProgress,
          resolved,
        });
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Gagal memuat data dashboard."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        {loading && (
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            Loading dashboard...
          </div>
        )}

        {error && (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            {/* Stats */}

            <div className="grid gap-4 md:grid-cols-4">
              <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
                <h3 className="text-slate-500">
                  Total Reports
                </h3>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stats.total}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
                <h3 className="text-slate-500">
                  Pending
                </h3>

                <p className="mt-2 text-3xl font-bold text-yellow-600">
                  {stats.pending}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
                <h3 className="text-slate-500">
                  In Progress
                </h3>

                <p className="mt-2 text-3xl font-bold text-amber-500">
                  {stats.inProgress}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
                <h3 className="text-slate-500">
                  Resolved
                </h3>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  {stats.resolved}
                </p>
              </div>
            </div>

            {/* FILTER */}

            <div className="flex flex-wrap gap-3">
              <button
                className="
                rounded-full
                bg-yellow-400
                px-5
                py-2
                font-medium
                text-slate-900
                transition-all
                hover:bg-yellow-300
                hover:shadow-lg
                hover:shadow-yellow-200
                "
              >
                Semua
              </button>

              <button
                className="
                rounded-full
                border
                border-slate-300
                bg-white
                px-5
                py-2
                transition-all
                hover:border-yellow-400
                hover:text-yellow-600
                "
              >
                IT
              </button>

              <button
                className="
                rounded-full
                border
                border-slate-300
                bg-white
                px-5
                py-2
                transition-all
                hover:border-yellow-400
                hover:text-yellow-600
                "
              >
                MEP
              </button>

              <button
                className="
                rounded-full
                border
                border-slate-300
                bg-white
                px-5
                py-2
                transition-all
                hover:border-yellow-400
                hover:text-yellow-600
                "
              >
                Infrastruktur
              </button>

              <button
                className="
                rounded-full
                border
                border-slate-300
                bg-white
                px-5
                py-2
                transition-all
                hover:border-yellow-400
                hover:text-yellow-600
                "
              >
                Furniture
              </button>
            </div>

            {/* TABLE */}

            <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
              <table className="w-full">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-4 text-left text-slate-700">
                      Report
                    </th>

                    <th className="p-4 text-left text-slate-700">
                      AI Category
                    </th>

                    <th className="p-4 text-left text-slate-700">
                      AI Urgency
                    </th>

                    <th className="p-4 text-left text-slate-700">
                      Votes
                    </th>

                    <th className="p-4 text-left text-slate-700">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {reports.length > 0 ? (
                    reports.map((report) => (
                      <tr
                        key={report.id}
                        className="
                        border-t
                        border-slate-200
                        transition
                        hover:bg-slate-50
                        "
                      >
                        <td className="p-4 text-slate-900">
                          {report.rawText}
                        </td>

                        <td className="p-4 text-slate-700">
                          {report.aiKategori}
                        </td>

                        <td className="p-4 font-medium text-red-500">
                          {report.adminUrgensi ||
                            report.aiUrgensi}
                        </td>

                        <td className="p-4 text-slate-700">
                          {report._count
                            ?.upvotes || 0}
                        </td>

                        <td className="p-4">
                          <span
                            className={`
                              rounded-full
                              px-3
                              py-1
                              text-sm
                              font-medium
                              ${
                                report.status ===
                                "SELESAI"
                                  ? "bg-green-100 text-green-700"
                                  : report.status ===
                                    "PENDING"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-blue-100 text-blue-700"
                              }
                            `}
                          >
                            {report.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-6 text-center text-slate-500"
                      >
                        Tidak ada laporan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}