"use client";

import React from "react";
import Link from "next/link";
import { 
  Activity, LayoutDashboard, FileSpreadsheet, FileText, 
  Bot, BarChart3, ShieldCheck, Sparkles, Plus, 
  ExternalLink, ArrowLeft, Database, Key
} from "lucide-react";

export type TabType = "overview" | "claims" | "documents" | "rag" | "analytics" | "audit";

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  onOpenNewClaim?: () => void;
}

export default function Sidebar({ currentTab, onSelectTab, onOpenNewClaim }: SidebarProps) {
  const navItems: { id: TabType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { 
      id: "overview", 
      label: "Command Center", 
      icon: <LayoutDashboard className="w-4 h-4" /> 
    },
    { 
      id: "claims", 
      label: "Claims & Fraud Engine", 
      icon: <FileSpreadsheet className="w-4 h-4" />,
      badge: "Live" 
    },
    { 
      id: "documents", 
      label: "Medical OCR & Intake", 
      icon: <FileText className="w-4 h-4" />,
      badge: "99.4%" 
    },
    { 
      id: "rag", 
      label: "Clinical Protocol RAG", 
      icon: <Bot className="w-4 h-4" />,
      badge: "CMS 2026"
    },
    { 
      id: "analytics", 
      label: "Revenue Cycle Telemetry", 
      icon: <BarChart3 className="w-4 h-4" /> 
    },
    { 
      id: "audit", 
      label: "HIPAA Audit & Security", 
      icon: <ShieldCheck className="w-4 h-4" /> 
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-[#070c18] border-r border-slate-800/80 flex flex-col justify-between p-4 shrink-0 select-none">
      
      {/* Top Branding & Main Navigation */}
      <div className="space-y-6">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 px-2 py-1.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
            <div className="w-full h-full bg-[#0a101f] rounded-[10px] flex items-center justify-center">
              <Activity className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base text-white tracking-tight">AegisHealth</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded font-bold font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400">Clinical Intelligence SaaS</p>
          </div>
        </Link>

        {/* Quick Action Button */}
        {onOpenNewClaim && (
          <button
            onClick={onOpenNewClaim}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-500 bg-size-200 hover:bg-right transition-all duration-300 text-white font-medium text-xs shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>New Claim Ingestion</span>
          </button>
        )}

        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Platform Modules
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-sm shadow-cyan-500/10 font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? "text-cyan-400" : "text-slate-400"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                      isActive 
                        ? "bg-cyan-400 text-slate-950" 
                        : "bg-slate-800 text-slate-300 border border-slate-700/60"
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

      </div>

      {/* Bottom Section: Quota Meter & Back Link */}
      <div className="space-y-4 pt-4 border-t border-slate-800/80">
        
        {/* Usage Meter Card */}
        <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">Monthly Claims Quota</span>
            <span className="font-mono font-bold text-cyan-300">84%</span>
          </div>
          
          <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full w-[84%]" />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400">
            <span>8,420 processed</span>
            <span>10,000 plan</span>
          </div>
        </div>

        {/* Link back to public landing page */}
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-cyan-300 hover:bg-slate-900/50 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Public Portal</span>
        </Link>

        {/* Mini version footnote */}
        <div className="px-3 flex items-center justify-between text-[10px] text-slate-400 font-mono">
          <span>Engine v2.4.14</span>
          <span className="text-emerald-400 flex items-center gap-1">● Synced</span>
        </div>

      </div>

    </aside>
  );
}
