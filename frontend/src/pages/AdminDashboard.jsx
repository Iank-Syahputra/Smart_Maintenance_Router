import MainLayout from "../layouts/MainLayout";

export default function AdminDashboard() {
  return (
    <MainLayout>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold text-slate-900">
          Admin Dashboard
        </h1>

        {/* Stats */}

        <div className="grid gap-4 md:grid-cols-4">

          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <h3 className="text-slate-500">
              Total Reports
            </h3>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              124
            </p>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <h3 className="text-slate-500">
              Pending
            </h3>

            <p className="mt-2 text-3xl font-bold text-yellow-600">
              32
            </p>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <h3 className="text-slate-500">
              In Progress
            </h3>

            <p className="mt-2 text-3xl font-bold text-amber-500">
              15
            </p>
          </div>

          <div className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm">
            <h3 className="text-slate-500">
              Resolved
            </h3>

            <p className="mt-2 text-3xl font-bold text-green-600">
              77
            </p>
          </div>

        </div>

        {/* FILTER */}

        <div className="flex flex-wrap gap-3">

          <button
            className="
            rounded-full
            bg-yellow-400
            px-5
            py-2
            font-medium
            text-slate-900
            transition-all
            hover:bg-yellow-300
            hover:shadow-lg
            hover:shadow-yellow-200
            "
          >
            Semua
          </button>

          <button
            className="
            rounded-full
            border
            border-slate-300
            bg-white
            px-5
            py-2
            transition-all
            hover:border-yellow-400
            hover:text-yellow-600
            "
          >
            IT
          </button>

          <button
            className="
            rounded-full
            border
            border-slate-300
            bg-white
            px-5
            py-2
            transition-all
            hover:border-yellow-400
            hover:text-yellow-600
            "
          >
            MEP
          </button>

          <button
            className="
            rounded-full
            border
            border-slate-300
            bg-white
            px-5
            py-2
            transition-all
            hover:border-yellow-400
            hover:text-yellow-600
            "
          >
            Infrastruktur
          </button>

          <button
            className="
            rounded-full
            border
            border-slate-300
            bg-white
            px-5
            py-2
            transition-all
            hover:border-yellow-400
            hover:text-yellow-600
            "
          >
            Furniture
          </button>

        </div>

        {/* TABLE */}

        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-4 text-left text-slate-700">
                  Report
                </th>

                <th className="p-4 text-left text-slate-700">
                  AI Category
                </th>

                <th className="p-4 text-left text-slate-700">
                  AI Urgency
                </th>

                <th className="p-4 text-left text-slate-700">
                  Votes
                </th>

                <th className="p-4 text-left text-slate-700">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              <tr
                className="
                border-t
                border-slate-200
                transition
                hover:bg-slate-50
                "
              >

                <td className="p-4 text-slate-900">
                  AC Lab Dasar Mati
                </td>

                <td className="p-4 text-slate-700">
                  MEP
                </td>

                <td className="p-4 font-medium text-red-500">
                  Tinggi
                </td>

                <td className="p-4 text-slate-700">
                  42
                </td>

                <td className="p-4">

                  <span
                    className="
                    rounded-full
                    bg-yellow-100
                    px-3
                    py-1
                    text-sm
                    font-medium
                    text-yellow-700
                    "
                  >
                    Diproses
                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}