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
    <div style={{
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 9999,
      backgroundColor: "#ffffff",
      borderTop: "1px solid #e5e7eb",
      boxShadow: "0 -2px 10px rgba(0,0,0,0.05)",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "64px",
      }}>
        {items.map((item) => {
          const active = item.to === "/"
            ? pathname === "/"
            : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px",
                padding: "4px 12px",
                minWidth: "64px",
                textDecoration: "none",
                color: active ? "#2563eb" : "#6b7280",
              }}
            >
              <item.icon
                size={22}
                strokeWidth={active ? 2.5 : 1.5}
                color={active ? "#2563eb" : "#6b7280"}
              />
              <span style={{
                fontSize: "10px",
                fontWeight: 500,
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
