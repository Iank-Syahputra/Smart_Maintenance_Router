import { Link, useLocation } from "react-router-dom";
import { Home, PlusCircle, ClipboardList, User, LayoutDashboard } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function BottomNav() {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const items = isAdmin
    ? [
        { to: "/", icon: Home, label: "Beranda" },
        { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/profile", icon: User, label: "Profil" },
      ]
    : [
        { to: "/", icon: Home, label: "Beranda" },
        { to: "/reports/new", icon: PlusCircle, label: "Lapor" },
        { to: "/my-reports", icon: ClipboardList, label: "Laporan Saya" },
        { to: "/profile", icon: User, label: "Profil" },
      ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-sky shadow-[0_-2px_10px_rgba(0,119,182,0.08)]">
      <div className="flex items-center justify-around h-16 max-w-[680px] mx-auto px-2">
        {items.map((item) => {
          const active = item.to === "/"
            ? pathname === "/"
            : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-1 p-2 min-w-[64px] transition-colors rounded-xl ${
                active ? "text-ocean" : "text-gray-400 hover:text-ocean/70"
              }`}
            >
              <item.icon
                size={22}
                strokeWidth={active ? 2.5 : 2}
              />
              <span className={`text-[10px] ${active ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
