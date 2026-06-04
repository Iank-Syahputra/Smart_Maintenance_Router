import MainLayout from "../layouts/MainLayout";

export default function AdminUsers() {
  return (
    <MainLayout>

      <div className="space-y-6">

        <h1 className="text-3xl font-bold">
          User Management
        </h1>

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
                  Reports
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-t border-slate-800">

                <td className="p-4">
                  Rizky Saputra
                </td>

                <td className="p-4">
                  rizky@student.uho.ac.id
                </td>

                <td className="p-4">
                  Mahasiswa
                </td>

                <td className="p-4">
                  12
                </td>

                <td className="p-4">

                  <button className="rounded-lg bg-red-600 px-4 py-2 hover:bg-red-500">
                    Ban
                  </button>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </MainLayout>
  );
}