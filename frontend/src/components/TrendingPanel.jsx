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
      <div
        className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        "
      >
        <div className="mb-4 flex items-center gap-2">
          <Flame
            size={18}
            className="text-amber-500"
          />

          <h2 className="font-semibold text-slate-900">
            Trending Issues
          </h2>
        </div>

        <div className="space-y-3">

          <Link
            to="/report/1"
            className="
            block
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3
            transition-all
            duration-300
            hover:border-amber-300
            hover:bg-amber-50
            "
          >
            <p className="font-medium text-slate-900">
              Internet FMIPA Putus
            </p>

            <p className="mt-1 text-xs text-slate-500">
              90 Upvotes
            </p>
          </Link>

          <Link
            to="/report/2"
            className="
            block
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3
            transition-all
            duration-300
            hover:border-amber-300
            hover:bg-amber-50
            "
          >
            <p className="font-medium text-slate-900">
              AC Lab Dasar Mati
            </p>

            <p className="mt-1 text-xs text-slate-500">
              42 Upvotes
            </p>
          </Link>

          <Link
            to="/report/3"
            className="
            block
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3
            transition-all
            duration-300
            hover:border-amber-300
            hover:bg-amber-50
            "
          >
            <p className="font-medium text-slate-900">
              Proyektor Ruang A Rusak
            </p>

            <p className="mt-1 text-xs text-slate-500">
              15 Upvotes
            </p>
          </Link>

        </div>
      </div>

      {/* Highest Urgency */}
      <div
        className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        "
      >
        <div className="mb-4 flex items-center gap-2">

          <TrendingUp
            size={18}
            className="text-red-500"
          />

          <h2 className="font-semibold text-slate-900">
            Highest Urgency
          </h2>

        </div>

        <div className="space-y-3">

          <Link
            to="/report/1"
            className="
            block
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3
            transition-all
            duration-300
            hover:border-red-300
            hover:bg-red-50
            "
          >
            <p className="font-medium text-slate-900">
              Internet FMIPA Putus
            </p>

            <span
              className="
              mt-2
              inline-block
              rounded-full
              bg-red-100
              px-2
              py-1
              text-xs
              font-medium
              text-red-600
              "
            >
              Urgensi Tinggi
            </span>
          </Link>

          <Link
            to="/report/2"
            className="
            block
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3
            transition-all
            duration-300
            hover:border-red-300
            hover:bg-red-50
            "
          >
            <p className="font-medium text-slate-900">
              AC Lab Dasar Mati
            </p>

            <span
              className="
              mt-2
              inline-block
              rounded-full
              bg-red-100
              px-2
              py-1
              text-xs
              font-medium
              text-red-600
              "
            >
              Urgensi Tinggi
            </span>
          </Link>

        </div>
      </div>

      {/* Recently Resolved */}
      <div
        className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        "
      >
        <div className="mb-4 flex items-center gap-2">

          <CheckCircle
            size={18}
            className="text-green-500"
          />

          <h2 className="font-semibold text-slate-900">
            Recently Resolved
          </h2>

        </div>

        <div className="space-y-3">

          <Link
            to="/report/4"
            className="
            block
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            p-3
            transition-all
            duration-300
            hover:border-green-300
            hover:bg-green-50
            "
          >
            <p className="font-medium text-slate-900">
              Kursi Kuliah Patah
            </p>

            <span
              className="
              mt-2
              inline-block
              rounded-full
              bg-green-100
              px-2
              py-1
              text-xs
              font-medium
              text-green-600
              "
            >
              Selesai
            </span>
          </Link>

        </div>
      </div>

    </div>
  );
}