import MainLayout from "../layouts/MainLayout";

export default function EditProfile() {
  return (
    <MainLayout>

      <div className="mx-auto max-w-2xl">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

          <h1 className="mb-6 text-3xl font-bold">
            Edit Profile
          </h1>

          <div className="space-y-5">

            <div>

              <label className="mb-2 block">
                Full Name
              </label>

              <input
                type="text"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3"
              />

            </div>

            <div>

              <label className="mb-2 block">
                Email
              </label>

              <input
                type="email"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3"
              />

            </div>

            <div>

              <label className="mb-2 block">
                Avatar
              </label>

              <input
                type="file"
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3"
              />

            </div>

            <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-500">
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}