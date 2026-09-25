"use client";

import React, { useState } from "react";
import { ClaimRecord } from "../data/mockData";
import { 
  FileSpreadsheet, ShieldAlert, CheckCircle, AlertTriangle, 
  Search, Filter, Download, Sparkles, Eye, ArrowUpDown, 
  Check, RefreshCw, X, ChevronRight, AlertCircle, FileCheck
} from "lucide-react";

interface ClaimsStudioTabProps {
  claims: ClaimRecord[];
  onSelectClaim: (claim: ClaimRecord) => void;
  onOpenNewClaim: () => void;
  onUpdateStatus: (claimId: string, newStatus: ClaimRecord["status"], newNote?: string) => void;
}

export default function ClaimsStudioTab({
  claims,
  onSelectClaim,
  onOpenNewClaim,
  onUpdateStatus,
}: ClaimsStudioTabProps) {
  const [filterRisk, setFilterRisk] = useState<"all" | "low" | "medium" | "high">("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [batchSuccessMsg, setBatchSuccessMsg] = useState<string | null>(null);

  const filtered = claims.filter((c) => {
    const matchRisk = filterRisk === "all" || c.riskLevel === filterRisk;
    const matchStatus = filterStatus === "all" || c.status === filterStatus;
    const matchSearch =
      searchTerm === "" ||
      c.claimNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.providerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.diagnosisCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.procedureCode.toLowerCase().includes(searchTerm.toLowerCase());

    return matchRisk && matchStatus && matchSearch;
  });

  const handleBatchAdjudicate = () => {
    let count = 0;
    claims.forEach((c) => {
      if (c.status === "pending" && c.riskScore < 50) {
        onUpdateStatus(c.id, "approved", "Batch auto-approved by AI Policy Rule Engine");
        count++;
      }
    });
    setBatchSuccessMsg(`Successfully batch adjudicated and approved ${count} low-risk pending claims!`);
    setTimeout(() => setBatchSuccessMsg(null), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            Claims Adjudication & Fraud Engine Studio
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time rule engine execution, SHAP fraud anomaly scoring, and automated decisioning
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleBatchAdjudicate}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
            <span>Batch Adjudicate Pending</span>
          </button>

          <button
            onClick={onOpenNewClaim}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Ingest Claim</span>
          </button>
        </div>
      </div>

      {batchSuccessMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in duration-200">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{batchSuccessMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#0d1424]/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Claim #, Patient, Doctor, ICD-10..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Risk and Status Filters */}
        <div className="flex flex-wrap items-center gap-2">
          
          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Risk:</span>
            {(["all", "low", "medium", "high"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setFilterRisk(level)}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                  filterRisk === level
                    ? level === "high"
                      ? "bg-rose-500 text-white font-bold"
                      : level === "medium"
                      ? "bg-amber-500 text-slate-950 font-bold"
                      : level === "low"
                      ? "bg-emerald-500 text-slate-950 font-bold"
                      : "bg-slate-700 text-white font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {level}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
            <span className="text-[10px] uppercase font-bold text-slate-400 px-2">Status:</span>
            {["all", "approved", "flagged", "pending", "denied"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-2.5 py-1 rounded capitalize font-medium transition-colors ${
                  filterStatus === status
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Claims List Grid */}
      <div className="space-y-3">
        {filtered.map((claim) => (
          <div
            key={claim.id}
            onClick={() => onSelectClaim(claim)}
            className="p-5 rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 hover:border-slate-700 shadow-lg hover:shadow-cyan-500/5 cursor-pointer transition-all space-y-3 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-white text-sm group-hover:text-cyan-400 transition-colors">
                  {claim.claimNumber}
                </span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize border ${
                  claim.status === "approved"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : claim.status === "flagged"
                    ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                    : claim.status === "pending"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}>
                  {claim.status}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {claim.serviceDate}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Submitted Charge</span>
                  <span className="text-base font-bold text-white font-mono">
                    ${claim.billedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                {claim.approvedAmount > 0 && (
                  <div className="text-right pl-3 border-l border-slate-800">
                    <span className="text-xs text-emerald-400 block">Allowed Fee</span>
                    <span className="text-base font-bold text-emerald-400 font-mono">
                      ${claim.approvedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Demographics and Diagnosis */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Patient & Encounter</span>
                <p className="font-semibold text-white mt-0.5">{claim.patientName} (DOB: {claim.patientDob})</p>
                <p className="font-mono text-cyan-300 text-[11px]">{claim.patientMrn}</p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Rendering Provider</span>
                <p className="font-semibold text-white mt-0.5">{claim.providerName}</p>
                <p className="text-slate-400 text-[11px]">{claim.facility} • NPI {claim.providerNpi}</p>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold">Coding Details</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 font-mono border border-emerald-800/60 font-bold">
                    {claim.diagnosisCode}
                  </span>
                  <span className="text-slate-300 truncate">{claim.diagnosisDesc}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 font-mono border border-cyan-800/60 font-bold">
                    {claim.procedureCode}
                  </span>
                  <span className="text-slate-300 truncate">{claim.procedureDesc}</span>
                </div>
              </div>
            </div>

            {/* AI Decision & Fraud Alert Ribbon */}
            <div className="pt-2 border-t border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              
              <div className="flex items-center gap-3">
                <span className={`px-2 py-0.5 rounded font-mono font-bold border ${
                  claim.riskScore < 25 
                    ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                    : claim.riskScore < 60
                    ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                    : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                }`}>
                  Risk Score: {claim.riskScore}/100 ({claim.riskLevel})
                </span>

                <span className="text-slate-400 hidden md:inline">
                  AI Confidence: <strong className="text-white">{claim.aiConfidence}%</strong>
                </span>

                <span className="text-slate-400 hidden lg:inline truncate max-w-sm">
                  Policy: <strong className="text-cyan-300">{claim.policyMatch}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-semibold text-xs">
                  Inspect & Adjudicate <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
