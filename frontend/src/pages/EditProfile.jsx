import MainLayout from "../layouts/MainLayout";
import { Mail, User, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
    <MainLayout>

      <div className="mx-auto max-w-4xl">

        <div
          className="
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
          "
        >

          {/* Header */}

          <div className="flex flex-col gap-6 md:flex-row md:items-center">

            <img
              src="https://i.pravatar.cc/200"
              alt="Profile"
              className="
              h-28
              w-28
              rounded-full
              border-4
              border-amber-400
              object-cover
              "
            />

            <div className="flex-1">

              <h1
                className="
                text-3xl
                font-bold
                text-slate-900
                "
              >
                User Name
              </h1>

              <p className="mt-1 text-slate-500">
                user@student.uho.ac.id
              </p>

            </div>

            <Link
              to="/edit-profile"
              className="
              flex
              items-center
              gap-2
              rounded-xl
              bg-amber-500
              px-5
              py-3
              font-medium
              text-white
              transition-all
              duration-300
              hover:bg-amber-400
              hover:shadow-lg
              hover:shadow-amber-300/50
              "
            >
              <Pencil size={18} />
              Edit Profile
            </Link>

          </div>

        </div>

        {/* Information */}

        <div
          className="
          mt-6
          rounded-3xl
          border
          border-slate-200
          bg-white
          p-8
          shadow-sm
          "
        >

          <h2
            className="
            mb-6
            text-xl
            font-bold
            text-slate-900
            "
          >
            Account Information
          </h2>

          <div className="space-y-5">

            <div className="flex items-center gap-4">

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-amber-100
                "
              >
                <User
                  size={20}
                  className="text-amber-600"
                />
              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <p className="font-medium text-slate-900">
                  User Name
                </p>

              </div>

            </div>

            <div className="flex items-center gap-4">

              <div
                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-amber-100
                "
              >
                <Mail
                  size={20}
                  className="text-amber-600"
                />
              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-medium text-slate-900">
                  user@student.uho.ac.id
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="mt-6 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

            <h3 className="text-3xl font-bold text-amber-500">
              12
            </h3>

            <p className="mt-2 text-slate-500">
              Reports Created
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

            <h3 className="text-3xl font-bold text-green-500">
              5
            </h3>

            <p className="mt-2 text-slate-500">
              Resolved Reports
            </p>

          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">

            <h3 className="text-3xl font-bold text-amber-500">
              127
            </h3>

            <p className="mt-2 text-slate-500">
              Total Upvotes
            </p>

          </div>

        </div>

      </div>

    </MainLayout>
  );
}