import { Link, useNavigate } from "react-router-dom";
import { LogOut, FileText, Shield } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-40 gradient-nav border-b border-ocean shadow-nav">
      <div className="max-w-[680px] mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/10 border border-white/20">
            <FileText size={18} className="text-white" />
          </div>
          <span className="font-display font-bold text-sm md:text-base text-white truncate tracking-wide">
            Smart Maintenance
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-sm font-medium text-ice">
              {user.namaLengkap}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-3 py-1.5 text-sm text-ice rounded-lg hover:bg-white/10 transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Keluar</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1.5 text-sm font-medium text-navy bg-ice rounded-lg hover:bg-white transition-colors"
          >
            Masuk
          </Link>
        )}
      </div>
    </nav>
  );
}
