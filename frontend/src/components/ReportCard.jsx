import {
  MessageCircle,
  ArrowBigUp,
  Clock3
} from "lucide-react";

import { Link } from "react-router-dom";

export default function ReportCard({ report }) {

  const statusStyle = {
    Pending:
      "border-slate-200 bg-slate-100 text-slate-700",

    Diproses:
      "border-amber-200 bg-amber-100 text-amber-700",

    Selesai:
      "border-green-200 bg-green-100 text-green-700",
  };

  return (
    <Link to={`/report/${report.id}`}>

      <article
        className="
        overflow-hidden
        rounded-2xl
        border
        border-slate-200
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        "
      >

        {/* Image */}

        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="report"
          className="
          h-56
          w-full
          object-cover
          "
        />

        {/* Content */}

        <div className="p-5">

          {/* Title */}

          <h3
            className="
            mb-4
            text-xl
            font-semibold
            text-slate-900
            "
          >
            {report.title}
          </h3>

          {/* Badges */}

          <div className="mb-5 flex flex-wrap gap-2">

            <span
              className="
              rounded-full
              border
              border-amber-200
              bg-amber-100
              px-3
              py-1
              text-xs
              font-medium
              text-amber-700
              "
            >
              MEP
            </span>

            <span
              className={`
              rounded-full
              border
              px-3
              py-1
              text-xs
              font-medium
              ${
                statusStyle[report.status] ||
                "border-slate-200 bg-slate-100 text-slate-700"
              }
              `}
            >
              {report.status}
            </span>

          </div>

          {/* Footer */}

          <div
            className="
            flex
            items-center
            justify-between
            border-t
            border-slate-200
            pt-4
            "
          >

            <div className="flex items-center gap-6">

              <button
                onClick={(e) => e.preventDefault()}
                className="
                flex
                items-center
                gap-2
                text-slate-600
                transition-all
                hover:text-amber-600
                "
              >
                <ArrowBigUp size={20} />

                <span className="font-medium">
                  {report.votes}
                </span>
              </button>

              <div
                className="
                flex
                items-center
                gap-2
                text-slate-500
                "
              >
                <MessageCircle size={18} />

                <span>
                  15
                </span>
              </div>

            </div>

            <div
              className="
              flex
              items-center
              gap-2
              text-sm
              text-slate-500
              "
            >
              <Clock3 size={15} />

              <span>
                2 jam lalu
              </span>
            </div>

          </div>

        </div>

      </article>

    </Link>
  );
}