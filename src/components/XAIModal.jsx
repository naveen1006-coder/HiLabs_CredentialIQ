import { motion, AnimatePresence } from 'framer-motion';
import { X, Brain, Database, ArrowRight, Shield, ExternalLink } from 'lucide-react';

export function XAIModal({ isOpen, onClose, anomaly }) {
    if (!isOpen || !anomaly) return null;

    const { xaiExplanation } = anomaly;
    const confidencePercent = (xaiExplanation.confidence * 100).toFixed(0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[85vh] overflow-hidden bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl z-50"
                    >
                        {/* Header */}
                        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 to-slate-800">
                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-lg bg-medical-600/20 border border-medical-600/30">
                                    <Brain className="w-5 h-5 text-medical-400" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">AI Explanation</h2>
                                    <p className="text-xs text-slate-400">Explainable AI (XAI) Reasoning</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]">
                            {/* Provider Info */}
                            <div className="mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-slate-400">Provider</p>
                                        <p className="text-lg font-semibold text-white">{anomaly.providerName}</p>
                                        <p className="text-sm text-slate-500">{anomaly.specialty} • {anomaly.providerId}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-slate-400">Confidence</p>
                                        <p className={`text-2xl font-bold ${xaiExplanation.confidence >= 0.9 ? 'text-emerald-400' :
                                                xaiExplanation.confidence >= 0.7 ? 'text-amber-400' : 'text-danger-400'
                                            }`}>
                                            {confidencePercent}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Flag Reason */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-slate-300 mb-2 flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-danger-400" />
                                    Reason for Flag
                                </h3>
                                <div className="p-4 rounded-xl bg-danger-500/10 border border-danger-500/30">
                                    <p className="text-sm font-medium text-danger-300">{anomaly.title}</p>
                                    <p className="text-sm text-slate-400 mt-1">{anomaly.description}</p>
                                </div>
                            </div>

                            {/* Reasoning Chain */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                    <Brain className="w-4 h-4 text-medical-400" />
                                    AI Reasoning Chain
                                </h3>
                                <div className="space-y-2">
                                    {xaiExplanation.reasoning.map((step, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-medical-600/30 border border-medical-600/50 flex items-center justify-center">
                                                <span className="text-xs font-medium text-medical-300">{index + 1}</span>
                                            </div>
                                            <div className="flex-1 p-3 rounded-lg bg-slate-800/50 border border-slate-700">
                                                <p className="text-sm text-slate-300">{step}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Data Sources */}
                            <div className="mb-6">
                                <h3 className="text-sm font-medium text-slate-300 mb-3 flex items-center gap-2">
                                    <Database className="w-4 h-4 text-emerald-400" />
                                    Verified Data Sources
                                </h3>
                                <div className="grid gap-2">
                                    {xaiExplanation.dataSources.map((source, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                                <div>
                                                    <p className="text-sm font-medium text-white">{source.name}</p>
                                                    {source.url && (
                                                        <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-medical-400 hover:underline flex items-center gap-1">
                                                            {source.url} <ExternalLink className="w-3 h-3" />
                                                        </a>
                                                    )}
                                                    {source.docId && (
                                                        <p className="text-xs text-slate-500">Document: {source.docId}</p>
                                                    )}
                                                    {source.section && (
                                                        <p className="text-xs text-slate-500">Section: {source.section}</p>
                                                    )}
                                                </div>
                                            </div>
                                            <span className="text-xs text-slate-500">
                                                {source.queryDate || source.lastUpdated || source.submitDate}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recommendation */}
                            <div className="p-4 rounded-xl bg-medical-600/10 border border-medical-600/30">
                                <h3 className="text-sm font-medium text-medical-300 mb-2 flex items-center gap-2">
                                    <ArrowRight className="w-4 h-4" />
                                    AI Recommendation
                                </h3>
                                <p className="text-sm text-white">{xaiExplanation.recommendation}</p>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-slate-800 flex items-center justify-between bg-slate-900">
                            <p className="text-xs text-slate-500">
                                This explanation is audit-ready and complies with NCQA, URAC, and CMS standards.
                            </p>
                            <button
                                onClick={onClose}
                                className="px-4 py-2 rounded-lg bg-medical-600 hover:bg-medical-700 text-white text-sm font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
