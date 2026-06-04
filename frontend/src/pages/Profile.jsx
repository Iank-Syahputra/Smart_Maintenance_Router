import MainLayout from "../layouts/MainLayout";

export default function Profile() {
  return (
    <MainLayout>

      <div className="mx-auto max-w-3xl">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex items-center gap-5">

            <img
              src="https://i.pravatar.cc/100"
              alt=""
              className="h-24 w-24 rounded-full"
            />

            <div>

              <h1 className="text-2xl font-bold">
                Tyo
              </h1>

              <p className="text-slate-400">
                Mahasiswa FMIPA
              </p>

            </div>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}