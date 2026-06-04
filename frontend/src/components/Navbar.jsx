import { Link } from "react-router-dom";
import {
  Plus,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-bold text-white shadow-[0_0_25px_rgba(59,130,246,0.45)]">
            SM
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              Smart Maintenance Router
            </h1>

            <p className="text-sm text-slate-400">
              FMIPA Universitas Halu Oleo
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <Link
            to="/create"
            className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.45)] transition-all duration-300 hover:scale-105 hover:bg-blue-500"
          >
            <Plus size={18} />
            Create Report
          </Link>

          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 pl-1 pr-3 py-1 transition hover:border-blue-500"
            >
              <img
                src="https://i.pravatar.cc/100"
                alt="avatar"
                className="h-11 w-11 rounded-full object-cover"
              />

              <ChevronDown
                size={16}
                className="text-slate-400"
              />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-60 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">

                <div className="border-b border-slate-800 p-4">
                  <p className="font-semibold text-white">
                    User Name
                  </p>

                  <p className="text-sm text-slate-400">
                    user@student.uho.ac.id
                  </p>
                </div>

                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-3 transition hover:bg-slate-800"
                >
                  <User size={18} />
                  Profile
                </Link>

                <Link
                  to="/login"
                  className="flex items-center gap-3 px-4 py-3 text-red-400 transition hover:bg-slate-800"
                >
                  <LogOut size={18} />
                  Logout
                </Link>

              </div>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
}