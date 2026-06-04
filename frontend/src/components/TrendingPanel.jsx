import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Flame,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import api from "../api";

export default function TrendingPanel() {
  const [data, setData] = useState({
    trendingIssues: [],
    highestUrgency: [],
    recentlyResolved: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);

        const response = await api.get(
          "/reports/trending"
        );

        const payload = response.data;

        setData({
          trendingIssues:
            payload.mostUpvoted || [],

          highestUrgency:
            payload.highestUrgency || [],

          recentlyResolved:
            payload.recentlyResolved || []
        });
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Failed to load trending data."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  const getTitle = (report) =>
    report.title ||
    report.rawText ||
    report.nama ||
    "Untitled Report";

  const getUpvotes = (report) =>
    report.upvotes?.length ||
    report._count?.upvotes ||
    report.votes ||
    0;

  const getUrgency = (report) =>
    report.adminUrgensi ||
    report.aiUrgensi ||
    report.urgency ||
    "Unknown";

  if (loading) {
    return (
      <div className="sticky top-24 hidden lg:block">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-slate-500">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="sticky top-24 hidden lg:block">
        <div className="rounded-2xl border border-red-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-red-500">
            {error}
          </p>
        </div>
      </div>
    );
  }

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
          {data.trendingIssues.length > 0 ? (
            data.trendingIssues.map((report) => (
              <Link
                key={report.id}
                to={`/report/${report.id}`}
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
                  {getTitle(report)}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {getUpvotes(report)} Upvotes
                </p>
              </Link>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No trending issues.
            </p>
          )}
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
          {data.highestUrgency.length > 0 ? (
            data.highestUrgency.map((report) => (
              <Link
                key={report.id}
                to={`/report/${report.id}`}
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
                  {getTitle(report)}
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
                  Urgensi {getUrgency(report)}
                </span>
              </Link>
            ))
          ) : (
            <p className="text-sm text-slate-500">
              No urgent reports.
            </p>
          )}
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
          {data.recentlyResolved.length > 0 ? (
            data.recentlyResolved.map(
              (report) => (
                <Link
                  key={report.id}
                  to={`/report/${report.id}`}
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
                    {getTitle(report)}
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
              )
            )
          ) : (
            <p className="text-sm text-slate-500">
              No resolved reports.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}