import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get("/auth/me");

        setUser(response.data);
      } catch (err) {
        console.error("Failed to load profile:", err);

        setError(
          err.response?.data?.message ||
            "Gagal memuat data profil."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <p className="text-slate-400">
              Loading profile...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-red-800 bg-slate-900 p-8">
            <p className="text-red-400">
              {error}
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const joinedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString(
        "id-ID",
        {
          day: "numeric",
          month: "long",
          year: "numeric",
        }
      )
    : "-";

  return (
    <MainLayout>
      <div className="mx-auto max-w-3xl">
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <div className="flex items-center gap-5">
            <img
              src={
                user?.avatarUrl ||
                "https://i.pravatar.cc/100"
              }
              alt="Profile"
              className="h-24 w-24 rounded-full object-cover"
            />

            <div>
              <h1 className="text-2xl font-bold">
                {user?.namaLengkap ||
                  user?.name ||
                  "User"}
              </h1>

              <p className="text-slate-400">
                {user?.email}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                Role: {user?.role || "-"}
              </p>

              <p className="text-sm text-slate-500">
                Bergabung: {joinedDate}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}