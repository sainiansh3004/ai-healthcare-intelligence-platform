import React from "react";
import Link from "next/link";
import { Activity, ShieldCheck, Lock, CheckCircle2, HeartHandshake, ExternalLink } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="border-t border-slate-800/80 bg-[#050811] text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                AegisHealth<span className="text-cyan-400">.ai</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Enterprise clinical intelligence engine powering autonomous claims adjudication, 
              medical document entity extraction, fraud prevention, and regulatory policy compliance.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/60 text-xs text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                HIPAA Safe Harbor
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/60 text-xs text-slate-300">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                SOC-2 Type II
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/60 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                HL7 / FHIR v4.0.1
              </span>
            </div>
          </div>

          {/* Column 1: Platform */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/dashboard" className="hover:text-cyan-400 transition-colors">Command Center</Link></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Claims Adjudication Engine</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Medical OCR Extraction</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Real-Time Fraud Sentinel</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Clinical Protocol RAG</a></li>
            </ul>
          </div>

          {/* Column 2: Governance & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Compliance & Security
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#security" className="hover:text-cyan-400 transition-colors">HIPAA Safe Harbor</a></li>
              <li><a href="#security" className="hover:text-cyan-400 transition-colors">BAA (Business Associate)</a></li>
              <li><a href="#security" className="hover:text-cyan-400 transition-colors">End-to-End Encryption</a></li>
              <li><a href="#security" className="hover:text-cyan-400 transition-colors">Role-Based Access Control</a></li>
              <li><a href="#security" className="hover:text-cyan-400 transition-colors">Tamper-Proof Audit Trail</a></li>
            </ul>
          </div>

          {/* Column 3: Developers */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">
              Developers & Integrations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="https://ai-healthcare-api.onrender.com/docs" target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-cyan-400 transition-colors">OpenAPI Docs <ExternalLink className="w-3 h-3" /></a></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Epic EHR Integration</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Cerner Millennium Connector</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">X12 837 / 835 EDI Pipelines</span></li>
              <li><span className="hover:text-cyan-400 transition-colors cursor-pointer">Webhooks & Event Streams</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-12 mt-12 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 AegisHealth AI, Inc. All rights reserved. Built for modern clinical operations.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Security Whitepaper</span>
            <span className="text-emerald-400 flex items-center gap-1">● System Status: Optimal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
