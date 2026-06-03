import { Monitor, Zap, Building2, Armchair } from "lucide-react";

const config = {
  IT: { label: "IT & Jaringan", icon: Monitor },
  MEP: { label: "Kelistrikan & AC", icon: Zap },
  INFRA: { label: "Infrastruktur", icon: Building2 },
  PERABOTAN: { label: "Perabotan", icon: Armchair },
};

export default function KategoriBadge({ kategori }) {
  const c = config[kategori] || { label: kategori, icon: Monitor };
  const Icon = c.icon;
  
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-mono font-medium text-white gradient-ai border-0">
      <Icon size={12} strokeWidth={2.5} />
      {c.label}
    </span>
  );
}
