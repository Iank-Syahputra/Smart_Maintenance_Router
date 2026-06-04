import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import api from "../api";

export default function AdminReportDetail() {
  const { id } = useParams();

  const [report, setReport] = useState(null);

  const [status, setStatus] =
    useState("PENDING");

  const [urgency, setUrgency] =
    useState("RENDAH");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const fetchReport = async () => {
    try {
      setLoading(true);

      const response =
        await api.get(
          `/reports/${id}`
        );

      const reportData =
        response.data.report;

      setReport(reportData);

      setStatus(reportData.status);

      setUrgency(
        reportData.adminUrgensi ||
          "RENDAH"
      );
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

  useEffect(() => {
    fetchReport();
  }, [id]);

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await api.patch(
        `/reports/${id}/status`,
        {
          status,
        }
      );

      await api.patch(
        `/reports/${id}/urgency`,
        {
          adminUrgensi: urgency,
        }
      );

      setSuccess(
        "Perubahan berhasil disimpan."
      );

      await fetchReport();
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Gagal menyimpan perubahan."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="p-8">
          Loading...
        </div>
      </MainLayout>
    );
  }

  if (error && !report) {
    return (
      <MainLayout>
        <div className="p-8 text-red-500">
          {error}
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-12">
          {/* REPORT */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white/90 shadow-md backdrop-blur">
              <img
                src={
                  report.imageUrl ===
                  "no-image"
                    ? "https://via.placeholder.com/1200x400?text=No+Image"
                    : `http://localhost:5000${report.imageUrl}`
                }
                alt=""
                className="h-[400px] w-full object-cover"
              />

              <div className="p-6">
                <h1 className="mb-4 text-3xl font-bold text-slate-900">
                  {report.rawText}
                </h1>

                <div className="mb-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-800">
                    {report.aiKategori}
                  </span>

                  <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
                    Urgensi{" "}
                    {report.adminUrgensi ||
                      report.aiUrgensi}
                  </span>

                  <span className="rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
                    {report.status}
                  </span>
                </div>

                <div className="mb-6 flex items-center gap-6">
                  <button className="rounded-xl border border-slate-300 bg-slate-100 px-4 py-2 text-slate-800">
                    ▲{" "}
                    {report._count?.upvotes ||
                      0}{" "}
                    Upvotes
                  </button>

                  <span className="text-slate-500">
                    {report._count
                      ?.comments || 0}{" "}
                    Komentar
                  </span>
                </div>
              </div>
            </div>

            {/* COMMENTS */}

            <div className="mt-6 rounded-2xl border border-slate-300 bg-white/90 p-6 shadow-md backdrop-blur">
              <h2 className="mb-4 text-xl font-bold text-slate-900">
                Discussion
              </h2>

              <div className="space-y-4">
                {report.comments
                  ?.length > 0 ? (
                  report.comments.map(
                    (comment) => (
                      <div
                        key={comment.id}
                        className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                      >
                        <div className="mb-2 flex items-center gap-3">
                          <img
                            src={
                              comment.author
                                ?.avatarUrl ||
                              "https://i.pravatar.cc/40"
                            }
                            alt=""
                            className="h-8 w-8 rounded-full"
                          />

                          <div>
                            <p className="font-semibold text-slate-900">
                              {
                                comment
                                  .author
                                  ?.namaLengkap
                              }
                            </p>

                            <p className="text-xs text-slate-500">
                              {new Date(
                                comment.createdAt
                              ).toLocaleString()}
                            </p>
                          </div>
                        </div>

                        <p className="text-slate-700">
                          {
                            comment.content
                          }
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-slate-500">
                    Belum ada komentar.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* ADMIN PANEL */}

          <div className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-slate-300 bg-white/90 p-6 shadow-md backdrop-blur">
              <h2 className="mb-5 text-xl font-bold text-slate-900">
                Admin Control
              </h2>

              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-sm text-slate-500">
                    AI Category
                  </p>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800">
                    {report.aiKategori}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm text-slate-500">
                    AI Suggested
                    Urgency
                  </p>

                  <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-red-600">
                    {report.aiUrgensi}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm text-slate-500">
                    Community Support
                  </p>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-slate-800">
                    {
                      report._count
                        ?.upvotes
                    }{" "}
                    Upvotes
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-500">
                    Override
                    Urgency
                  </label>

                  <select
                    value={urgency}
                    onChange={(e) =>
                      setUrgency(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white p-3"
                  >
                    <option value="RENDAH">
                      Rendah
                    </option>

                    <option value="SEDANG">
                      Sedang
                    </option>

                    <option value="TINGGI">
                      Tinggi
                    </option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-slate-500">
                    Update Status
                  </label>

                  <select
                    value={status}
                    onChange={(e) =>
                      setStatus(
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 bg-white p-3"
                  >
                    <option value="PENDING">
                      Pending
                    </option>

                    <option value="DIPROSES">
                      Diproses
                    </option>

                    <option value="SELESAI">
                      Selesai
                    </option>
                  </select>
                </div>

                {success && (
                  <div className="rounded-xl bg-green-100 p-3 text-sm text-green-700">
                    {success}
                  </div>
                )}

                {error && (
                  <div className="rounded-xl bg-red-100 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <button
                  onClick={
                    handleSave
                  }
                  disabled={saving}
                  className="
                  w-full
                  rounded-xl
                  bg-yellow-500
                  py-3
                  font-semibold
                  text-black
                  transition
                  hover:bg-yellow-400
                  hover:shadow-lg
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  "
                >
                  {saving
                    ? "Menyimpan..."
                    : "Simpan Perubahan"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}