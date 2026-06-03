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
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <FileText size={16} className="text-white" />
          </div>
          <span className="font-bold text-sm md:text-base text-gray-900 truncate">
            Smart Maintenance
          </span>
        </Link>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="hidden md:block text-sm text-gray-600">
              {user.namaLengkap}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 px-2 py-1.5 text-sm text-red-600 rounded-lg hover:bg-red-50"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Keluar</span>
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Masuk
          </Link>
        )}
      </div>
    </nav>
  );
}
