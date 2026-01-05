import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  HelpCircle,
} from "lucide-react";
import { XAIModal } from "./XAIModal";

const severityConfig = {
  critical: {
    icon: AlertCircle,
    bg: "bg-danger-500/10",
    border: "border-danger-500/30",
    text: "text-danger-400",
    badge: "bg-danger-500/20 text-danger-300",
  },
  warning: {
    icon: AlertTriangle,
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-400",
    badge: "bg-amber-500/20 text-amber-300",
  },
  info: {
    icon: Info,
    bg: "bg-medical-500/10",
    border: "border-medical-500/30",
    text: "text-medical-400",
    badge: "bg-medical-500/20 text-medical-300",
  },
};

function formatTimeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  return date.toLocaleDateString();
}

export function AnomalyFeed({ anomalies }) {
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);

  return (
    <>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex flex-col w-full">
        <div
          className="border-b border-slate-800 flex items-center justify-between"
          style={{ padding: "20px 24px" }}
        >
          <div className="flex items-center" style={{ gap: "12px" }}>
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h3 className="font-semibold text-white">Anomaly Detection Feed</h3>
          </div>
          <span className="text-xs text-slate-500">Real-time</span>
        </div>

        <div className="divide-y divide-slate-800 flex-1 overflow-y-auto">
          <AnimatePresence>
            {anomalies.map((anomaly, index) => {
              const config = severityConfig[anomaly.severity];
              const Icon = config.icon;

              return (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${config.bg} hover:bg-slate-800/50 transition-colors`}
                  style={{ padding: "20px 24px" }}
                >
                  <div className="flex items-start" style={{ gap: "16px" }}>
                    <div
                      className={`rounded-lg ${config.border} border flex-shrink-0`}
                      style={{ padding: "10px" }}
                    >
                      <Icon className={`w-5 h-5 ${config.text}`} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div
                        className="flex items-center flex-wrap"
                        style={{ gap: "8px", marginBottom: "8px" }}
                      >
                        <span className="font-medium text-white text-sm">
                          {anomaly.providerName}
                        </span>
                        <span
                          className={`rounded-full text-xs font-medium ${config.badge}`}
                          style={{ padding: "4px 10px" }}
                        >
                          {anomaly.severity.toUpperCase()}
                        </span>
                      </div>

                      <p
                        className={`text-sm font-medium ${config.text}`}
                        style={{ marginBottom: "6px" }}
                      >
                        {anomaly.title}
                      </p>
                      <p
                        className="text-xs text-slate-400"
                        style={{ marginBottom: "12px", lineHeight: "1.5" }}
                      >
                        {anomaly.description}
                      </p>

                      <div
                        className="flex items-center flex-wrap"
                        style={{ gap: "12px" }}
                      >
                        <div
                          className="flex items-center text-xs text-slate-500"
                          style={{ gap: "6px" }}
                        >
                          <Clock className="w-3.5 h-3.5" />
                          {formatTimeAgo(anomaly.timestamp)}
                        </div>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">
                          {anomaly.source}
                        </span>

                        <button
                          onClick={() => setSelectedAnomaly(anomaly)}
                          className="ml-auto flex items-center rounded-md bg-slate-800 hover:bg-slate-700 text-medical-400 text-xs font-medium transition-colors"
                          style={{ padding: "6px 12px", gap: "6px" }}
                        >
                          <HelpCircle className="w-3.5 h-3.5" />
                          Why?
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* XAI Modal */}
      <XAIModal
        isOpen={!!selectedAnomaly}
        onClose={() => setSelectedAnomaly(null)}
        anomaly={selectedAnomaly}
      />
    </>
  );
}
