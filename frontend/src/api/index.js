const API_BASE = "/api";

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const isFormData = options.body instanceof FormData;
  if (isFormData) {
    delete headers["Content-Type"];
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Terjadi kesalahan");
  }

  return data;
}

export const api = {
  auth: {
    register: (body) => request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
    login: (body) => request("/auth/login", { method: "POST", body: JSON.stringify(body) }),
    me: () => request("/auth/me"),
    updateProfile: (body) => request("/auth/profile", { method: "PATCH", body: JSON.stringify(body) }),
    uploadAvatar: (formData) => request("/auth/avatar", { method: "POST", body: formData }),
  },
  reports: {
    list: (params = "") => request(`/reports${params}`),
    getById: (id) => request(`/reports/${id}`),
    create: (formData) => request("/reports", { method: "POST", body: formData }),
    updateStatus: (id, body) =>
      request(`/reports/${id}/status`, { method: "PATCH", body: JSON.stringify(body) }),
    delete: (id) => request(`/reports/${id}`, { method: "DELETE" }),
  },
  comments: {
    list: (reportId) => request(`/reports/${reportId}/comments`),
    create: (reportId, content) =>
      request(`/reports/${reportId}/comments`, {
        method: "POST",
        body: JSON.stringify({ content }),
      }),
    delete: (reportId, commentId) =>
      request(`/reports/${reportId}/comments/${commentId}`, { method: "DELETE" }),
  },
  upvotes: {
    toggle: (reportId) =>
      request(`/reports/${reportId}/upvotes`, { method: "POST" }),
  },
  ai: {
    predict: (text) => request("/ai/predict", { method: "POST", body: JSON.stringify({ text }) }),
  },
};
