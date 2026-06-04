import MainLayout from "../layouts/MainLayout";

export default function CreateReport() {
  return (
    <MainLayout>

      <div className="mx-auto max-w-7xl">

        <div className="grid gap-6 lg:grid-cols-12">

          {/* FORM */}

          <div className="lg:col-span-8">

            <div
              className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              "
            >

              <h1
                className="
                mb-6
                text-3xl
                font-bold
                text-slate-900
                "
              >
                Create Report
              </h1>

              {/* Upload */}

              <div className="mb-5">

                <label
                  className="
                  mb-2
                  block
                  font-medium
                  text-slate-700
                  "
                >
                  Upload Evidence Photo *
                </label>

                <input
                  type="file"
                  className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-slate-50
                  p-3
                  text-slate-700
                  "
                />

              </div>

              {/* Description */}

              <div className="mb-5">

                <label
                  className="
                  mb-2
                  block
                  font-medium
                  text-slate-700
                  "
                >
                  Report Description *
                </label>

                <textarea
                  rows="8"
                  placeholder="Contoh: Di Lab Dasar Komputer FMIPA, AC mati total sejak kemarin sehingga ruangan sangat panas..."
                  className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  bg-slate-50
                  p-3
                  text-slate-700
                  outline-none
                  transition
                  focus:border-amber-400
                  "
                />

              </div>

              <button
                className="
                w-full
                rounded-xl
                bg-amber-500
                py-3
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-amber-400
                hover:shadow-lg
                hover:shadow-amber-300/50
                "
              >
                Submit Report
              </button>

            </div>

          </div>

          {/* AI PANEL */}

          <div className="lg:col-span-4">

            <div
              className="
              sticky
              top-24
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-sm
              "
            >

              <h2
                className="
                mb-5
                text-xl
                font-bold
                text-slate-900
                "
              >
                AI Analysis
              </h2>

              <div className="space-y-5">

                <div>

                  <p className="text-sm text-slate-500">
                    Predicted Category
                  </p>

                  <p
                    className="
                    mt-1
                    font-semibold
                    text-amber-600
                    "
                  >
                    Kelistrikan & Tata Udara (MEP)
                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Recommended Urgency
                  </p>

                  <p
                    className="
                    mt-1
                    font-semibold
                    text-red-500
                    "
                  >
                    Tinggi
                  </p>

                </div>

                <div>

                  <p className="text-sm text-slate-500">
                    Confidence Score
                  </p>

                  <p
                    className="
                    mt-1
                    font-semibold
                    text-green-600
                    "
                  >
                    98.35%
                  </p>

                </div>

                <div
                  className="
                  rounded-xl
                  border
                  border-amber-200
                  bg-amber-50
                  p-4
                  "
                >

                  <p
                    className="
                    text-sm
                    text-slate-700
                    "
                  >
                    AI akan menganalisis laporan secara otomatis
                    menggunakan model IndoBERT dan memberikan
                    rekomendasi kategori serta tingkat urgensi
                    untuk membantu admin melakukan validasi.
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