import MainLayout from "../layouts/MainLayout";
import { ArrowBigUp, MessageCircle } from "lucide-react";

export default function ReportDetail() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl">

        {/* Image */}
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="report"
            className="h-[450px] w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h1 className="mb-4 text-3xl font-bold">
            AC Lab Dasar Mati Total
          </h1>

          <div className="mb-6 flex flex-wrap gap-3">

            <span className="rounded-full bg-blue-600 px-4 py-1 text-sm">
              Kelistrikan & Tata Udara
            </span>

            <span className="rounded-full bg-orange-600 px-4 py-1 text-sm">
              Diproses
            </span>

          </div>

          <button className="flex items-center gap-2 rounded-xl border border-blue-500 px-5 py-3 text-blue-400 transition hover:bg-blue-500 hover:text-white">
            <ArrowBigUp />
            42 Upvotes
          </button>

        </div>

        {/* Comments */}
        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <div className="mb-6 flex items-center gap-2">
            <MessageCircle />
            <h2 className="text-xl font-semibold">
              Comments
            </h2>
          </div>

          {/* Comment Input */}

          <textarea
            placeholder="Tulis komentar..."
            className="mb-4 h-32 w-full rounded-xl border border-slate-700 bg-slate-800 p-4 outline-none focus:border-blue-500"
          />

          <button className="rounded-xl bg-blue-600 px-5 py-2 font-medium hover:bg-blue-500">
            Kirim
          </button>

          {/* Comment List */}

          <div className="mt-8 space-y-4">

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="font-semibold text-blue-400">
                Admin FMIPA
              </p>

              <p className="mt-2 text-slate-300">
                Laporan sudah diteruskan ke teknisi.
              </p>
            </div>

            <div className="rounded-xl bg-slate-800 p-4">
              <p className="font-semibold text-blue-400">
                Mahasiswa
              </p>

              <p className="mt-2 text-slate-300">
                Sampai sekarang masih belum diperbaiki.
              </p>
            </div>

          </div>

        </div>

      </div>
    </MainLayout>
  );
}