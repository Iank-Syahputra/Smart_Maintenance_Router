import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-4 text-center">

      <h1 className="text-8xl font-bold text-blue-500">
        404
      </h1>

      <h2 className="mt-4 text-3xl font-bold">
        Page Not Found
      </h2>

      <p className="mt-3 text-slate-400">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500"
      >
        Back To Feed
      </Link>

    </div>
  );
}