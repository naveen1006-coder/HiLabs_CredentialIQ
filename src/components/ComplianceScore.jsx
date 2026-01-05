import { motion } from "framer-motion";

export function ComplianceScore({ score, breakdown, lastAudit, nextAudit }) {
  const getScoreColor = (value) => {
    if (value >= 90) return "text-emerald-400";
    if (value >= 75) return "text-amber-400";
    return "text-danger-400";
  };

  const getStrokeColor = (value) => {
    if (value >= 90) return "#34d399";
    if (value >= 75) return "#fbbf24";
    return "#f87171";
  };

  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div
      className="bg-slate-900 border border-slate-800 rounded-xl"
      style={{ padding: "24px" }}
    >
      <div
        className="flex items-start justify-between"
        style={{ marginBottom: "20px" }}
      >
        <div>
          <h3
            className="text-sm font-medium text-slate-400"
            style={{ marginBottom: "4px" }}
          >
            Compliance Score
          </h3>
          <p className="text-xs text-slate-500">NCQA • URAC • CMS</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-slate-500">
          <span>Last audit: {lastAudit}</span>
        </div>
      </div>

      <div
        className="flex items-center"
        style={{ gap: "24px", marginBottom: "20px" }}
      >
        {/* Circular Gauge */}
        <div className="relative w-28 h-28 flex-shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#334155"
              strokeWidth="8"
            />
            {/* Progress circle */}
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={getStrokeColor(score)}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              className={`text-2xl font-bold ${getScoreColor(score)}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{ marginBottom: "2px" }}
            >
              {score.toFixed(1)}%
            </motion.span>
            <span className="text-xs text-slate-500">Overall</span>
          </div>
        </div>

        {/* Breakdown */}
        <div
          className="flex-1"
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          {Object.entries(breakdown).map(([key, value]) => (
            <div
              key={key}
              className="flex items-center justify-between"
              style={{ padding: "4px 0" }}
            >
              <span className="text-xs font-medium text-slate-400 uppercase">
                {key}
              </span>
              <div className="flex items-center" style={{ gap: "12px" }}>
                <div className="w-24 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: getStrokeColor(value) }}
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  />
                </div>
                <span className={`text-xs font-medium ${getScoreColor(value)}`}>
                  {value.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="flex items-center justify-between text-xs border-t border-slate-800"
        style={{ marginTop: "20px", paddingTop: "16px" }}
      >
        <span className="text-slate-500">Next scheduled audit</span>
        <span className="text-medical-400 font-medium">{nextAudit}</span>
      </div>
    </div>
  );
}
