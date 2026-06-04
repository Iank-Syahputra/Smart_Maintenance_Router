import MainLayout from "../layouts/MainLayout";

export default function AdminDashboard() {
  return (
    <MainLayout>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          Admin Dashboard
        </h1>

        {/* Stats */}

        <div className="grid gap-4 md:grid-cols-4">

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-400">Total Reports</h3>
            <p className="mt-2 text-3xl font-bold">124</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-400">Pending</h3>
            <p className="mt-2 text-3xl font-bold text-yellow-400">32</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-400">In Progress</h3>
            <p className="mt-2 text-3xl font-bold text-blue-400">15</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="text-slate-400">Resolved</h3>
            <p className="mt-2 text-3xl font-bold text-green-400">77</p>
          </div>

        </div>

        {/* FILTER KATEGORI */}

        <div className="flex flex-wrap gap-3">

          <button className="rounded-full bg-blue-600 px-4 py-2">
            Semua
          </button>

          <button className="rounded-full bg-slate-800 px-4 py-2">
            IT
          </button>

          <button className="rounded-full bg-slate-800 px-4 py-2">
            MEP
          </button>

          <button className="rounded-full bg-slate-800 px-4 py-2">
            Infrastruktur
          </button>

          <button className="rounded-full bg-slate-800 px-4 py-2">
            Furniture
          </button>

        </div>

        {/* TABEL LAPORAN */}

        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="p-4 text-left">
                  Report
                </th>

                <th className="p-4 text-left">
                  AI Category
                </th>

                <th className="p-4 text-left">
                  AI Urgency
                </th>

                <th className="p-4 text-left">
                  Votes
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t border-slate-800 hover:bg-slate-800/50">

                <td className="p-4">
                  AC Lab Dasar Mati
                </td>

                <td className="p-4">
                  MEP
                </td>

                <td className="p-4 text-red-400">
                  Tinggi
                </td>

                <td className="p-4">
                  42
                </td>

                <td className="p-4">
                  Diproses
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}