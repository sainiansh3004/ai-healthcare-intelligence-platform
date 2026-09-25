"use client";

import React, { useState } from "react";
import Link from "next/link";
import LandingNav from "./components/LandingNav";
import LandingFooter from "./components/LandingFooter";
import { 
  Activity, ShieldCheck, Sparkles, ChevronRight, CheckCircle2, 
  AlertTriangle, FileText, Cpu, ArrowUpRight, BarChart3, 
  Bot, Clock, DollarSign, Lock, Play, Zap, Check, 
  Users, Building, HelpCircle, ChevronDown, RefreshCw, FileUp
} from "lucide-react";

export default function Home() {
  const [billingCycle, setBillingCycle] = useState<"annual" | "monthly">("annual");
  const [claimsVolume, setClaimsVolume] = useState(15000);
  const [denialRate, setDenialRate] = useState(8.5);
  const [activeFeatureTab, setActiveFeatureTab] = useState<number>(0);
  
  // Interactive Sandbox state
  const [sandboxScenario, setSandboxScenario] = useState<"mri" | "cardiac" | "upcoding">("mri");
  const [sandboxLoading, setSandboxLoading] = useState(false);
  const [sandboxResult, setSandboxResult] = useState<any>({
    status: "approved",
    claimId: "CLM-SIM-8041",
    procedure: "CPT 72148 - MRI Lumbar Spine without contrast",
    diagnosis: "ICD-10 M54.5 - Chronic low back pain",
    riskScore: 9,
    confidence: 98.4,
    latency: "410ms",
    note: "Auto-approved. 6+ weeks of physical therapy verified in clinical attachment.",
    policy: "CMS LCD L34211: Lumbar Diagnostic Imaging",
  });

  const runSandboxTest = (scenario: "mri" | "cardiac" | "upcoding") => {
    setSandboxScenario(scenario);
    setSandboxLoading(true);

    setTimeout(() => {
      if (scenario === "mri") {
        setSandboxResult({
          status: "approved",
          claimId: "CLM-SIM-8041",
          procedure: "CPT 72148 - MRI Lumbar Spine without contrast",
          diagnosis: "ICD-10 M54.5 - Chronic low back pain",
          riskScore: 9,
          confidence: 98.4,
          latency: "410ms",
          note: "Auto-approved. 6+ weeks of physical therapy verified in clinical attachment.",
          policy: "CMS LCD L34211: Lumbar Diagnostic Imaging",
        });
      } else if (scenario === "cardiac") {
        setSandboxResult({
          status: "approved",
          claimId: "CLM-SIM-8042",
          procedure: "CPT 93458 - Left Heart Catheterization with Angiography",
          diagnosis: "ICD-10 I20.0 - Unstable angina pectoris",
          riskScore: 12,
          confidence: 96.8,
          latency: "520ms",
          note: "Urgent care exemption verified. Troponin elevation and ischemic ECG attached.",
          policy: "Aetna CPB 0229: Coronary Revascularization",
        });
      } else {
        setSandboxResult({
          status: "flagged",
          claimId: "CLM-SIM-8043",
          procedure: "CPT 99215 - Office Visit, Established, Level 5",
          diagnosis: "ICD-10 M79.7 - Fibromyalgia syndrome",
          riskScore: 78,
          confidence: 89.2,
          latency: "380ms",
          note: "Suspended for clinical audit. Level 5 billing frequency 6.8x above peer benchmark.",
          policy: "AMA E&M Documentation Guidelines 2024",
        });
      }
      setSandboxLoading(false);
    }, 450);
  };

  // ROI calculations
  const annualClaimCount = claimsVolume * 12;
  const currentLostDenials = (annualClaimCount * (denialRate / 100)) * 480; // avg $480 denial cost
  const projectedRecovered = Math.round(currentLostDenials * 0.42); // 42% recovery
  const projectedHoursSaved = Math.round((annualClaimCount * 0.22)); // 13 mins per claim automated

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      
      {/* Top SaaS Header */}
      <LandingNav />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        {/* Glow backdrop circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-600/15 to-emerald-500/10 blur-[130px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Live version pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-lg shadow-cyan-500/5 hover:border-cyan-500/40 transition-colors">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-200">
                AegisHealth 2.4 Now Live
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-cyan-400 font-medium">
                CMS 2026 LCD Protocols & pgvector Grounding →
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Autonomous Claims Intelligence &amp;{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400 bg-clip-text text-transparent">
                Clinical Fraud Sentinel
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
              Transform unstructured medical records into compliant claims in seconds. Automate 91%+ of adjudication decisions, detect billing fraud before payment, and ensure 100% policy compliance.
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-500 bg-size-200 hover:bg-right text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2.5"
              >
                <span>Launch Command Center</span>
                <ChevronRight className="w-5 h-5" />
              </Link>

              <a
                href="#interactive-demo"
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-base border border-slate-700/80 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
                <span>Test Live Sandbox</span>
              </a>
            </div>

            {/* Trust compliance strip */}
            <div className="pt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-medium">
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> HIPAA Safe Harbor
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Lock className="w-4 h-4 text-cyan-400" /> SOC-2 Type II Certified
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-indigo-400" /> HL7 / FHIR v4.0.1 Ready
              </span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Cpu className="w-4 h-4 text-emerald-400" /> Private VPC &amp; On-Premise
              </span>
            </div>

          </div>

          {/* Hero Interactive Visual Simulation Card */}
          <div className="mt-14 max-w-5xl mx-auto rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/80 p-2 sm:p-3 border border-slate-700/80 shadow-2xl shadow-cyan-950/40">
            <div className="rounded-xl bg-[#090f1d] border border-slate-800 overflow-hidden">
              
              {/* Window controls bar */}
              <div className="px-4 py-3 bg-[#060a14] border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 font-mono text-slate-400 text-[11px] hidden sm:inline">
                    aegis-engine://adjudication-pipeline/v2.4
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Model Pipeline Online (1.18s avg)</span>
                </div>
              </div>

              {/* Simulation Card Content */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Step 1: Intake & OCR */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono">Step 01 • Intake &amp; OCR</span>
                    <FileText className="w-4 h-4 text-cyan-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Discharge Summary Ingested</h4>
                  <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                    <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block">De-Identified Patient</span>
                      <span className="text-white font-semibold">Eleanor Vance (MRN-88219)</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block">Extracted Primary Diagnosis</span>
                      <span className="text-emerald-400 font-semibold">ICD-10 M54.5</span>
                    </div>
                  </div>
                </div>

                {/* Step 2: Policy Matching */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-indigo-400 font-mono">Step 02 • Policy RAG</span>
                    <Bot className="w-4 h-4 text-indigo-400" />
                  </div>
                  <h4 className="text-sm font-bold text-white">CMS Guideline Validation</h4>
                  <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                    <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block">Matched Bulletin</span>
                      <span className="text-cyan-300 font-semibold truncate block">LCD L34211: Lumbar MRI</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80">
                      <span className="text-[10px] text-slate-500 block">Conservative Care</span>
                      <span className="text-emerald-400 font-semibold">✓ 6+ Wks PT Verified</span>
                    </div>
                  </div>
                </div>

                {/* Step 3: Autonomous Adjudication */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono">Step 03 • Adjudication</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-white">Clean Auto-Approval</h4>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      480ms
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                    <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400">Risk Score</span>
                      <span className="text-emerald-400 font-bold">8 / 100 (Low)</span>
                    </div>
                    <div className="p-2 rounded bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
                      <span className="text-slate-400">Approved Fee</span>
                      <span className="text-white font-bold">$1,240.00 USD</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Key Metrics / KPI Ribbon */}
      <section className="py-14 border-y border-slate-800/80 bg-[#090d18]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-white font-mono">$1.4B+</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400">Processed Claims Value</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono">91.8%</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400">Clean Auto-Adjudication Rate</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-cyan-400 font-mono">4.8x</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400">Turnaround Acceleration</p>
            </div>

            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-indigo-400 font-mono">99.4%</p>
              <p className="text-xs sm:text-sm font-medium text-slate-400">Clinical Entity Extraction</p>
            </div>

          </div>
        </div>
      </section>

      {/* Core Platform Modules Feature Tabs */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Enterprise AI Capabilities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              An End-to-End Operating System for Healthcare Intelligence
            </h2>
            <p className="text-base text-slate-400">
              Purpose-built for payers, health systems, and third-party administrators seeking autonomous accuracy.
            </p>
          </div>

          {/* Module Tab Selector */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {[
              { label: "1. Medical OCR & Intake", icon: <FileText className="w-4 h-4" /> },
              { label: "2. Real-Time Fraud Sentinel", icon: <ShieldCheck className="w-4 h-4" /> },
              { label: "3. Clinical Protocol RAG", icon: <Bot className="w-4 h-4" /> },
              { label: "4. Revenue Cycle Observability", icon: <BarChart3 className="w-4 h-4" /> },
            ].map((tab, idx) => (
              <button
                key={idx}
                onClick={() => setActiveFeatureTab(idx)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  activeFeatureTab === idx
                    ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                    : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Showcase Card */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#0d1424]/90 border border-slate-800 shadow-2xl">
            {activeFeatureTab === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    Medical OCR &amp; Entity Extraction
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Parse 100+ Page Medical Charts into Clean FHIR Resources in Seconds
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Our vision-language models digest handwriting, discharge summaries, operative reports, and radiology PDFs. Automatically extracts ICD-10 diagnosis codes, CPT procedure codes, and medications with verifiable confidence scores.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Standardizes directly into HL7 FHIR v4.0.1 resources</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>On-premises HIPAA de-identification strips 18 direct identifiers</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Cross-references Medicare RBRVS fee schedules automatically</span>
                    </li>
                  </ul>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-cyan-400 font-semibold text-xs hover:underline"
                  >
                    Open Document Intelligence Studio →
                  </Link>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 font-mono text-xs">
                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2">
                    <span>FHIR-Resource::Condition</span>
                    <span className="text-emerald-400">99.4% Match</span>
                  </div>
                  <pre className="text-slate-300 text-[11px] overflow-x-auto leading-relaxed">
{`{
  "resourceType": "Claim",
  "patient": { "reference": "Patient/MRN-88219" },
  "diagnosis": [
    { "code": "M54.5", "display": "Low back pain" },
    { "code": "M54.16", "display": "Lumbar Radiculopathy" }
  ],
  "procedure": [
    { "code": "72148", "fee": 1240.00, "status": "approved" }
  ]
}`}
                  </pre>
                </div>
              </div>
            )}

            {activeFeatureTab === 1 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    Fraud, Waste &amp; Abuse (FWA) Sentinel
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Detect Upcoding, Unbundling &amp; Phantom Billing Pre-Payment
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Stop fraudulent payouts before checks are cut. Our engine analyzes provider billing velocities, unbundled CPT modifiers, and duplicate submissions against regional peer distributions.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>SHAP explainable score breakdowns for medical directors</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Real-time cross-encounter duplicate token scanning</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>NCCI mutually exclusive surgical code edit enforcement</span>
                    </li>
                  </ul>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-rose-400 font-semibold text-xs hover:underline"
                  >
                    View Fraud Detection Module →
                  </Link>
                </div>

                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-rose-400 uppercase tracking-wider">High Risk Anomaly Flagged</span>
                    <span className="px-2 py-0.5 rounded font-mono font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Score: 78/100
                    </span>
                  </div>
                  <p className="text-xs text-rose-200">
                    Provider bills Level 5 E&amp;M (CPT 99215) on 92% of encounters vs peer average of 14%. Clinical note documentation lacks medical decision-making complexity.
                  </p>
                  <div className="pt-2 border-t border-rose-900/40 text-[11px] text-rose-300/80 font-mono">
                    Action: Suspended for Clinical Auditor Review
                  </div>
                </div>
              </div>
            )}

            {activeFeatureTab === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Clinical Protocol RAG Assistant
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Grounded Medical Policy Search with Zero Hallucinations
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Auditors and clinicians can instantly search complex coverage rules across CMS National &amp; Local Coverage Determinations (NCD/LCD), Blue Cross, Aetna, and UnitedHealthcare bulletins.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Instant citation to exact paragraph and policy effective dates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Step-therapy validation for biologics and specialty drugs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Automated denial appeal letter generation with medical citations</span>
                    </li>
                  </ul>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-indigo-400 font-semibold text-xs hover:underline"
                  >
                    Query Clinical Policy Database →
                  </Link>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <Bot className="w-4 h-4" />
                    <span>Query: Humira step-therapy criteria</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    Requires documented trial &amp; failure of non-biologic DMARD (Methotrexate &gt;=15mg/wk) for 3+ months, plus verified negative TB test within 12 months.
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    Source: BCBS Medical Policy 08.01.12
                  </span>
                </div>
              </div>
            )}

            {activeFeatureTab === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Revenue Cycle Observability
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">
                    Accelerate Cash Flow &amp; Slash Days in A/R by Over 50%
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Gain multi-facility oversight into denial root-causes, payer friction rates, and clean claim yields. Turn revenue cycle bottlenecks into automated recovery pipelines.
                  </p>
                  <ul className="space-y-2.5 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Real-time payer scorecard tracking reimbursement velocity</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Automated EDI 835 / 837 transaction integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Executive denial heatmaps by clinical specialty &amp; doctor</span>
                    </li>
                  </ul>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-emerald-400 font-semibold text-xs hover:underline"
                  >
                    View Revenue Telemetry →
                  </Link>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>Clean Claim First-Pass Acceptance</span>
                    <span className="text-emerald-400 font-bold font-mono">92.6%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-400 w-[92.6%]" />
                  </div>
                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Days in A/R: 16.4 Days</span>
                    <span className="text-emerald-400">-$482,400 Lost Denials Recovered</span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </section>

      {/* Interactive Live Adjudication Sandbox */}
      <section id="interactive-demo" className="py-20 bg-[#090e1c]/80 border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Live Interactive Sandbox
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Test Real-Time AI Claims Adjudication
            </h2>
            <p className="text-sm text-slate-400">
              Select a clinical encounter scenario below to watch the autonomous rule engine and fraud sentinel evaluate in real-time.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0b1222] border border-slate-800 shadow-2xl space-y-6">
            
            {/* Scenario buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => runSandboxTest("mri")}
                className={`p-4 rounded-xl text-left border transition-all ${
                  sandboxScenario === "mri"
                    ? "bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">Scenario A • Radiology</span>
                <p className="text-xs font-bold text-white">Lumbar MRI Pre-Auth</p>
                <p className="text-[11px] text-slate-400 mt-1">Evaluates conservative therapy criteria under CMS LCD</p>
              </button>

              <button
                onClick={() => runSandboxTest("cardiac")}
                className={`p-4 rounded-xl text-left border transition-all ${
                  sandboxScenario === "cardiac"
                    ? "bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <span className="text-[10px] font-mono text-cyan-400 font-bold block mb-1">Scenario B • Cardiology</span>
                <p className="text-xs font-bold text-white">Emergency Cardiac Cath</p>
                <p className="text-[11px] text-slate-400 mt-1">Evaluates urgent exemption and inpatient criteria</p>
              </button>

              <button
                onClick={() => runSandboxTest("upcoding")}
                className={`p-4 rounded-xl text-left border transition-all ${
                  sandboxScenario === "upcoding"
                    ? "bg-rose-950/40 border-rose-500/60 shadow-lg shadow-rose-500/10"
                    : "bg-slate-900/60 border-slate-800 hover:border-slate-700"
                }`}
              >
                <span className="text-[10px] font-mono text-rose-400 font-bold block mb-1">Scenario C • Fraud Audit</span>
                <p className="text-xs font-bold text-white">Level 5 E&amp;M Upcoding</p>
                <p className="text-[11px] text-slate-400 mt-1">Detects abnormal billing frequency against peer average</p>
              </button>
            </div>

            {/* Sandbox Output Console */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white font-mono">Autonomous Execution Engine</span>
                </div>
                {sandboxLoading ? (
                  <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Evaluating Rules...
                  </span>
                ) : (
                  <span className="text-xs font-mono text-slate-400">
                    Execution Latency: <strong className="text-emerald-400">{sandboxResult.latency}</strong>
                  </span>
                )}
              </div>

              {/* Result Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Decision</span>
                  <p className={`text-base font-bold capitalize mt-0.5 ${
                    sandboxResult.status === "approved" ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {sandboxResult.status === "approved" ? "✓ Auto-Approved" : "⚠ Flagged for Audit"}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Fraud Risk Index</span>
                  <p className={`text-base font-mono font-bold mt-0.5 ${
                    sandboxResult.riskScore < 25 ? "text-emerald-400" : "text-rose-400"
                  }`}>
                    {sandboxResult.riskScore} / 100
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Model Confidence</span>
                  <p className="text-base font-mono font-bold text-white mt-0.5">
                    {sandboxResult.confidence}%
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] text-slate-500 uppercase font-bold">Policy Grounding</span>
                  <p className="text-xs font-mono text-cyan-300 font-semibold mt-1 truncate">
                    {sandboxResult.policy}
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs space-y-1">
                <span className="text-[10px] text-slate-500 uppercase font-bold">AI Adjudication Rationale Note:</span>
                <p className="text-slate-200 font-medium leading-relaxed">
                  {sandboxResult.note}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-slate-500">
                  Encounter: {sandboxResult.claimId} • {sandboxResult.procedure}
                </span>
                <Link
                  href="/dashboard"
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                >
                  Inspect in Command Center →
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ROI & Cost Recovery Calculator */}
      <section id="roi-calculator" className="py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Enterprise Value Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Calculate Your Organization&apos;s Yield
            </h2>
            <p className="text-sm text-slate-400">
              Estimate annual lost revenue recovery and manual clinical review hours saved with AegisHealth.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-[#0d1424]/90 border border-slate-800 shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Sliders */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-300">Monthly Claims Volume</span>
                  <span className="font-mono text-cyan-400 text-sm">{claimsVolume.toLocaleString()} claims/mo</span>
                </div>
                <input
                  type="range"
                  min={2000}
                  max={50000}
                  step={1000}
                  value={claimsVolume}
                  onChange={(e) => setClaimsVolume(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>2,000 / mo</span>
                  <span>50,000 / mo</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-semibold mb-2">
                  <span className="text-slate-300">Current Denial / Friction Rate</span>
                  <span className="font-mono text-cyan-400 text-sm">{denialRate}%</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={25}
                  step={0.5}
                  value={denialRate}
                  onChange={(e) => setDenialRate(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>3% (Low)</span>
                  <span>25% (High friction)</span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
                <span className="font-semibold text-slate-300 block mb-1">Calculation Methodology:</span>
                Based on peer-reviewed HFMA benchmarks: $480 average administrative and clinical cost per denial, 42% autonomous appeal recovery yield, and 13.2 minutes saved per adjudicated encounter.
              </div>
            </div>

            {/* Results Callout */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-indigo-950/40 border border-cyan-500/30 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase font-bold text-cyan-400 font-mono tracking-wider">
                  Projected Net Annual Return
                </span>
                <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono mt-1">
                  +${projectedRecovered.toLocaleString("en-US")}
                </h3>
                <p className="text-xs text-slate-300 mt-1">Annual denial loss recovered via AI appeal pipeline</p>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Labor Hours Saved</span>
                  <p className="text-xl font-bold text-white font-mono mt-0.5">
                    {projectedHoursSaved.toLocaleString()} hrs/yr
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Est. Payback Period</span>
                  <p className="text-xl font-bold text-cyan-400 font-mono mt-0.5">
                    &lt; 42 Days
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs text-center shadow-lg shadow-cyan-500/20 transition-all"
              >
                Deploy ROI Model in Command Center →
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* Security & HIPAA Compliance */}
      <section id="security" className="py-20 bg-[#090d18] border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 font-mono">
              Zero-Trust Architecture
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Enterprise Grade Healthcare Security &amp; Compliance
            </h2>
            <p className="text-sm text-slate-400">
              Designed from the ground up for strict HIPAA Safe Harbor de-identification, SOC-2 Type II auditability, and zero customer data retention for model fine-tuning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">HIPAA Safe Harbor De-identification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                All 18 HIPAA identifiers are automatically redacted on-premises prior to vector embedding. PHI never leaves your secure VPC perimeter unencrypted.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">SOC-2 Type II Certified</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Independent AICPA audit verifies continuous compliance across security, availability, and confidentiality trust principles. AES-256 encryption at rest.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white">Private VPC &amp; On-Premises</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Deploy inside your AWS GovCloud, Azure Health Data Services, or self-hosted Kubernetes cluster. Full air-gapped models available for high-security tenants.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* SaaS Pricing Matrix */}
      <section id="pricing" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Transparent SaaS Pricing
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Predictable Plans for Modern Health Systems
            </h2>
            <p className="text-sm text-slate-400">
              No hidden fees. Scale from independent clinical practices to nationwide commercial health plans.
            </p>

            {/* Monthly / Annual toggle */}
            <div className="pt-4 flex items-center justify-center gap-3 text-xs">
              <span className={billingCycle === "monthly" ? "text-white font-bold" : "text-slate-400"}>
                Monthly Billing
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "annual" ? "monthly" : "annual")}
                className="w-12 h-6 rounded-full bg-slate-800 p-1 flex items-center transition-colors border border-slate-700"
              >
                <div className={`w-4 h-4 rounded-full bg-cyan-400 transition-transform ${
                  billingCycle === "annual" ? "translate-x-6" : "translate-x-0"
                }`} />
              </button>
              <span className={billingCycle === "annual" ? "text-white font-bold" : "text-slate-400"}>
                Annual Billing
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Save 20%
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            
            {/* Tier 1: Practice */}
            <div className="p-8 rounded-3xl bg-[#0d1424]/80 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">Ambulatory Clinic</span>
                <h3 className="text-xl font-bold text-white">Starter Practice</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    ${billingCycle === "annual" ? "1,599" : "1,999"}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400">Ideal for outpatient specialty practices and surgical centers.</p>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 2,500 claims / month</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Medical OCR Document Ingestion</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Standard CMS LCD Rule Checks</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Email &amp; Web Support (4h SLA)</li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs text-center transition-colors block"
              >
                Start Practice Trial
              </Link>
            </div>

            {/* Tier 2: Health System (Popular) */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-[#111c34] to-[#0a1222] border-2 border-cyan-500/50 shadow-2xl shadow-cyan-500/10 flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider">
                Most Popular for Hospitals
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">Hospital Network</span>
                <h3 className="text-xl font-bold text-white">Health System Pro</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">
                    ${billingCycle === "annual" ? "4,799" : "5,999"}
                  </span>
                  <span className="text-xs text-slate-400">/ month</span>
                </div>
                <p className="text-xs text-slate-400">For multi-facility regional hospital systems and accountable care orgs.</p>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Up to 25,000 claims / month</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Real-Time Fraud &amp; Upcoding Sentinel</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Clinical Protocol RAG (CMS + Commercial)</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Epic &amp; Cerner EHR Connectors</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Priority 24/7 Dedicated Clinical Support</li>
                </ul>
              </div>

              <Link
                href="/dashboard"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs text-center shadow-lg shadow-cyan-500/25 transition-all block"
              >
                Launch Health System Pro
              </Link>
            </div>

            {/* Tier 3: Enterprise / Payer */}
            <div className="p-8 rounded-3xl bg-[#0d1424]/80 border border-slate-800 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 font-mono">Commercial Payer &amp; TPA</span>
                <h3 className="text-xl font-bold text-white">Autonomous Payer</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white font-mono">Custom</span>
                </div>
                <p className="text-xs text-slate-400">Tailored for national health plans and high-volume TPAs.</p>

                <ul className="space-y-2.5 text-xs text-slate-300 pt-4 border-t border-slate-800">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Unlimited Claims Throughput</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Private VPC &amp; Air-Gapped Deployment</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Custom LLM Clinical Policy Training</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Dedicated Technical Account Team &amp; BAA</li>
                </ul>
              </div>

              <a
                href="mailto:enterprise@aegishealth.ai"
                className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs text-center transition-colors block"
              >
                Contact Enterprise Sales
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-[#090d18] border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono">
              Clinical Endorsements
            </span>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Trusted by Leading Healthcare Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-4">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                &ldquo;AegisHealth accelerated our prior-authorization turnaround from 5 days down to under 2 hours. Our clean claim rate jumped from 79% to 94.2% in our very first quarter.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center font-bold text-white text-xs">
                  MC
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dr. Marcus Chen, MD</h4>
                  <p className="text-[11px] text-slate-400">Chief Medical Officer, Metropolis Orthopedic Alliance</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#0d1424] border border-slate-800 space-y-4">
              <p className="text-sm text-slate-300 italic leading-relaxed">
                &ldquo;The real-time fraud sentinel paid for the entire platform in our first month alone. Detecting unbundled surgical codes before claim transmission eliminated over $640K in compliance penalties.&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-slate-800/80">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-white text-xs">
                  LR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Laura Ross, CPA</h4>
                  <p className="text-[11px] text-slate-400">VP of Revenue Cycle Management, Bayfront Health Network</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Enterprise CTA Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Automate Your Healthcare Operations?
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Experience the next generation of autonomous claims adjudication, fraud prevention, and clinical RAG.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              href="/dashboard"
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-cyan-500 bg-size-200 hover:bg-right text-white font-bold text-base shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2"
            >
              <span>Enter Command Center</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
            <a
              href="https://ai-healthcare-api.onrender.com/docs"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-semibold text-base hover:bg-slate-800 transition-colors"
            >
              Explore OpenAPI Swagger Docs
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <LandingFooter />

    </div>
  );
}
