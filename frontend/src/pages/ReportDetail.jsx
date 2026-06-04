import MainLayout from "../layouts/MainLayout";
import {
  ArrowBigUp,
  MessageCircle
} from "lucide-react";

export default function ReportDetail() {
  return (
    <MainLayout>

      <div className="mx-auto max-w-4xl">

        {/* Report Image */}

        <div
          className="
          overflow-hidden
          rounded-2xl
          border
          border-slate-200
          bg-white
          shadow-sm
          "
        >
          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="report"
            className="h-[450px] w-full object-cover"
          />
        </div>

        {/* Post Content */}

        <div
          className="
          mt-6
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
            mb-5
            text-3xl
            font-bold
            text-slate-900
            "
          >
            AC Lab Dasar Mati Total
          </h1>

          <div className="mb-6 flex flex-wrap gap-3">

            <span
              className="
              rounded-full
              bg-amber-100
              px-4
              py-1
              text-sm
              font-medium
              text-amber-700
              "
            >
              Kelistrikan & Tata Udara
            </span>

            <span
              className="
              rounded-full
              bg-orange-100
              px-4
              py-1
              text-sm
              font-medium
              text-orange-700
              "
            >
              Diproses
            </span>

          </div>

          <button
            className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-amber-300
            bg-amber-50
            px-5
            py-3
            font-medium
            text-amber-700
            transition-all
            duration-300
            hover:bg-amber-400
            hover:text-white
            hover:shadow-md
            "
          >
            <ArrowBigUp size={20} />
            42 Upvotes
          </button>

        </div>

        {/* Comments */}

        <div
          className="
          mt-6
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-sm
          "
        >

          <div className="mb-6 flex items-center gap-2">

            <MessageCircle
              size={22}
              className="text-amber-600"
            />

            <h2
              className="
              text-xl
              font-semibold
              text-slate-900
              "
            >
              Comments
            </h2>

          </div>

          {/* Comment Box */}

          <textarea
            placeholder="Write a comment..."
            className="
            mb-4
            h-32
            w-full
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            p-4
            outline-none
            transition
            focus:border-amber-400
            "
          />

          <button
            className="
            rounded-xl
            bg-amber-500
            px-5
            py-2
            font-medium
            text-white
            transition-all
            duration-300
            hover:bg-amber-400
            hover:shadow-md
            "
          >
            Send Comment
          </button>

          {/* Comment List */}

          <div className="mt-8 space-y-4">

            <div
              className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-4
              "
            >
              <p
                className="
                font-semibold
                text-amber-700
                "
              >
                Admin FMIPA
              </p>

              <p className="mt-2 text-slate-700">
                Laporan sudah diteruskan ke teknisi.
              </p>
            </div>

            <div
              className="
              rounded-xl
              border
              border-slate-200
              bg-slate-50
              p-4
              "
            >
              <p
                className="
                font-semibold
                text-amber-700
                "
              >
                Mahasiswa
              </p>

              <p className="mt-2 text-slate-700">
                Sampai sekarang masih belum diperbaiki.
              </p>
            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}