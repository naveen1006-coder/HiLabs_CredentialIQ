import { motion } from "framer-motion";
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  User,
  FileText,
  RotateCcw,
  Bot,
  ArrowRight,
} from "lucide-react";

const actionConfig = {
  verification_complete: {
    icon: CheckCircle,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    label: "Verification Complete",
  },
  anomaly_flagged: {
    icon: AlertTriangle,
    color: "text-danger-400",
    bg: "bg-danger-500/10",
    border: "border-danger-500/30",
    label: "Anomaly Flagged",
  },
  manual_review: {
    icon: User,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    label: "Manual Review",
  },
  application_submitted: {
    icon: FileText,
    color: "text-medical-400",
    bg: "bg-medical-500/10",
    border: "border-medical-500/30",
    label: "Application Submitted",
  },
  recredentialing_initiated: {
    icon: RotateCcw,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    label: "Recredentialing Initiated",
  },
};

const resultColors = {
  passed: "text-emerald-400",
  flagged: "text-danger-400",
  approved: "text-emerald-400",
  pending: "text-slate-400",
  in_progress: "text-medical-400",
};

function formatTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

export function AuditTimeline({ entries }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div
        className="border-b border-slate-800 flex items-center justify-between"
        style={{ padding: "20px 24px" }}
      >
        <div className="flex items-center" style={{ gap: "12px" }}>
          <Clock className="w-5 h-5 text-medical-400" />
          <h3 className="font-semibold text-white">Audit Timeline</h3>
        </div>
        <span
          className="rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium"
          style={{ padding: "6px 12px" }}
        >
          CMS Audit Ready
        </span>
      </div>

      <div className="relative max-h-[400px] overflow-y-auto">
        <div className="space-y-0" style={{ padding: "8px 0" }}>
          {entries.map((entry, index) => {
            const config =
              actionConfig[entry.action] || actionConfig.verification_complete;
            const Icon = config.icon;
            const isAI =
              entry.actor.startsWith("AI Agent") ||
              entry.actor === "System" ||
              entry.actor.includes("Automated");

            return (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="relative hover:bg-slate-800/30 transition-colors group"
                style={{ padding: "16px 24px" }}
              >
                <div className="flex items-start" style={{ gap: "16px" }}>
                  {/* Timeline Node */}
                  <div
                    className={`relative z-10 rounded-lg ${config.bg} border ${config.border}`}
                    style={{
                      padding: "10px",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon className={`w-5 h-5 ${config.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="flex items-center"
                      style={{ gap: "8px", marginBottom: "8px" }}
                    >
                      <span className={`text-sm font-medium ${config.color}`}>
                        {config.label}
                      </span>
                      <span className="text-xs text-slate-600">•</span>
                      <span className="text-xs text-slate-500">
                        {formatTime(entry.timestamp)}
                      </span>
                    </div>

                    <div
                      className="flex items-center text-sm"
                      style={{ gap: "8px", marginBottom: "6px" }}
                    >
                      <span className="font-medium text-white">
                        {entry.providerName}
                      </span>
                      <span className="text-slate-600">→</span>
                      <span
                        className={`font-medium ${resultColors[entry.result]}`}
                      >
                        {entry.result.replace("_", " ").toUpperCase()}
                      </span>
                    </div>

                    <p
                      className="text-xs text-slate-400"
                      style={{ marginBottom: "10px", lineHeight: "1.5" }}
                    >
                      {entry.details}
                    </p>

                    {/* Actor & Sources */}
                    <div
                      className="flex items-center flex-wrap text-xs"
                      style={{ gap: "12px" }}
                    >
                      <div className="flex items-center" style={{ gap: "6px" }}>
                        {isAI ? (
                          <Bot className="w-3.5 h-3.5 text-medical-400" />
                        ) : (
                          <User className="w-3.5 h-3.5 text-purple-400" />
                        )}
                        <span
                          className={
                            isAI ? "text-medical-400" : "text-purple-400"
                          }
                        >
                          {entry.actor}
                        </span>
                      </div>

                      {entry.dataSources.length > 0 && (
                        <div
                          className="flex items-center text-slate-500"
                          style={{ gap: "6px" }}
                        >
                          <ArrowRight className="w-3.5 h-3.5" />
                          {entry.dataSources.join(", ")}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Provider ID */}
                  <span className="text-xs text-slate-600 font-mono flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    {entry.providerId}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div
        className="border-t border-slate-800 flex items-center justify-between bg-slate-900"
        style={{ padding: "16px 24px" }}
      >
        <p className="text-xs text-slate-500">
          All actions logged with timestamps and source verification
        </p>
        <button
          className="text-xs text-medical-400 hover:text-medical-300 font-medium flex items-center"
          style={{ gap: "4px" }}
        >
          Export Audit Log
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
