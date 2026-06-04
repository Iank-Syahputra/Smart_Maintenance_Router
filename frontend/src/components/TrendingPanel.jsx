import { Link } from "react-router-dom";
import {
  Flame,
  TrendingUp,
  CheckCircle
} from "lucide-react";

export default function TrendingPanel() {
  return (
    <div className="sticky top-24 hidden space-y-5 lg:block">

      {/* Trending Issues */}
      <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-5">

        <div className="mb-3 flex items-center gap-2">
          <Flame size={18} className="text-orange-400" />
          <h2 className="font-semibold text-white">
            Trending Issues
          </h2>
        </div>

        <hr className="mb-4 border-slate-800" />

        <div className="space-y-3">

          <Link
            to="/report/1"
            className="block rounded-lg border border-transparent bg-slate-800/70 p-3 transition-all hover:border-slate-700 hover:bg-slate-800"
          >
            <p className="font-medium text-white">
              Internet FMIPA Putus
            </p>

            <p className="mt-1 text-xs text-slate-400">
              90 Upvotes
            </p>
          </Link>

          <Link
            to="/report/2"
            className="block rounded-lg border border-transparent bg-slate-800/70 p-3 transition-all hover:border-slate-700 hover:bg-slate-800"
          >
            <p className="font-medium text-white">
              AC Lab Dasar Mati
            </p>

            <p className="mt-1 text-xs text-slate-400">
              42 Upvotes
            </p>
          </Link>

          <Link
            to="/report/3"
            className="block rounded-lg border border-transparent bg-slate-800/70 p-3 transition-all hover:border-slate-700 hover:bg-slate-800"
          >
            <p className="font-medium text-white">
              Proyektor Ruang A Rusak
            </p>

            <p className="mt-1 text-xs text-slate-400">
              15 Upvotes
            </p>
          </Link>

        </div>

      </div>

      {/* Highest Urgency */}
      <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-5">

        <div className="mb-3 flex items-center gap-2">
          <TrendingUp size={18} className="text-red-400" />

          <h2 className="font-semibold text-white">
            Highest Urgency
          </h2>
        </div>

        <hr className="mb-4 border-slate-800" />

        <div className="space-y-3">

          <Link
            to="/report/1"
            className="block rounded-lg border border-transparent bg-slate-800/70 p-3 transition-all hover:border-slate-700 hover:bg-slate-800"
          >
            <p className="font-medium text-white">
              Internet FMIPA Putus
            </p>

            <span className="mt-1 inline-block text-xs font-medium text-red-400">
              Urgensi Tinggi
            </span>
          </Link>

          <Link
            to="/report/2"
            className="block rounded-lg border border-transparent bg-slate-800/70 p-3 transition-all hover:border-slate-700 hover:bg-slate-800"
          >
            <p className="font-medium text-white">
              AC Lab Dasar Mati
            </p>

            <span className="mt-1 inline-block text-xs font-medium text-red-400">
              Urgensi Tinggi
            </span>
          </Link>

        </div>

      </div>

      {/* Recently Resolved */}
      <div className="rounded-xl border border-slate-800 bg-[#0F172A] p-5">

        <div className="mb-3 flex items-center gap-2">
          <CheckCircle size={18} className="text-green-400" />

          <h2 className="font-semibold text-white">
            Recently Resolved
          </h2>
        </div>

        <hr className="mb-4 border-slate-800" />

        <div className="space-y-3">

          <Link
            to="/report/4"
            className="block rounded-lg border border-transparent bg-slate-800/70 p-3 transition-all hover:border-slate-700 hover:bg-slate-800"
          >
            <p className="font-medium text-white">
              Kursi Kuliah Patah
            </p>

            <span className="mt-1 inline-block text-xs font-medium text-green-400">
              Selesai
            </span>
          </Link>

        </div>

      </div>

    </div>
  );
}