import MainLayout from "../layouts/MainLayout";

export default function CreateReport() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl">

        <div className="grid gap-6 lg:grid-cols-12">

          {/* FORM */}
          <div className="lg:col-span-8">

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h1 className="mb-6 text-3xl font-bold">
                Create Report
              </h1>

              {/* Upload */}

              <div className="mb-5">

                <label className="mb-2 block font-medium">
                  Upload Evidence Photo *
                </label>

                <input
                  type="file"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3"
                />

              </div>

              {/* Description */}

              <div className="mb-5">

                <label className="mb-2 block font-medium">
                  Report Description *
                </label>

                <textarea
                  rows="8"
                  placeholder="Contoh: Di Lab Dasar Komputer FMIPA, AC mati total sejak kemarin sehingga ruangan sangat panas..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
                />

              </div>

              <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500">
                Submit Report
              </button>

            </div>

          </div>

          {/* AI PANEL */}
          <div className="lg:col-span-4">

            <div className="sticky top-24 rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="mb-5 text-xl font-bold">
                AI Analysis
              </h2>

              <div className="space-y-5">

                <div>
                  <p className="text-sm text-slate-400">
                    Predicted Category
                  </p>

                  <p className="mt-1 font-semibold text-blue-400">
                    Kelistrikan & Tata Udara (MEP)
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Recommended Urgency
                  </p>

                  <p className="mt-1 font-semibold text-orange-400">
                    Tinggi
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-400">
                    Confidence Score
                  </p>

                  <p className="mt-1 font-semibold text-green-400">
                    98.35%
                  </p>
                </div>

                <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 p-4">

                  <p className="text-sm text-slate-300">
                    AI akan menganalisis laporan secara otomatis menggunakan
                    model IndoBERT dan memberikan rekomendasi kategori serta
                    tingkat urgensi untuk membantu admin melakukan validasi.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}