"use client";

import React, { useState } from "react";
import { 
  ClaimRecord, TIMELINE_CHART_DATA, ADJUDICATION_PIE_DATA 
} from "../data/mockData";
import { 
  DollarSign, CheckCircle2, AlertTriangle, Clock, 
  ArrowUpRight, ArrowDownRight, Filter, ChevronRight, 
  Sparkles, ShieldCheck, Activity, Search, Eye
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";

interface OverviewTabProps {
  claims: ClaimRecord[];
  onSelectClaim: (claim: ClaimRecord) => void;
  onOpenNewClaim: () => void;
  searchQuery: string;
}

export default function OverviewTab({ 
  claims, 
  onSelectClaim, 
  onOpenNewClaim,
  searchQuery 
}: OverviewTabProps) {
  const [timeRange, setTimeRange] = useState<"today" | "7d" | "30d" | "ytd">("today");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredClaims = claims.filter((c) => {
    const matchesSearch = 
      searchQuery === "" ||
      c.claimNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.diagnosisCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.procedureCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.providerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || c.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalBilled = claims.reduce((acc, c) => acc + c.billedAmount, 0);
  const approvedClaimsCount = claims.filter(c => c.status === "approved").length;
  const flaggedCount = claims.filter(c => c.status === "flagged").length;
  const cleanApprovalRate = Math.round((approvedClaimsCount / claims.length) * 100);

  return (
    <div className="space-y-6">
      
      {/* Top Filter and Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            Executive Command Center
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Stream
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry across multi-facility claims intake, AI adjudication, and fraud prevention
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Time range buttons */}
          <div className="inline-flex rounded-lg bg-slate-900/80 border border-slate-800 p-1 text-xs">
            {(["today", "7d", "30d", "ytd"] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded-md capitalize transition-colors ${
                  timeRange === range
                    ? "bg-cyan-500 text-slate-950 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {range === "today" ? "Today" : range === "7d" ? "7 Days" : range === "30d" ? "30 Days" : "YTD"}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenNewClaim}
            className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-semibold flex items-center gap-1.5 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulate Claim</span>
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Total Volume */}
        <div className="p-5 rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Claims Value</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-white font-mono">
              ${(totalBilled * 42.5).toLocaleString("en-US", { maximumFractionDigits: 0 })}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-emerald-400 font-medium flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +14.8%
              </span>
              <span className="text-slate-400">vs previous period</span>
            </div>
          </div>
        </div>

        {/* Card 2: Auto-Approval */}
        <div className="p-5 rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Clean Auto-Approval</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-emerald-400 font-mono">
              91.4%
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-emerald-400 font-medium flex items-center">
                <ArrowUpRight className="w-3.5 h-3.5" /> +3.2%
              </span>
              <span className="text-slate-400">1,684 instant decisions</span>
            </div>
          </div>
        </div>

        {/* Card 3: Fraud Flags */}
        <div className="p-5 rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-500/5 rounded-full blur-2xl group-hover:bg-rose-500/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Fraud & Upcode Flags</span>
            <div className="w-8 h-8 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-rose-400 font-mono">
              3.5%
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-emerald-400 font-medium flex items-center">
                <ArrowDownRight className="w-3.5 h-3.5" /> -0.8%
              </span>
              <span className="text-slate-400">$340K loss prevented</span>
            </div>
          </div>
        </div>

        {/* Card 4: Adjudication Latency */}
        <div className="p-5 rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 shadow-lg relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Adjudication Time</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <h3 className="text-2xl font-bold text-indigo-300 font-mono">
              1.18s
            </h3>
            <div className="flex items-center gap-2 mt-1 text-xs">
              <span className="text-emerald-400 font-medium flex items-center">
                <ArrowDownRight className="w-3.5 h-3.5" /> -380ms
              </span>
              <span className="text-slate-400">99.8% SLA adherence</span>
            </div>
          </div>
        </div>

      </div>

      {/* Visual Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Trend Area Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">Hourly Adjudication Velocity</h3>
              <p className="text-xs text-slate-400">Processed encounters and clean auto-approvals throughout the day</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Peak: 410 claims/hr
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TIMELINE_CHART_DATA}>
                <defs>
                  <linearGradient id="colorClaims" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorAuto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0b1220", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                />
                <Area type="monotone" dataKey="claims" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorClaims)" name="Total Claims" />
                <Area type="monotone" dataKey="autoApproved" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorAuto)" name="Auto-Approved" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Adjudication Distribution Donut Chart */}
        <div className="p-5 rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 shadow-lg space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white">Adjudication Breakdown</h3>
            <p className="text-xs text-slate-400">Distribution across 1,842 processed encounters</p>
          </div>

          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={ADJUDICATION_PIE_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {ADJUDICATION_PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#0b1220", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-800/60 text-xs">
            {ADJUDICATION_PIE_DATA.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-slate-300">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  {item.name}
                </span>
                <span className="font-mono font-semibold text-white">{item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Live Claims Queue Table */}
      <div className="rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 shadow-lg overflow-hidden space-y-4 p-5">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              Live Intake & Adjudication Stream
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {filteredClaims.length} records
              </span>
            </h3>
            <p className="text-xs text-slate-400">Click any row to inspect deep clinical details, AI explainability, and fraud scores</p>
          </div>

          {/* Table status filters */}
          <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
            {["all", "approved", "flagged", "pending", "denied"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1 rounded-lg capitalize transition-colors ${
                  statusFilter === status
                    ? "bg-slate-700 text-white font-semibold"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Claim ID</th>
                <th className="py-3 px-3">Patient / MRN</th>
                <th className="py-3 px-3">Provider</th>
                <th className="py-3 px-3">Clinical Codes</th>
                <th className="py-3 px-3 text-right">Billed Amount</th>
                <th className="py-3 px-3 text-center">Risk Score</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredClaims.map((claim) => (
                <tr 
                  key={claim.id}
                  onClick={() => onSelectClaim(claim)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors group"
                >
                  <td className="py-3.5 px-3">
                    <span className="font-mono font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {claim.claimNumber}
                    </span>
                    <span className="block text-[10px] text-slate-400">{claim.serviceDate}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="font-medium text-white block">{claim.patientName}</span>
                    <span className="font-mono text-[10px] text-cyan-300">{claim.patientMrn}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <span className="text-slate-200 block truncate max-w-[150px]">{claim.providerName}</span>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[150px]">{claim.facility}</span>
                  </td>

                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-emerald-950/60 text-emerald-300 font-mono border border-emerald-800/50 text-[10px]">
                        {claim.diagnosisCode}
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-cyan-950/60 text-cyan-300 font-mono border border-cyan-800/50 text-[10px]">
                        {claim.procedureCode}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <span className="font-mono font-bold text-white">
                      ${claim.billedAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </span>
                    {claim.approvedAmount > 0 && (
                      <span className="block text-[10px] text-emerald-400">
                        Apprv: ${claim.approvedAmount.toFixed(0)}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded font-mono font-bold text-[11px] border ${
                      claim.riskScore < 25 
                        ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" 
                        : claim.riskScore < 60
                        ? "text-amber-400 bg-amber-500/10 border-amber-500/20"
                        : "text-rose-400 bg-rose-500/10 border-rose-500/20"
                    }`}>
                      {claim.riskScore}
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold border capitalize ${
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
                  </td>

                  <td className="py-3.5 px-3 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectClaim(claim);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-300 transition-colors"
                      title="Inspect Claim"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
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
