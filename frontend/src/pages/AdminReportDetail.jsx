import MainLayout from "../layouts/MainLayout";

export default function AdminReportDetail() {
  return (
    <MainLayout>

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-6 lg:grid-cols-12">

          {/* REPORT */}

          <div className="lg:col-span-8">

            <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
                alt=""
                className="h-[400px] w-full object-cover"
              />

              <div className="p-6">

                <h1 className="mb-4 text-3xl font-bold">
                  AC Lab Dasar Mati Total
                </h1>

                <div className="mb-6 flex flex-wrap gap-3">

                  <span className="rounded-full bg-blue-600 px-4 py-2 text-sm">
                    MEP
                  </span>

                  <span className="rounded-full bg-red-600 px-4 py-2 text-sm">
                    Urgensi Tinggi
                  </span>

                  <span className="rounded-full bg-orange-600 px-4 py-2 text-sm">
                    Diproses
                  </span>

                </div>

                <div className="mb-6 flex items-center gap-6">

                  <button className="rounded-xl bg-slate-800 px-4 py-2 hover:bg-slate-700">
                    ▲ 42 Upvotes
                  </button>

                  <span className="text-slate-400">
                    15 Komentar
                  </span>

                </div>

              </div>

            </div>

            {/* COMMENTS */}

            <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="mb-4 text-xl font-bold">
                Discussion
              </h2>

              <textarea
                rows="3"
                placeholder="Balas laporan ini..."
                className="mb-4 w-full rounded-xl border border-slate-700 bg-slate-800 p-3"
              />

              <button className="rounded-xl bg-blue-600 px-5 py-2 hover:bg-blue-500">
                Kirim Balasan
              </button>

              <div className="mt-8 space-y-4">

                <div className="rounded-xl bg-slate-800 p-4">

                  <div className="mb-2 flex items-center gap-3">

                    <img
                      src="https://i.pravatar.cc/40"
                      alt=""
                      className="h-8 w-8 rounded-full"
                    />

                    <div>
                      <p className="font-semibold">
                        Mahasiswa FMIPA
                      </p>

                      <p className="text-xs text-slate-400">
                        2 jam lalu
                      </p>
                    </div>

                  </div>

                  <p>
                    Sudah 2 hari AC tidak menyala.
                  </p>

                </div>

                <div className="rounded-xl bg-slate-800 p-4">

                  <div className="mb-2 flex items-center gap-3">

                    <img
                      src="https://i.pravatar.cc/41"
                      alt=""
                      className="h-8 w-8 rounded-full"
                    />

                    <div>
                      <p className="font-semibold">
                        Admin FMIPA
                      </p>

                      <p className="text-xs text-slate-400">
                        1 jam lalu
                      </p>
                    </div>

                  </div>

                  <p>
                    Laporan sudah diteruskan ke teknisi.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* ADMIN PANEL */}

          <div className="lg:col-span-4">

            <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="mb-5 text-xl font-bold">
                Admin Control
              </h2>

              <div className="space-y-5">

                <div>

                  <p className="mb-2 text-sm text-slate-400">
                    AI Category
                  </p>

                  <div className="rounded-xl bg-slate-800 p-3">
                    Kelistrikan & Tata Udara (MEP)
                  </div>

                </div>

                <div>

                  <p className="mb-2 text-sm text-slate-400">
                    AI Suggested Urgency
                  </p>

                  <div className="rounded-xl bg-slate-800 p-3 text-red-400">
                    Tinggi
                  </div>

                </div>

                <div>

                  <p className="mb-2 text-sm text-slate-400">
                    Community Support
                  </p>

                  <div className="rounded-xl bg-slate-800 p-3">
                    42 Upvotes
                  </div>

                </div>

                <div>

                  <label className="mb-2 block text-sm text-slate-400">
                    Override Urgency
                  </label>

                  <select className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3">

                    <option>Rendah</option>
                    <option>Sedang</option>
                    <option>Tinggi</option>

                  </select>

                </div>

                <div>

                  <label className="mb-2 block text-sm text-slate-400">
                    Update Status
                  </label>

                  <select className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3">

                    <option>Pending</option>
                    <option>Diproses</option>
                    <option>Selesai</option>

                  </select>

                </div>

                <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-500">
                  Simpan Perubahan
                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}