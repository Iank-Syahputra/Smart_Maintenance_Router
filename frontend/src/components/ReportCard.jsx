import {
  MessageCircle,
  ArrowBigUp,
  Clock3
} from "lucide-react";

import { Link } from "react-router-dom";

export default function ReportCard({ report }) {
  return (
    <Link to={`/report/${report.id}`}>

      <article
        className="
        overflow-hidden
        rounded-lg
        border
        border-slate-800
        bg-slate-900
        transition-all
        duration-300
        hover:border-slate-700
        hover:bg-slate-800/80
        hover:shadow-lg
        "
      >

        {/* Image */}

        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
          alt="report"
          className="
          h-48
          w-full
          object-cover
          "
        />

        {/* Content */}

        <div className="p-5">

          {/* Title */}

          <h3
            className="
            mb-3
            text-xl
            font-semibold
            text-white
            "
          >
            {report.title}
          </h3>

          {/* Badges */}

          <div className="mb-4 flex flex-wrap gap-2">

            <span
              className="
              rounded-md
              border
              border-blue-900
              bg-blue-950
              px-3
              py-1
              text-xs
              text-blue-300
              "
            >
              MEP
            </span>

            <span
              className="
              rounded-md
              border
              border-orange-900
              bg-orange-950
              px-3
              py-1
              text-xs
              text-orange-300
              "
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
            border-slate-800
            pt-4
            "
          >

            <div className="flex items-center gap-5">

              <button
                onClick={(e) => e.preventDefault()}
                className="
                flex
                items-center
                gap-2
                text-slate-300
                transition
                hover:text-blue-400
                "
              >
                <ArrowBigUp size={20} />

                <span>
                  {report.votes}
                </span>
              </button>

              <div
                className="
                flex
                items-center
                gap-2
                text-slate-400
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
              <span>2 jam lalu</span>
            </div>

          </div>

        </div>

      </article>

    </Link>
  );
}