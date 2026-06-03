import { Monitor, Zap, Building2, Armchair } from "lucide-react";

const config = {
  IT: { label: "Teknologi Informasi dan Jaringan (IT)", icon: Monitor },
  MEP: { label: "Kelistrikan dan Tata Udara (MEP)", icon: Zap },
  INFRA: { label: "Infrastruktur dan Sipil", icon: Building2 },
  PERABOTAN: { label: "Perabotan dan inventaris (Furniture)", icon: Armchair },
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
