"use client";

import React, { useState } from "react";
import { ClaimRecord } from "../data/mockData";
import { X, Sparkles, PlusCircle, CheckCircle2, AlertCircle, FileCheck, Stethoscope } from "lucide-react";

interface NewClaimModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newClaim: ClaimRecord) => void;
}

export default function NewClaimModal({ isOpen, onClose, onSubmit }: NewClaimModalProps) {
  if (!isOpen) return null;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    patientName: "Sophia Martinez",
    patientDob: "1975-05-18",
    patientMrn: "MRN-" + Math.floor(10000 + Math.random() * 90000),
    providerName: "Dr. Jonathan Reyes, MD",
    providerNpi: "1982736451",
    facility: "Metropolis Ambulatory Care Center",
    serviceDate: new Date().toISOString().split("T")[0],
    diagnosisCode: "M54.5",
    diagnosisDesc: "Low back pain, non-radicular chronic",
    procedureCode: "72148",
    procedureDesc: "MRI Lumbar Spine without contrast",
    billedAmount: 1650,
  });

  const loadPreset = (presetType: "approved" | "fraud" | "preauth") => {
    if (presetType === "approved") {
      setFormData({
        patientName: "Sophia Martinez",
        patientDob: "1975-05-18",
        patientMrn: "MRN-" + Math.floor(10000 + Math.random() * 90000),
        providerName: "Dr. Jonathan Reyes, MD",
        providerNpi: "1982736451",
        facility: "Metropolis Ambulatory Care Center",
        serviceDate: new Date().toISOString().split("T")[0],
        diagnosisCode: "M54.5",
        diagnosisDesc: "Low back pain, non-radicular chronic",
        procedureCode: "72148",
        procedureDesc: "MRI Lumbar Spine without contrast",
        billedAmount: 1650,
      });
    } else if (presetType === "fraud") {
      setFormData({
        patientName: "Donald Becker",
        patientDob: "1960-03-22",
        patientMrn: "MRN-" + Math.floor(10000 + Math.random() * 90000),
        providerName: "Dr. Gregory Vance, DO",
        providerNpi: "1093847120",
        facility: "Apex Pain & Rehabilitation Clinic",
        serviceDate: new Date().toISOString().split("T")[0],
        diagnosisCode: "M79.7",
        diagnosisDesc: "Fibromyalgia and somatic pain syndrome",
        procedureCode: "99215",
        procedureDesc: "Office visit, high complexity (40+ mins)",
        billedAmount: 550,
      });
    } else {
      setFormData({
        patientName: "Rebecca Zimmerman",
        patientDob: "1990-09-12",
        patientMrn: "MRN-" + Math.floor(10000 + Math.random() * 90000),
        providerName: "Dr. Emily Tran, MD",
        providerNpi: "1482910395",
        facility: "University Dermatology Pavilion",
        serviceDate: new Date().toISOString().split("T")[0],
        diagnosisCode: "L40.0",
        diagnosisDesc: "Psoriasis vulgaris with extensive plaque",
        procedureCode: "J0135",
        procedureDesc: "Adalimumab (Humira) injection 20mg",
        billedAmount: 3450,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const isHighRisk = formData.procedureCode === "99215" && formData.providerNpi === "1093847120";
      const isPending = formData.procedureCode === "J0135";

      let status: ClaimRecord["status"] = "approved";
      let riskScore = 9;
      let riskLevel: ClaimRecord["riskLevel"] = "low";
      let approvedAmount = Math.round(formData.billedAmount * 0.72);
      let fraudAlerts: string[] = [];
      let note = "Auto-approved. Clinical necessity criteria satisfied with conservative care documentation.";
      let policyMatch = "CMS LCD Guidelines v2026.1";

      if (isHighRisk) {
        status = "flagged";
        riskScore = 82;
        riskLevel = "high";
        approvedAmount = 0;
        fraudAlerts = ["E&M Upcoding detected: outlier billing frequency against regional peer group"];
        note = "Flagged for audit. Billing velocity on CPT 99215 exceeds normal distribution.";
        policyMatch = "CMS Office Visit Coding Integrity Rule";
      } else if (isPending) {
        status = "pending";
        riskScore = 36;
        riskLevel = "medium";
        approvedAmount = Math.round(formData.billedAmount * 0.85);
        fraudAlerts = ["Awaiting prior authorization clearance token"];
        note = "Pending specialty clinical review. Step-therapy protocol requires verification.";
        policyMatch = "BCBS Biologics Coverage Policy";
      }

      const newClaim: ClaimRecord = {
        id: "CLM-" + Math.floor(90230 + Math.random() * 1000),
        claimNumber: "CLM-2026-" + Math.floor(90230 + Math.random() * 1000),
        patientName: formData.patientName,
        patientDob: formData.patientDob,
        patientMrn: formData.patientMrn,
        providerName: formData.providerName,
        providerNpi: formData.providerNpi,
        facility: formData.facility,
        serviceDate: formData.serviceDate,
        diagnosisCode: formData.diagnosisCode,
        diagnosisDesc: formData.diagnosisDesc,
        procedureCode: formData.procedureCode,
        procedureDesc: formData.procedureDesc,
        billedAmount: Number(formData.billedAmount),
        approvedAmount,
        status,
        riskScore,
        riskLevel,
        aiConfidence: isHighRisk ? 88.5 : 97.4,
        policyMatch,
        fraudAlerts,
        adjudicationNote: note,
      };

      setLoading(false);
      onSubmit(newClaim);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-[#0b1220] border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-800 bg-[#090e1a] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Ingest & Adjudicate New Claim</h3>
              <p className="text-xs text-slate-400">Submit electronic claim encounter for immediate AI scoring & policy check</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-slate-400 shrink-0 font-medium">Quick Presets:</span>
          <button
            type="button"
            onClick={() => loadPreset("approved")}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 transition-colors"
          >
            ✓ MRI Lumbar (Clean Approval)
          </button>
          <button
            type="button"
            onClick={() => loadPreset("fraud")}
            className="px-2.5 py-1 rounded bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 shrink-0 border border-rose-800/40 transition-colors"
          >
            ⚠ Upcoded E&M (Anomaly Flag)
          </button>
          <button
            type="button"
            onClick={() => loadPreset("preauth")}
            className="px-2.5 py-1 rounded bg-amber-950/40 hover:bg-amber-900/50 text-amber-300 shrink-0 border border-amber-800/40 transition-colors"
          >
            ⏳ Biologic (Prior-Auth Flow)
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Patient Full Name
              </label>
              <input
                type="text"
                required
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-white text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Patient MRN
              </label>
              <input
                type="text"
                required
                value={formData.patientMrn}
                onChange={(e) => setFormData({ ...formData, patientMrn: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-white text-sm font-mono focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Rendering Provider Name
              </label>
              <input
                type="text"
                required
                value={formData.providerName}
                onChange={(e) => setFormData({ ...formData, providerName: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-white text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
                Provider NPI (10-Digit)
              </label>
              <input
                type="text"
                required
                maxLength={10}
                value={formData.providerNpi}
                onChange={(e) => setFormData({ ...formData, providerNpi: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-white text-sm font-mono focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Facility / Place of Service
            </label>
            <input
              type="text"
              required
              value={formData.facility}
              onChange={(e) => setFormData({ ...formData, facility: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-white text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">
                Diagnosis Code (ICD-10)
              </label>
              <input
                type="text"
                required
                value={formData.diagnosisCode}
                onChange={(e) => setFormData({ ...formData, diagnosisCode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-white text-sm font-mono focus:border-emerald-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">{formData.diagnosisDesc}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
                Procedure Code (CPT/HCPCS)
              </label>
              <input
                type="text"
                required
                value={formData.procedureCode}
                onChange={(e) => setFormData({ ...formData, procedureCode: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-white text-sm font-mono focus:border-cyan-500 focus:outline-none"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">{formData.procedureDesc}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Submitted Billed Charge ($ USD)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-bold">$</span>
              <input
                type="number"
                required
                min={1}
                step="any"
                value={formData.billedAmount}
                onChange={(e) => setFormData({ ...formData, billedAmount: Number(e.target.value) })}
                className="w-full pl-8 pr-3.5 py-2.5 rounded-lg bg-slate-900/80 border border-slate-700/80 text-white text-sm font-semibold focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-medium text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-sm font-semibold text-white shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Running AI Adjudication...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-cyan-200" />
                  Run AI Adjudication Engine
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
