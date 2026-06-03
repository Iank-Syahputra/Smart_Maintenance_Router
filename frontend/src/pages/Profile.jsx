import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Calendar, Shield, Camera, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/index";

export default function Profile() {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [namaLengkap, setNamaLengkap] = useState(user?.namaLengkap || "");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleSave = async () => {
    if (!namaLengkap.trim()) return;
    setSaving(true);
    setMessage(null);
    try {
      const data = await api.auth.updateProfile({ namaLengkap });
      updateUser(data.user);
      setMessage({ type: "success", text: "Profil berhasil disimpan" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "Ukuran avatar maksimal 2MB" });
      return;
    }
    setUploading(true);
    setMessage(null);
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      const data = await api.auth.uploadAvatar(formData);
      updateUser(data.user);
      setMessage({ type: "success", text: "Avatar berhasil diperbarui" });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 pb-24">
      <div className="flex items-center gap-3 py-4">
        <User size={22} className="text-blue-600" />
        <h1 className="text-lg font-bold">Profil Saya</h1>
      </div>

      {message && (
        <div
          className={`mb-4 px-4 py-2 rounded-lg text-sm ${
            message.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-center relative">
          <div
            className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3 backdrop-blur-sm relative cursor-pointer group"
            onClick={handleAvatarClick}
          >
            {uploading ? (
              <Loader2 size={24} className="animate-spin text-white" />
            ) : user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt="avatar"
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <span className="text-3xl font-bold text-white">
                {user?.namaLengkap?.charAt(0) || "?"}
              </span>
            )}
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Camera size={18} className="text-white" />
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <h2 className="text-lg font-bold text-white">{user?.namaLengkap}</h2>
          <p className="text-sm text-blue-100">{user?.email}</p>
        </div>

        <div className="p-5 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Shield size={18} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Role</p>
              <p className="text-sm font-medium">
                {user?.role === "ADMIN" ? "Admin Kampus" : "Pelapor"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
            <Calendar size={18} className="text-gray-500" />
            <div>
              <p className="text-xs text-gray-500">Bergabung sejak</p>
              <p className="text-sm font-medium">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "-"}
              </p>
            </div>
          </div>

          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
            <input
              type="text"
              value={namaLengkap}
              onChange={(e) => setNamaLengkap(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving || !namaLengkap.trim()}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : null}
            Simpan Perubahan
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors text-sm"
          >
            <LogOut size={18} />
            Keluar
          </button>
        </div>
      </div>
    </div>
  );
}
