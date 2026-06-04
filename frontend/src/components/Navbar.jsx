import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";
import api from "../api";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const response = await api.get("/auth/me");

        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const avatar =
    user?.avatarUrl && user.avatarUrl.trim() !== ""
      ? user.avatarUrl.startsWith("http")
        ? user.avatarUrl
        : `http://localhost:5000${user.avatarUrl}`
      : "https://i.pravatar.cc/100";

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      border-b
      border-slate-200
      bg-white/90
      backdrop-blur-xl
      "
    >
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3"
        >
          <div
            className="
            flex
            h-20
            w-20
            items-center
            justify-center
            overflow-hidden
            "
          >
            <img
              src="/logo.png"
              alt="Smart Maintenance Router"
              className="
              h-full
              w-full
              object-contain
              "
            />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900">
              Smart Maintenance Router
            </h1>

            <p className="text-sm text-slate-500">
              FMIPA Universitas Halu Oleo
            </p>
          </div>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <Link
            to="/create"
            className="
            flex
            items-center
            gap-2
            rounded-full
            bg-amber-500
            px-6
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:scale-105
            hover:bg-amber-400
            hover:shadow-[0_0_25px_rgba(245,158,11,0.45)]
            "
          >
            <Plus size={18} />
            Create Report
          </Link>

          <div className="relative">

            <button
              onClick={() => setOpen(!open)}
              className="
              flex
              items-center
              gap-2
              rounded-full
              border
              border-slate-300
              bg-white
              pl-1
              pr-3
              py-1
              transition
              hover:border-amber-400
              hover:shadow-md
              "
            >
              <img
                src={avatar}
                alt="avatar"
                className="h-11 w-11 rounded-full object-cover"
              />

              <ChevronDown
                size={16}
                className="text-slate-500"
              />
            </button>

            {open && (
              <div
                className="
                absolute
                right-0
                mt-3
                w-60
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                shadow-xl
                "
              >
                <div className="border-b border-slate-200 p-4">

                  <p className="font-semibold text-slate-900">
                    {user?.namaLengkap || "User"}
                  </p>

                  <p className="text-sm text-slate-500">
                    {user?.email || "-"}
                  </p>

                </div>

                <Link
                  to="/profile"
                  className="
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-slate-700
                  transition
                  hover:bg-slate-100
                  "
                >
                  <User size={18} />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="
                  flex
                  w-full
                  items-center
                  gap-3
                  px-4
                  py-3
                  text-red-500
                  transition
                  hover:bg-red-50
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
}