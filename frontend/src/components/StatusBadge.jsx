const colors = {
  MENUNGGU: "bg-yellow-100 text-yellow-800 border-yellow-300",
  DIPROSES: "bg-blue-100 text-blue-800 border-blue-300",
  SELESAI: "bg-green-100 text-green-800 border-green-300",
};

const labels = {
  MENUNGGU: "Menunggu",
  DIPROSES: "Diproses",
  SELESAI: "Selesai",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        colors[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "MENUNGGU"
            ? "bg-yellow-500 animate-pulse"
            : status === "DIPROSES"
            ? "bg-blue-500 animate-pulse"
            : "bg-green-500"
        }`}
      />
      {labels[status] || status}
    </span>
  );
}
