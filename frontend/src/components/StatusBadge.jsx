const colors = {
  MENUNGGU: "bg-ice text-cyan border-ice",
  DIPROSES: "bg-ocean text-white border-ocean",
  SELESAI: "bg-navy text-white border-navy",
};

const labels = {
  MENUNGGU: "Baru",
  DIPROSES: "Diproses",
  SELESAI: "Selesai",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-mono border ${
        colors[status] || "bg-ice text-navy border-sky"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "MENUNGGU"
            ? "bg-cyan"
            : status === "DIPROSES"
            ? "bg-ice animate-[pulseDot_1.5s_ease-in-out_infinite]"
            : "bg-sky"
        }`}
      />
      {labels[status] || status}
    </span>
  );
}
