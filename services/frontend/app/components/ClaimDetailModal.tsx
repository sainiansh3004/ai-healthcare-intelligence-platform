"use client";

import React, { useState } from "react";
import { ClaimRecord } from "../data/mockData";
import { 
  X, ShieldAlert, CheckCircle, AlertTriangle, FileText, 
  DollarSign, Activity, Sparkles, Building, User, Calendar, 
  Download, ArrowRight, ShieldCheck, Check, Clock
} from "lucide-react";

interface ClaimDetailModalProps {
  claim: ClaimRecord | null;
  onClose: () => void;
  onUpdateStatus: (claimId: string, newStatus: ClaimRecord["status"], newNote?: string) => void;
}

export default function ClaimDetailModal({ claim, onClose, onUpdateStatus }: ClaimDetailModalProps) {
  if (!claim) return null;

  const [overrideAction, setOverrideAction] = useState<string | null>(null);
  const [overrideSuccess, setOverrideSuccess] = useState(false);

  const getStatusBadge = (status: ClaimRecord["status"]) => {
    switch (status) {
      case "approved":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="w-3.5 h-3.5" /> Approved
          </span>
        );
      case "flagged":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="w-3.5 h-3.5" /> Flagged for Audit
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" /> Prior-Auth Pending
          </span>
        );
      case "denied":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400 border border-red-500/20">
            <X className="w-3.5 h-3.5" /> Denied
          </span>
        );
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score < 25) return "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
    if (score < 60) return "text-amber-400 bg-amber-500/10 border-amber-500/20";
    return "text-rose-400 bg-rose-500/10 border-rose-500/20";
  };

  const handleApplyOverride = (status: ClaimRecord["status"]) => {
    setOverrideAction(status);
    setTimeout(() => {
      onUpdateStatus(claim.id, status, `Manual override executed by Medical Auditor at ${new Date().toLocaleTimeString()}`);
      setOverrideSuccess(true);
      setTimeout(() => {
        setOverrideSuccess(false);
        setOverrideAction(null);
      }, 1500);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm transition-opacity duration-300">
      <div 
        className="w-full max-w-2xl h-full bg-[#0b1220] border-l border-slate-800 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-[#090e1a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 font-mono text-sm font-semibold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-white tracking-tight">{claim.claimNumber}</h3>
                {getStatusBadge(claim.status)}
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>Ingested: {claim.serviceDate}</span>
                <span>•</span>
                <span className="font-mono text-cyan-300">{claim.id}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Top telemetry card */}
          <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <div>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Billed Amount</span>
              <p className="text-xl font-bold text-white mt-1">
                ${claim.billedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <span className="text-[10px] text-slate-400">Submitted Charge</span>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Adjudicated Fee</span>
              <p className="text-xl font-bold text-emerald-400 mt-1">
                ${claim.approvedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </p>
              <span className="text-[10px] text-emerald-500/80">Allowable Schedule</span>
            </div>
            <div>
              <span className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Fraud Risk Index</span>
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2 py-0.5 rounded text-xs font-mono font-bold border ${getRiskScoreColor(claim.riskScore)}`}>
                  {claim.riskScore} / 100
                </span>
                <span className="text-[11px] text-slate-300 capitalize">{claim.riskLevel} Risk</span>
              </div>
              <span className="text-[10px] text-slate-400">AI Confidence: {claim.aiConfidence}%</span>
            </div>
          </div>

          {/* AI Decision Rationale Callout */}
          <div className={`p-4 rounded-xl border ${
            claim.status === "approved" 
              ? "bg-emerald-950/20 border-emerald-500/30 text-emerald-200" 
              : claim.status === "flagged" 
              ? "bg-rose-950/20 border-rose-500/30 text-rose-200"
              : "bg-amber-950/20 border-amber-500/30 text-amber-200"
          }`}>
            <div className="flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Autonomous Adjudication Rationale
                </h4>
                <p className="text-sm font-medium text-white leading-relaxed">
                  {claim.adjudicationNote}
                </p>
                <div className="pt-2 text-xs text-cyan-300 flex items-center gap-1.5 font-mono">
                  <span>Policy Basis:</span>
                  <span className="underline decoration-cyan-500/40">{claim.policyMatch}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fraud / Anomaly Alerts */}
          {claim.fraudAlerts.length > 0 && (
            <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                Detected Billing Discrepancies ({claim.fraudAlerts.length})
              </div>
              <ul className="space-y-1.5 text-xs text-rose-200/90 pl-5 list-disc">
                {claim.fraudAlerts.map((alert, i) => (
                  <li key={i}>{alert}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Patient & Provider Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Patient Card */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <User className="w-4 h-4 text-cyan-400" />
                Patient Demographics
              </div>
              <div>
                <p className="text-sm font-bold text-white">{claim.patientName}</p>
                <p className="text-xs text-slate-400 mt-0.5">DOB: {claim.patientDob}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-cyan-300 border border-slate-700">
                  {claim.patientMrn}
                </div>
              </div>
            </div>

            {/* Provider Card */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <Building className="w-4 h-4 text-indigo-400" />
                Rendering Provider
              </div>
              <div>
                <p className="text-sm font-bold text-white">{claim.providerName}</p>
                <p className="text-xs text-slate-400 mt-0.5">{claim.facility}</p>
                <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-[11px] font-mono text-indigo-300 border border-slate-700">
                  NPI: {claim.providerNpi}
                </div>
              </div>
            </div>

          </div>

          {/* Medical Codes Details */}
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Clinical Coding Breakdown
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-emerald-400">Primary Diagnosis (ICD-10)</span>
                <p className="text-base font-mono font-bold text-white mt-1">{claim.diagnosisCode}</p>
                <p className="text-xs text-slate-300 mt-0.5">{claim.diagnosisDesc}</p>
              </div>

              <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800">
                <span className="text-[10px] uppercase font-bold text-cyan-400">Procedure (CPT / HCPCS)</span>
                <p className="text-base font-mono font-bold text-white mt-1">{claim.procedureCode}</p>
                <p className="text-xs text-slate-300 mt-0.5">{claim.procedureDesc}</p>
              </div>
            </div>
          </div>

          {/* Audit Verification Stamp */}
          <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Cryptographic Audit Proof:</span>
              <span className="font-mono text-slate-300">SHA-256 Verified</span>
            </div>
            <span className="text-slate-400">HIPAA Safeguard Level 3</span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-800 bg-[#090e1a] flex flex-wrap items-center justify-between gap-3">
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleApplyOverride("approved")}
              disabled={claim.status === "approved" || overrideAction !== null}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                claim.status === "approved"
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30"
              }`}
            >
              <Check className="w-3.5 h-3.5" />
              Approve Claim
            </button>

            <button
              onClick={() => handleApplyOverride("flagged")}
              disabled={claim.status === "flagged" || overrideAction !== null}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                claim.status === "flagged"
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-amber-600 hover:bg-amber-500 text-white shadow-md shadow-amber-900/30"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Flag for Audit
            </button>

            <button
              onClick={() => handleApplyOverride("denied")}
              disabled={claim.status === "denied" || overrideAction !== null}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                claim.status === "denied"
                  ? "bg-slate-800 text-slate-400 cursor-not-allowed"
                  : "bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-900/30"
              }`}
            >
              <X className="w-3.5 h-3.5" />
              Deny
            </button>
          </div>

          <div className="flex items-center gap-2">
            {overrideSuccess && (
              <span className="text-xs text-emerald-400 font-medium animate-pulse">
                ✓ Decision updated
              </span>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition-colors"
            >
              Close
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
