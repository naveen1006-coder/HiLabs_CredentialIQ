import { motion } from "framer-motion";
import { Activity, Users, AlertTriangle, CheckCircle } from "lucide-react";
import { StatCard } from "./StatCard";
import { ComplianceScore } from "./ComplianceScore";
import { AgentStatusCard } from "./AgentStatusCard";
import { AnomalyFeed } from "./AnomalyFeed";
import { ReviewQueue } from "./ReviewQueue";
import { AuditTimeline } from "./AuditTimeline";
import {
  aiAgents,
  anomalyFeed,
  reviewQueue,
  auditTimeline,
  dashboardStats,
  complianceScore,
} from "../data/credentialIQData";

export function Dashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Cards Section */}
      <section
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
        style={{ marginBottom: "16px" }}
      >
        <StatCard
          value={dashboardStats.processing.value}
          label={dashboardStats.processing.label}
          trend={dashboardStats.processing.trend}
          trendUp={dashboardStats.processing.trendUp}
          icon={Activity}
          color="medical"
        />
        <StatCard
          value={dashboardStats.pendingReview.value}
          label={dashboardStats.pendingReview.label}
          trend={dashboardStats.pendingReview.trend}
          trendUp={dashboardStats.pendingReview.trendUp}
          icon={Users}
          color="amber"
        />
        <StatCard
          value={dashboardStats.flagged.value}
          label={dashboardStats.flagged.label}
          trend={dashboardStats.flagged.trend}
          trendUp={dashboardStats.flagged.trendUp}
          icon={AlertTriangle}
          color="danger"
        />
        <StatCard
          value={dashboardStats.approved.value}
          label={dashboardStats.approved.label}
          trend={dashboardStats.approved.trend}
          trendUp={dashboardStats.approved.trendUp}
          icon={CheckCircle}
          color="emerald"
        />
      </section>

      {/* Main Content Grid - 2 columns */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6"
        style={{ marginBottom: "16px" }}
      >
        {/* Left Column */}
        <div className="space-y-6">
          {/* Compliance Score */}
          <div style={{ marginBottom: "24px" }}>
            <ComplianceScore
              score={complianceScore.overall}
              breakdown={complianceScore.breakdown}
              lastAudit={complianceScore.lastAudit}
              nextAudit={complianceScore.nextAudit}
            />
          </div>

          {/* AI Agents */}
          <div
            className="bg-slate-900 border border-slate-800 rounded-xl"
            style={{ padding: "24px" }}
          >
            <div
              className="flex items-center justify-between"
              style={{ marginBottom: "16px" }}
            >
              <h3 className="text-sm font-semibold text-white">AI Agents</h3>
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center text-xs text-emerald-400"
                style={{ gap: "8px" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Live
              </motion.span>
            </div>
            <div
              className="grid grid-cols-1 sm:grid-cols-2"
              style={{ gap: "12px" }}
            >
              {aiAgents.slice(0, 4).map((agent) => (
                <AgentStatusCard key={agent.id} agent={agent} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="mt-0 flex flex-col">
          <AnomalyFeed anomalies={anomalyFeed} />
        </div>
      </section>

      {/* Bottom Section - Review Queue and Audit Timeline */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ReviewQueue
          items={reviewQueue}
          onApprove={(id) => console.log("Approved:", id)}
          onReject={(id) => console.log("Rejected:", id)}
          onEscalate={(id) => console.log("Escalated:", id)}
        />
        <AuditTimeline entries={auditTimeline.slice(0, 5)} />
      </section>
    </div>
  );
}
