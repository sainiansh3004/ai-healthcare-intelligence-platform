"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Activity, Bell, Search, ChevronDown, ShieldCheck, 
  ExternalLink, Sparkles, Building, User, LogOut, Check,
  AlertTriangle, Clock, RefreshCw
} from "lucide-react";

interface NavbarProps {
  onOpenNewClaim?: () => void;
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
}

export default function Navbar({ onOpenNewClaim, searchQuery, onSearchChange }: NavbarProps) {
  const [selectedOrg, setSelectedOrg] = useState("Metropolis Memorial Health System");
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(3);

  const notifications = [
    {
      id: "n1",
      title: "Potential Upcoding Flagged",
      desc: "Claim CLM-2026-90216 flagged for audit (Dr. Gregory Vance)",
      time: "4m ago",
      type: "alert",
    },
    {
      id: "n2",
      title: "Batch OCR Extraction Complete",
      desc: "Inpatient discharge summary parsed with 99.2% confidence",
      time: "12m ago",
      type: "success",
    },
    {
      id: "n3",
      title: "CMS LCD Policy Bulletin Synced",
      desc: "Updated 2026 guidelines for MRI Lumbar Spine (L34211)",
      time: "1h ago",
      type: "info",
    }
  ];

  const clearNotifications = () => {
    setUnreadCount(0);
  };

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-[#090e1a]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between">
      
      {/* Left side: Org Switcher & Breadcrumbs */}
      <div className="flex items-center gap-4">
        
        {/* Mobile brand icon */}
        <Link href="/" className="flex md:hidden items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center">
            <Activity className="w-4 h-4 text-white" />
          </div>
        </Link>

        {/* Tenant Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800/90 border border-slate-700/60 text-xs font-medium text-slate-200 transition-colors"
          >
            <Building className="w-3.5 h-3.5 text-cyan-400" />
            <span className="max-w-[180px] sm:max-w-[260px] truncate">{selectedOrg}</span>
            <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] uppercase font-mono font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              Tier-1 Enterprise
            </span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {orgDropdownOpen && (
            <div className="absolute left-0 mt-2 w-72 bg-[#0d1424] border border-slate-800 rounded-xl shadow-2xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] uppercase font-semibold text-slate-400 border-b border-slate-800">
                Switch Organization Workspace
              </div>
              {[
                "Metropolis Memorial Health System",
                "Bayfront Ambulatory Health Network",
                "Apex Specialty Physicians Alliance"
              ].map((org) => (
                <button
                  key={org}
                  onClick={() => {
                    setSelectedOrg(org);
                    setOrgDropdownOpen(false);
                  }}
                  className="w-full px-3 py-2 text-left text-xs text-slate-200 hover:bg-cyan-500/10 hover:text-cyan-300 flex items-center justify-between"
                >
                  <span className="truncate">{org}</span>
                  {selectedOrg === org && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Live Gateway Telemetry */}
        <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>FastAPI Gateway: 18ms</span>
        </div>
      </div>

      {/* Right side: Global Search, Quick Action, Notifications, User */}
      <div className="flex items-center gap-3">
        
        {/* Quick Search */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search claims, codes, MRN... (⌘K)"
            value={searchQuery || ""}
            onChange={(e) => onSearchChange?.(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/60 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* New Claim Intake Button */}
        {onOpenNewClaim && (
          <button
            onClick={onOpenNewClaim}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>+ Ingest Claim</span>
          </button>
        )}

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-[10px] font-bold text-white flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-[#0d1424] border border-slate-800 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="p-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold text-white uppercase tracking-wider">Live System Alerts</span>
                {unreadCount > 0 && (
                  <button 
                    onClick={clearNotifications}
                    className="text-[11px] text-cyan-400 hover:underline"
                  >
                    Mark all read
                  </button>
                )}
              </div>
              <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-800/40 transition-colors space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white">{n.title}</span>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-2 bg-slate-950/60 border-t border-slate-800 text-center">
                <Link href="/" className="text-[11px] text-slate-400 hover:text-cyan-300 flex items-center justify-center gap-1">
                  View Public Portal <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-inner">
            SV
          </div>
          <div className="hidden xl:flex flex-col">
            <span className="text-xs font-bold text-white leading-tight">Dr. Sarah Vance</span>
            <span className="text-[10px] text-cyan-400 leading-tight">Chief Medical Auditor</span>
          </div>
        </div>

      </div>
    </header>
  );
}
