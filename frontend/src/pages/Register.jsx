import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

export default function Register() {
  const navigate = useNavigate();

  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    try {
      setLoading(true);

      const response = await api.post("/auth/register", {
        namaLengkap,
        email,
        password,
      });

      const token =
        response.data.token ||
        response.data.accessToken ||
        response.data.data?.token;

      if (!token) {
        throw new Error("Token tidak ditemukan pada response.");
      }

      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      console.error("Register error:", err);

      setError(
        err.response?.data?.message ||
          err.response?.data?.error ||
          "Registrasi gagal."
      );
    } finally {
      setLoading(false);
    }
  };

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
            Create your account
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleRegister}
        >
          <input
            type="text"
            placeholder="Nama Lengkap"
            value={namaLengkap}
            onChange={(e) =>
              setNamaLengkap(e.target.value)
            }
            required
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
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
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
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
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

          {error && (
            <div
              className="
              rounded-xl
              border
              border-red-200
              bg-red-50
              p-3
              text-sm
              text-red-600
              "
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
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
            disabled:cursor-not-allowed
            disabled:opacity-70
            "
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Sudah punya akun?
          </p>

          <Link
            to="/login"
            className="
            mt-2
            inline-block
            font-medium
            text-amber-600
            hover:text-amber-500
            "
          >
            Login
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