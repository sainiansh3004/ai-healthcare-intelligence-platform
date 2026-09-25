"use client";

import React, { useState } from "react";
import { CLINICAL_POLICIES, RagPolicy } from "../data/mockData";
import { 
  Bot, Search, Sparkles, BookOpen, ShieldCheck, 
  ExternalLink, ChevronRight, CheckCircle2, AlertTriangle, 
  HelpCircle, ArrowRight, CornerDownLeft, FileText
} from "lucide-react";

export default function ClinicalRagTab() {
  const [activeQuery, setActiveQuery] = useState(
    "What are the mandatory conservative care requirements for CMS coverage of Lumbar Spine MRI?"
  );
  const [isSearching, setIsSearching] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<RagPolicy>(CLINICAL_POLICIES[0]);
  const [chatLog, setChatLog] = useState<{ query: string; answer: string; policy: RagPolicy }[]>([
    {
      query: "What are the mandatory conservative care requirements for CMS coverage of Lumbar Spine MRI?",
      answer: `According to CMS Local Coverage Determination (LCD L34211), diagnostic MRI of the Lumbar Spine (CPT 72148) is covered when:

1. Conservative Medical Management: The patient must have documented persistent lower back pain failing at least 6 weeks of active conservative therapy (structured physical therapy, prescribed NSAIDs, or chiropractic manipulation).
2. Red Flag Exemption: Conservative therapy requirement is waived immediately if progressive neurologic deficits, cauda equina syndrome, or suspected malignancy are documented.
3. Documentation Standard: The medical record must contain specific neurological examination details (motor strength, deep tendon reflexes, dermatomal sensation).`,
      policy: CLINICAL_POLICIES[0],
    }
  ]);

  const presetQueries = [
    {
      label: "Lumbar MRI Pre-Auth Criteria",
      query: "What are the conservative care requirements for Lumbar Spine MRI under CMS LCD L34211?",
      policyId: "POL-001"
    },
    {
      label: "Humira Biologic Step-Therapy",
      query: "What non-biologic DMARDs must fail before Humira (Adalimumab) is approved by BCBS?",
      policyId: "POL-002"
    },
    {
      label: "Cardiac Cath Medical Necessity",
      query: "What are the clinical indications for emergency vs elective cardiac catheterization?",
      policyId: "POL-003"
    },
  ];

  const handleRunQuery = (queryText: string, policyId?: string) => {
    setActiveQuery(queryText);
    setIsSearching(true);

    setTimeout(() => {
      let matchedPolicy = CLINICAL_POLICIES.find(p => p.id === policyId) || CLINICAL_POLICIES[0];

      let generatedAnswer = "";
      if (queryText.includes("Humira") || queryText.includes("DMARD") || policyId === "POL-002") {
        matchedPolicy = CLINICAL_POLICIES[1];
        generatedAnswer = `Per Blue Cross Blue Shield Clinical Policy 08.01.12 for Subcutaneous Biologics:

1. Mandatory Step-Therapy: Documentation of trial and failure, contraindication, or intolerance to at least one conventional non-biologic DMARD (e.g. Methotrexate >= 15mg/week, Sulfasalazine, or Leflunomide) for at least 3 months.
2. Safety Clearance: Verified negative baseline PPD or IGRA QuantiFERON test within 12 months.
3. Covered Indications: Plaque Psoriasis with >=10% body surface area involvement or severe Psoriatic/Rheumatoid Arthritis.`;
      } else if (queryText.includes("cardiac") || queryText.includes("Cath") || policyId === "POL-003") {
        matchedPolicy = CLINICAL_POLICIES[2];
        generatedAnswer = `Under Aetna Clinical Policy Bulletin 0229 for Coronary Intervention:

1. Urgent/Emergency Criteria: High-risk ACS, unstable angina with ischemic ECG changes, or troponin-I elevation qualify for immediate catheterization without prior-auth hold.
2. Elective/Stable Criteria: Requires documented positive functional non-invasive stress test showing >10% reversible myocardium ischemia.`;
      } else {
        matchedPolicy = CLINICAL_POLICIES[0];
        generatedAnswer = `Under CMS LCD L34211 for Lumbar Spine MRI:

1. 6-week conservative trial: Unresponsive to documented physical therapy and medical management.
2. Acute Red Flags: Progressive motor deficit or suspected cauda equina syndrome immediately qualifies for coverage.
3. Required Codes: ICD-10 M54.5, M54.16, M51.26.`;
      }

      setSelectedPolicy(matchedPolicy);
      setChatLog(prev => [
        { query: queryText, answer: generatedAnswer, policy: matchedPolicy },
        ...prev
      ]);
      setIsSearching(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Bot className="w-5 h-5 text-cyan-400" />
            Clinical Protocol RAG Assistant
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Grounded vector retrieval across 4,200+ CMS Local Coverage Determinations (LCD), NCD, and commercial payer bulletins
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Vector DB: pgvector Indexed (1,536-dim)
          </span>
        </div>
      </div>

      {/* Query Bar & Presets */}
      <div className="p-5 rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-lg space-y-4">
        
        <div className="relative flex items-center">
          <Sparkles className="w-5 h-5 text-cyan-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={activeQuery}
            onChange={(e) => setActiveQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleRunQuery(activeQuery);
            }}
            placeholder="Ask any clinical policy question (e.g. coverage criteria, contraindications, step therapy)..."
            className="w-full pl-12 pr-32 py-3.5 rounded-xl bg-slate-950 border border-slate-700/80 text-white text-sm focus:outline-none focus:border-cyan-500 shadow-inner"
          />
          <button
            onClick={() => handleRunQuery(activeQuery)}
            disabled={isSearching}
            className="absolute right-2 px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50"
          >
            {isSearching ? "Searching..." : "Query RAG"}
          </button>
        </div>

        {/* Preset Chips */}
        <div className="flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 font-medium shrink-0">Sample Inquiries:</span>
          {presetQueries.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleRunQuery(preset.query, preset.policyId)}
              className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 shrink-0 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>

      </div>

      {/* Main RAG Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Chat history / Grounded answers (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Grounded AI Response Stream
            </h3>
            <span className="text-[10px] text-slate-400 font-mono">Zero Hallucination Grounding</span>
          </div>

          <div className="space-y-4">
            {chatLog.map((entry, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-lg space-y-3"
              >
                {/* User Prompt */}
                <div className="flex items-start gap-3 text-xs">
                  <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-slate-300 font-bold shrink-0">
                    Q
                  </div>
                  <p className="font-semibold text-white pt-0.5">{entry.query}</p>
                </div>

                {/* AI Answer */}
                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-[11px] border-b border-slate-800 pb-2">
                    <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Clinical Policy Synthesizer
                    </span>
                    <span className="text-slate-400 font-mono">Source: {entry.policy.code}</span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {entry.answer}
                  </p>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Confidence: 99.1% · Payer: {entry.policy.payer}
                    </span>
                    <button
                      onClick={() => setSelectedPolicy(entry.policy)}
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      View Source Bulletin <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Right: Policy Document Explorer (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-lg space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider font-bold">
                Retrieved Policy Bulletin
              </span>
              <h4 className="text-sm font-bold text-white mt-0.5">{selectedPolicy.title}</h4>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
              {selectedPolicy.code}
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Issuing Organization</span>
              <p className="font-semibold text-slate-200 mt-0.5">{selectedPolicy.payer}</p>
              <p className="text-[10px] text-slate-400">Effective Date: {selectedPolicy.effectiveDate}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">Coverage Criteria Checklist</span>
              <ul className="space-y-1.5 text-slate-300">
                {selectedPolicy.criteria.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] text-emerald-400 uppercase font-bold block mb-1.5">
                Qualified Primary ICD-10 Codes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPolicy.icd10Covered.map((code) => (
                  <span
                    key={code}
                    className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 font-mono text-[11px]"
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-rose-300 space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-400 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Policy Exclusion / Contraindications
              </span>
              <ul className="space-y-1 text-[11px] list-disc pl-4 text-rose-200/90">
                {selectedPolicy.contraindications.map((contra, i) => (
                  <li key={i}>{contra}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 flex items-center justify-between">
            <span>Vector Match Similarity: 0.942</span>
            <span className="text-cyan-400">Validated 2026 CMS Update</span>
          </div>

        </div>

      </div>

    </div>
  );
}
