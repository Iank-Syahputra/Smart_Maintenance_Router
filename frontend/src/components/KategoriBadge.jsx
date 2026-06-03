const config = {
  IT: { label: "IT & Jaringan", bg: "bg-blue-100 text-blue-700 border-blue-300" },
  MEP: { label: "Kelistrikan & AC", bg: "bg-red-100 text-red-700 border-red-300" },
  INFRA: { label: "Infrastruktur", bg: "bg-amber-100 text-amber-700 border-amber-300" },
  PERABOTAN: { label: "Perabotan", bg: "bg-purple-100 text-purple-700 border-purple-300" },
};

export default function KategoriBadge({ kategori }) {
  const c = config[kategori] || { label: kategori, bg: "bg-gray-100 text-gray-700" };
  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold border ${c.bg}`}>
      {c.label}
    </span>
  );
}
