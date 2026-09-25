"use client";

import React, { useState } from "react";
import { AUDIT_TRAIL, AuditLogItem } from "../data/mockData";
import { 
  ShieldCheck, Lock, Key, Copy, Check, ExternalLink, 
  Download, Terminal, AlertTriangle, FileCheck, CheckCircle2 
} from "lucide-react";

export default function AuditLogsTab() {
  const [copiedKey, setCopiedKey] = useState(false);
  const [apiKey] = useState("aegis_live_9942f8b03e2849102c7a912e");
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            HIPAA Security, Access Control & Audit Ledger
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Cryptographically sealed immutable audit log tracking all PHI access, adjudication overrides, and model inferences
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{downloadSuccess ? "Report Downloaded!" : "Export Compliance Ledger (PDF)"}</span>
          </button>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider">HIPAA Safe Harbor Compliant</h4>
            <p className="text-xs text-slate-300">
              18 HIPAA direct identifiers stripped via on-premises NLP de-identification pipeline before model inference.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-start gap-3">
          <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">SOC 2 Type II Certified</h4>
            <p className="text-xs text-slate-300">
              Continuous monitoring across 14 security criteria, AES-256 at rest, TLS 1.3 in transit.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 flex items-start gap-3">
          <FileCheck className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Signed BAA Executed</h4>
            <p className="text-xs text-slate-300">
              Business Associate Agreement in effect for Metropolis Health System. Zero PHI retention for model training.
            </p>
          </div>
        </div>

      </div>

      {/* API Key Management Box */}
      <div className="p-5 rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-lg space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Production REST API Key</h3>
          </div>
          <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-mono">
            Active · Scope: Read/Write Claims
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Use this key in the Authorization header (<code className="text-cyan-300 font-mono">Bearer aegis_live_...</code>) to submit claims via our FastAPI service.
        </p>

        <div className="flex items-center gap-2">
          <div className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-300 select-all overflow-hidden text-ellipsis">
            {apiKey}
          </div>
          <button
            onClick={handleCopyKey}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedKey ? "Copied" : "Copy Key"}</span>
          </button>
        </div>
      </div>

      {/* Immutable Audit Ledger Table */}
      <div className="rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-lg p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Immutable Event Ledger (SHA-256)</h3>
            <p className="text-xs text-slate-400">Tamper-evident log of all clinical interactions and automated decisions</p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            {AUDIT_TRAIL.length} Audit Nodes Synced
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Timestamp (UTC)</th>
                <th className="py-3 px-3">Actor / Principal</th>
                <th className="py-3 px-3">Action Event</th>
                <th className="py-3 px-3">Resource Target</th>
                <th className="py-3 px-3">IP / Network</th>
                <th className="py-3 px-3 text-right">Integrity Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {AUDIT_TRAIL.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {item.timestamp}
                  </td>
                  <td className="py-3 px-3 text-white text-[11px] font-sans font-medium">
                    {item.actor}
                    <span className="block text-[10px] text-slate-400 font-sans">{item.role}</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.status === "success"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    }`}>
                      {item.action}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-sans text-[11px]">
                    {item.resource}
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">
                    {item.ipAddress}
                  </td>
                  <td className="py-3 px-3 text-right text-[10px] text-cyan-400/80 max-w-[140px] truncate" title={item.sha256Hash}>
                    {item.sha256Hash.substring(0, 16)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
