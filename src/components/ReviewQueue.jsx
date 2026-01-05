import { motion } from "framer-motion";
import {
  User,
  Clock,
  FileText,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";

const priorityConfig = {
  high: {
    badge: "bg-danger-500/20 text-danger-300 border-danger-500/30",
    dot: "bg-danger-500",
  },
  medium: {
    badge: "bg-amber-500/20 text-amber-300 border-amber-500/30",
    dot: "bg-amber-500",
  },
  low: {
    badge: "bg-medical-500/20 text-medical-300 border-medical-500/30",
    dot: "bg-medical-500",
  },
};

function formatTimeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const diffMs = now - date;
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

export function ReviewQueue({ items, onApprove, onReject, onEscalate }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
      <div
        className="border-b border-slate-800 flex items-center justify-between"
        style={{ padding: "20px 24px" }}
      >
        <div className="flex items-center" style={{ gap: "12px" }}>
          <User className="w-5 h-5 text-purple-400" />
          <h3 className="font-semibold text-white">Human Review Queue</h3>
          <span
            className="rounded-full bg-purple-500/20 text-purple-300 text-xs font-medium"
            style={{ padding: "4px 10px" }}
          >
            {items.length} pending
          </span>
        </div>
        <span className="text-xs text-slate-500">Human-in-the-Loop</span>
      </div>

      <div className="divide-y divide-slate-800 max-h-[400px] overflow-y-auto">
        {items.map((item, index) => {
          const priority = priorityConfig[item.priority];

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="hover:bg-slate-800/30 transition-colors"
              style={{ padding: "20px 24px" }}
            >
              <div className="flex items-start" style={{ gap: "16px" }}>
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center border border-slate-600">
                    <User className="w-6 h-6 text-slate-400" />
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full ${priority.dot} border-2 border-slate-900`}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div
                    className="flex items-center flex-wrap"
                    style={{ gap: "8px", marginBottom: "6px" }}
                  >
                    <span className="font-medium text-white">
                      {item.providerName}
                    </span>
                    <span
                      className={`rounded-full text-xs font-medium border ${priority.badge}`}
                      style={{ padding: "4px 10px" }}
                    >
                      {item.priority.toUpperCase()}
                    </span>
                  </div>

                  <p
                    className="text-sm text-slate-400"
                    style={{ marginBottom: "12px" }}
                  >
                    {item.specialty} • NPI: {item.npi}
                  </p>

                  {/* Reason */}
                  <div
                    className="rounded-lg bg-slate-800/50 border border-slate-700"
                    style={{ padding: "12px", marginBottom: "10px" }}
                  >
                    <p
                      className="text-xs text-slate-400 flex items-start"
                      style={{ gap: "8px", lineHeight: "1.5" }}
                    >
                      <AlertTriangle
                        className="w-3.5 h-3.5 text-amber-400 flex-shrink-0"
                        style={{ marginTop: "2px" }}
                      />
                      {item.reason}
                    </p>
                  </div>

                  {/* AI Suggestion */}
                  <div
                    className="flex items-center text-xs"
                    style={{ gap: "8px", marginBottom: "12px" }}
                  >
                    <Lightbulb className="w-3.5 h-3.5 text-medical-400 flex-shrink-0" />
                    <span className="text-slate-500">AI suggests:</span>
                    <span className="text-medical-400 font-medium">
                      {item.aiSuggestion}
                    </span>
                  </div>

                  {/* Meta Info */}
                  <div
                    className="flex items-center flex-wrap text-xs text-slate-500"
                    style={{ gap: "16px", marginBottom: "12px" }}
                  >
                    <div className="flex items-center" style={{ gap: "6px" }}>
                      <Clock className="w-3.5 h-3.5" />
                      {formatTimeAgo(item.submittedAt)}
                    </div>
                    <div className="flex items-center" style={{ gap: "6px" }}>
                      <FileText className="w-3.5 h-3.5" />
                      {item.documentsAttached} docs
                    </div>
                    <div className="flex items-center" style={{ gap: "6px" }}>
                      <span className="text-amber-400">⚠</span>
                      {item.flaggedFields.length} flagged fields
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="flex items-center" style={{ gap: "8px" }}>
                    <span className="text-xs text-slate-500">
                      AI Confidence:
                    </span>
                    <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden max-w-[120px]">
                      <div
                        className={`h-full rounded-full ${
                          item.confidenceScore >= 0.8
                            ? "bg-emerald-500"
                            : item.confidenceScore >= 0.6
                            ? "bg-amber-500"
                            : "bg-danger-500"
                        }`}
                        style={{ width: `${item.confidenceScore * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {(item.confidenceScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div
                  className="flex flex-col flex-shrink-0"
                  style={{ gap: "8px" }}
                >
                  <button
                    onClick={() => onApprove?.(item.id)}
                    className="flex items-center rounded-lg bg-emerald-600/20 border border-emerald-600/30 text-emerald-400 text-xs font-medium hover:bg-emerald-600/30 transition-colors"
                    style={{ padding: "8px 12px", gap: "6px" }}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Approve
                  </button>
                  <button
                    onClick={() => onReject?.(item.id)}
                    className="flex items-center rounded-lg bg-danger-600/20 border border-danger-600/30 text-danger-400 text-xs font-medium hover:bg-danger-600/30 transition-colors"
                    style={{ padding: "8px 12px", gap: "6px" }}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject
                  </button>
                  <button
                    onClick={() => onEscalate?.(item.id)}
                    className="flex items-center rounded-lg bg-purple-600/20 border border-purple-600/30 text-purple-400 text-xs font-medium hover:bg-purple-600/30 transition-colors"
                    style={{ padding: "8px 12px", gap: "6px" }}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    Escalate
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
