import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-blue-400">
            Smart Maintenance Router
          </h1>

          <p className="mt-2 text-slate-400">
            Login to continue
          </p>

        </div>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
          />

          <button
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500"
          >
            Login
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          Demo FMIPA UHO
        </p>

      </div>

    </div>
  );
}