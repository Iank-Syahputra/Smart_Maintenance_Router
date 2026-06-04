import { Link } from "react-router-dom";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-blue-400">
            Smart Maintenance Router
          </h1>

          <p className="mt-2 text-slate-400">
            Create your FMIPA account
          </p>

        </div>

        <form className="space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="name@student.uho.ac.id"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 outline-none focus:border-blue-500"
            />

          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold transition hover:bg-blue-500"
          >
            Register
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-slate-400">

          Already have an account?

          <Link
            to="/login"
            className="ml-2 text-blue-400 hover:text-blue-300"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}