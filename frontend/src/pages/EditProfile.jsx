import { useEffect, useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { Mail, User, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../api";

export default function EditProfile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get("/auth/me");

        const user = response.data;

        setNamaLengkap(
          user?.namaLengkap || user?.name || ""
        );

        setEmail(user?.email || "");

        setAvatarUrl(user?.avatarUrl || "");
      } catch (err) {
        console.error(err);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      await api.patch("/auth/profile", {
        namaLengkap,
        avatarUrl,
      });

      setSuccess("Profil berhasil diperbarui.");

      setTimeout(() => {
        navigate("/profile");
      }, 1200);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Gagal memperbarui profil."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-slate-500">
              Loading profile...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mx-auto max-w-4xl">
        <form onSubmit={handleSubmit}>
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
                src={
                  avatarUrl ||
                  "https://i.pravatar.cc/200"
                }
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
                  Edit Profile
                </h1>

                <p className="mt-1 text-slate-500">
                  Update your account information
                </p>
              </div>

              <button
                type="submit"
                disabled={saving}
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
                disabled:opacity-70
                "
              >
                <Pencil size={18} />
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>
            </div>
          </div>

          {/* Feedback */}

          {error && (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          {success && (
            <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4 text-green-600">
              {success}
            </div>
          )}

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

            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Avatar URL
                </label>

                <input
                  type="text"
                  value={avatarUrl}
                  onChange={(e) =>
                    setAvatarUrl(e.target.value)
                  }
                  placeholder="https://example.com/avatar.jpg"
                  className="
                  w-full
                  rounded-xl
                  border
                  border-slate-300
                  p-3
                  outline-none
                  transition
                  focus:border-amber-400
                  "
                />
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
                  <User
                    size={20}
                    className="text-amber-600"
                  />
                </div>

                <div className="flex-1">
                  <p className="mb-2 text-sm text-slate-500">
                    Full Name
                  </p>

                  <input
                    type="text"
                    value={namaLengkap}
                    onChange={(e) =>
                      setNamaLengkap(e.target.value)
                    }
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    p-3
                    outline-none
                    transition
                    focus:border-amber-400
                    "
                  />
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

                <div className="flex-1">
                  <p className="mb-2 text-sm text-slate-500">
                    Email
                  </p>

                  <input
                    type="email"
                    value={email}
                    disabled
                    className="
                    w-full
                    rounded-xl
                    border
                    border-slate-300
                    bg-slate-100
                    p-3
                    text-slate-500
                    "
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </MainLayout>
  );
}