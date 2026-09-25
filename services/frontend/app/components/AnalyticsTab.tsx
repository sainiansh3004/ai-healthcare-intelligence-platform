"use client";

import React from "react";
import { DENIAL_ROOT_CAUSES } from "../data/mockData";
import { 
  BarChart3, DollarSign, TrendingUp, ShieldAlert, 
  ArrowUpRight, ArrowDownRight, Building2, PieChart as PieIcon, CheckCircle2
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell 
} from "recharts";

export default function AnalyticsTab() {
  const payerPerformance = [
    { payer: "Medicare (Part B & Advantage)", volume: "$2,450,000", claims: 890, cleanRate: "94.2%", daysAR: "12 days", status: "optimal" },
    { payer: "BlueCross BlueShield", volume: "$1,820,000", claims: 540, cleanRate: "91.8%", daysAR: "19 days", status: "optimal" },
    { payer: "Aetna Commercial", volume: "$1,120,000", claims: 320, cleanRate: "89.4%", daysAR: "22 days", status: "attention" },
    { payer: "UnitedHealthcare", volume: "$1,490,000", claims: 410, cleanRate: "86.1%", daysAR: "29 days", status: "warning" },
  ];

  const barData = DENIAL_ROOT_CAUSES.map(d => ({
    name: d.reason,
    count: d.count,
    percentage: d.percentage
  }));

  const barColors = ["#06b6d4", "#f43f5e", "#f59e0b", "#8b5cf6", "#64748b"];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            Revenue Cycle Telemetry & Denial Intelligence
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time financial yield analysis, denial root-cause prevention, and payer reimbursement velocity
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-slate-400">Total Net Collections:</span>
          <span className="text-sm font-bold font-mono text-emerald-400">$6,880,000 USD</span>
        </div>
      </div>

      {/* 3 Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Automated Denial Recovery
          </span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-emerald-400 font-mono">$482,400</h3>
            <span className="text-xs text-emerald-400 flex items-center font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +18.4%
            </span>
          </div>
          <p className="text-xs text-slate-400">Recovered via autonomous clinical appeal generation</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Average Days in A/R
          </span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-cyan-400 font-mono">16.4 Days</h3>
            <span className="text-xs text-emerald-400 flex items-center font-medium">
              <ArrowDownRight className="w-3.5 h-3.5" /> -8.2 Days
            </span>
          </div>
          <p className="text-xs text-slate-400">Industry average: 38-45 days across regional health systems</p>
        </div>

        <div className="p-5 rounded-2xl bg-[#0d1424]/80 border border-slate-800/80 space-y-2">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Overall Clean Claim Rate
          </span>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-white font-mono">92.6%</h3>
            <span className="text-xs text-emerald-400 flex items-center font-medium">
              <ArrowUpRight className="w-3.5 h-3.5" /> +4.1%
            </span>
          </div>
          <p className="text-xs text-slate-400">Claims accepted on first electronic submission</p>
        </div>

      </div>

      {/* Denial Root Cause Breakdown */}
      <div className="p-5 rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-white">Denial Root-Cause Frequency Analysis</h3>
            <p className="text-xs text-slate-400">Categorization of claim rejection triggers across 111 audited denials</p>
          </div>
          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            Top Factor: Missing Prior Auth (38%)
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData} layout="vertical" margin={{ top: 10, right: 30, left: 140, bottom: 5 }}>
              <XAxis type="number" stroke="#64748b" fontSize={11} tickLine={false} />
              <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0b1220", borderColor: "#1e293b", borderRadius: "8px", fontSize: "12px", color: "#fff" }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Payer Performance Matrix */}
      <div className="rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-lg p-5 space-y-4">
        <div>
          <h3 className="text-sm font-bold text-white">Commercial & Government Payer Matrix</h3>
          <p className="text-xs text-slate-400">Approval velocities and adjudication friction scores by health plan</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-3">Payer Plan</th>
                <th className="py-3 px-3 text-right">Adjudicated Value</th>
                <th className="py-3 px-3 text-right">Volume</th>
                <th className="py-3 px-3 text-center">Clean Claim Rate</th>
                <th className="py-3 px-3 text-center">Days in A/R</th>
                <th className="py-3 px-3 text-right">Adjudication Health</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {payerPerformance.map((payer) => (
                <tr key={payer.payer} className="hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white">
                    {payer.payer}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-200">
                    {payer.volume}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-400">
                    {payer.claims}
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {payer.cleanRate}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-center font-mono text-slate-300">
                    {payer.daysAR}
                  </td>
                  <td className="py-3 px-3 text-right">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold uppercase ${
                      payer.status === "optimal"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : payer.status === "attention"
                        ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                        : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                    }`}>
                      ● {payer.status}
                    </span>
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
