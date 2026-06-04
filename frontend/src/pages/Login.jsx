import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div
      className="
      flex
      min-h-screen
      items-center
      justify-center
      bg-slate-100
      px-4
      "
    >

      <div
        className="
        w-full
        max-w-md
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-8
        shadow-lg
        "
      >

        <div className="mb-8 text-center">

          <div
            className="
            mx-auto
            mb-4
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-amber-500
            text-xl
            font-bold
            text-white
            shadow-lg
            shadow-amber-300/40
            "
          >
            SM
          </div>

          <h1
            className="
            text-3xl
            font-bold
            text-slate-900
            "
          >
            Smart Maintenance Router
          </h1>

          <p
            className="
            mt-2
            text-slate-500
            "
          >
            Login to continue
          </p>

        </div>

        <form className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            p-3
            outline-none
            transition
            focus:border-amber-400
            "
          />

          <input
            type="password"
            placeholder="Password"
            className="
            w-full
            rounded-xl
            border
            border-slate-300
            bg-slate-50
            p-3
            outline-none
            transition
            focus:border-amber-400
            "
          />

          <button
            className="
            w-full
            rounded-xl
            bg-amber-500
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:bg-amber-400
            hover:shadow-lg
            hover:shadow-amber-300/50
            "
          >
            Login
          </button>

        </form>

        <div className="mt-6 text-center">

          <p className="text-sm text-slate-500">
            Belum punya akun?
          </p>

          <Link
            to="/register"
            className="
            mt-2
            inline-block
            font-medium
            text-amber-600
            hover:text-amber-500
            "
          >
            Register
          </Link>

        </div>

        <p
          className="
          mt-8
          text-center
          text-xs
          text-slate-400
          "
        >
          FMIPA Universitas Halu Oleo
        </p>

      </div>

    </div>
  );
}