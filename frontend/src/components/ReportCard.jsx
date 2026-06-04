import { useState } from "react";

import {
  MessageCircle,
  ArrowBigUp,
  Clock3,
} from "lucide-react";

import api from "../api";

import { Link } from "react-router-dom";

export default function ReportCard({ report }) {
  const [votes, setVotes] = useState(report.votes || 0);

  const [hasUpvoted, setHasUpvoted] = useState(report.hasUpvoted || false);

  const handleUpvote = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      if (hasUpvoted) {
        await api.delete(`/reports/${report.id}/upvote`);
        setVotes((prev) => Math.max(prev - 1, 0));
        setHasUpvoted(false);
      } else {
        await api.post(`/reports/${report.id}/upvote`);
        setVotes((prev) => prev + 1);
        setHasUpvoted(true);
      }
    } catch (error) {
      console.error("Gagal melakukan upvote:", error);
    }
  };



  const statusStyle = {
    PENDING:
      "border-slate-200 bg-slate-100 text-slate-700",

    DIPROSES:
      "border-amber-200 bg-amber-100 text-amber-700",

    SELESAI:
      "border-green-200 bg-green-100 text-green-700",
  };

  const formatStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Pending";
      case "DIPROSES":
        return "Diproses";
      case "SELESAI":
        return "Selesai";
      default:
        return status;
    }
  };

  const truncateText = (text, maxLength = 80) => {
    if (!text) return "";
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const imageUrl =
    report?.imageUrl &&
    report.imageUrl !== "no-image"
      ? report.imageUrl.startsWith("http")
        ? report.imageUrl
        : `http://localhost:5000${report.imageUrl}`
      : "https://placehold.co/300x300/e2e8f0/64748b?text=No+Image";

  const createdAt = report?.createdAt
    ? new Date(report.createdAt).toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "-";

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
        <div className="flex">
          {/* Image */}
          <div
            className="
            h-44
            w-44
            flex-shrink-0
            overflow-hidden
            "
          >
            <img
              src={imageUrl}
              alt="report"
              className="
              h-full
              w-full
              object-cover
              "
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col p-5">
            {/* Title */}
            <h3
              className="
              mb-3
              text-lg
              font-semibold
              text-slate-900
              "
            >
              {truncateText(report.rawText)}
            </h3>

            {/* Badges */}
            <div className="mb-4 flex flex-wrap gap-2">
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
                {report.aiKategori}
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
                {formatStatus(report.status)}
              </span>
            </div>

            {/* Footer */}
            <div className="mt-auto">
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
                    onClick={handleUpvote}
                    className="
                    flex
                    items-center
                    gap-2
                    text-slate-600
                    transition-all
                    hover:text-amber-600
                    "
                  >
                    <ArrowBigUp 
                    size={20} 
                    className={hasUpvoted ? "text-green-600" : "text-slate-600"}
                    />

                    <span className="font-medium">
                      {votes}
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
                      {report.commentsCount || 0}
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
                    {createdAt}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}