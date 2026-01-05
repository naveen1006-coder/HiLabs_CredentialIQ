import { TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";

export function StatCard({
  value,
  label,
  trend,
  trendUp,
  icon: Icon,
  color = "medical",
}) {
  const colorMap = {
    medical: "from-medical-600 to-medical-800 border-medical-700/50",
    emerald: "from-emerald-600 to-emerald-800 border-emerald-700/50",
    amber: "from-amber-600 to-amber-800 border-amber-700/50",
    danger: "from-danger-600 to-danger-800 border-danger-700/50",
  };

  const iconBgMap = {
    medical: "bg-medical-500/20",
    emerald: "bg-emerald-500/20",
    amber: "bg-amber-500/20",
    danger: "bg-danger-500/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-xl border bg-gradient-to-br ${colorMap[color]} p-2 group hover:shadow-lg hover:shadow-slate-900/50 transition-shadow h-full flex flex-col`}
      style={{ padding: "10px" }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16" />

      <div className="relative flex items-start justify-between flex-1 w-full">
        <div className="flex-1 min-w-0" style={{ paddingRight: "16px" }}>
          <p
            className="text-sm font-medium text-white/70 leading-snug"
            style={{ marginBottom: "12px" }}
          >
            {label}
          </p>
          <motion.p
            className="text-3xl font-bold text-white leading-none"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            style={{ marginBottom: "12px" }}
          >
            {typeof value === "number" ? value.toLocaleString() : value}
          </motion.p>
          {trend && (
            <div
              className={`flex items-center gap-1.5 text-sm ${
                trendUp ? "text-emerald-300" : "text-danger-300"
              }`}
            >
              {trendUp ? (
                <TrendingUp className="w-3.5 h-3.5 flex-shrink-0" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 flex-shrink-0" />
              )}
              <span className="whitespace-nowrap font-medium">{trend}</span>
            </div>
          )}
        </div>
        {Icon && (
        
            <Icon className="w-6 h-6 text-white/80" />
          
        )}
      </div>
    </motion.div>
  );
}
