import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  Pill,
  Database,
  Activity,
} from "lucide-react";

const iconMap = {
  ShieldCheck,
  AlertTriangle,
  Pill,
  Database,
};

export function AgentStatusCard({ agent }) {
  const {
    name,
    icon,
    status,
    currentTask,
    queueDepth,
    processedToday,
    avgProcessingTime,
  } = agent;
  const Icon = iconMap[icon] || Activity;

  const statusColors = {
    processing: "bg-medical-500",
    idle: "bg-slate-500",
    error: "bg-danger-500",
  };

  const statusLabels = {
    processing: "Processing",
    idle: "Idle",
    error: "Error",
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-slate-900/50 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
      style={{ padding: "16px" }}
    >
      <div className="flex items-start" style={{ gap: "12px" }}>
        {/* Icon with pulse animation for processing */}
        <div className="relative flex-shrink-0">
          <div
            className={`rounded-xl ${
              status === "processing" ? "bg-medical-600/20" : "bg-slate-800"
            }`}
            style={{ padding: "10px" }}
          >
            <Icon
              className={`w-5 h-5 ${
                status === "processing" ? "text-medical-400" : "text-slate-400"
              }`}
            />
          </div>
          {status === "processing" && (
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-medical-500"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: "8px" }}
          >
            <h4 className="font-medium text-white text-sm">{name}</h4>
            <div className="flex items-center" style={{ gap: "6px" }}>
              <span
                className={`w-2 h-2 rounded-full ${statusColors[status]}`}
              />
              <span className="text-xs text-slate-400">
                {statusLabels[status]}
              </span>
            </div>
          </div>

          {/* Current Task */}
          <p
            className="text-xs text-slate-500 truncate"
            style={{ marginBottom: "12px", lineHeight: "1.4" }}
          >
            {currentTask}
          </p>

          {/* Stats Row */}
          <div
            className="flex items-center border-t border-slate-800"
            style={{ gap: "16px", marginTop: "12px", paddingTop: "12px" }}
          >
            <div className="flex flex-col">
              <span
                className="text-xs text-slate-500"
                style={{ marginBottom: "4px" }}
              >
                Queue
              </span>
              <span
                className={`text-sm font-semibold ${
                  queueDepth > 10 ? "text-amber-400" : "text-white"
                }`}
              >
                {queueDepth}
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className="text-xs text-slate-500"
                style={{ marginBottom: "4px" }}
              >
                Today
              </span>
              <span className="text-sm font-semibold text-white">
                {processedToday.toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span
                className="text-xs text-slate-500"
                style={{ marginBottom: "4px" }}
              >
                Avg Time
              </span>
              <span className="text-sm font-semibold text-emerald-400">
                {avgProcessingTime}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
