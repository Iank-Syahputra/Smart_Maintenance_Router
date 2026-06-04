import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import api from "../api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get("/users");

      setUsers(response.data.users || []);
      setError("");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
        "Gagal memuat data pengguna"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        {loading && (
          <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 text-slate-300">
            Memuat data pengguna...
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

            <table className="w-full">

              <thead className="bg-slate-800">

                <tr>

                  <th className="p-4 text-left">
                    Name
                  </th>

                  <th className="p-4 text-left">
                    Email
                  </th>

                  <th className="p-4 text-left">
                    Role
                  </th>

                  <th className="p-4 text-left">
                    Created
                  </th>

                  <th className="p-4 text-left">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {users.length === 0 ? (
                  <tr>

                    <td
                      colSpan="5"
                      className="p-6 text-center text-slate-400"
                    >
                      Tidak ada pengguna ditemukan
                    </td>

                  </tr>
                ) : (
                  users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-t border-slate-800"
                    >

                      <td className="p-4">
                        {user.namaLengkap}
                      </td>

                      <td className="p-4">
                        {user.email}
                      </td>

                      <td className="p-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            user.role === "ADMIN"
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-slate-700 text-slate-300"
                          }`}
                        >
                          {user.role}
                        </span>

                      </td>

                      <td className="p-4">
                        {new Date(
                          user.createdAt
                        ).toLocaleDateString("id-ID")}
                      </td>

                      <td className="p-4">

                        <button
                          disabled
                          className="rounded-lg bg-red-600 px-4 py-2 opacity-50"
                        >
                          Ban
                        </button>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </MainLayout>
  );
}