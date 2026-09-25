"use client";

import React, { useState } from "react";
import { SAMPLE_DOCUMENTS, DocumentSample } from "../data/mockData";
import { 
  FileText, Upload, Sparkles, CheckCircle2, AlertTriangle, 
  Download, ArrowRight, ShieldCheck, Cpu, RefreshCw, FileUp, 
  Stethoscope, Pill, Hash, ExternalLink
} from "lucide-react";

interface DocumentIntelligenceTabProps {
  onPushToClaim?: (doc: DocumentSample) => void;
}

export default function DocumentIntelligenceTab({ onPushToClaim }: DocumentIntelligenceTabProps) {
  const [selectedDoc, setSelectedDoc] = useState<DocumentSample>(SAMPLE_DOCUMENTS[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pushSuccess, setPushSuccess] = useState(false);

  const handleSelectDoc = (doc: DocumentSample) => {
    setIsProcessing(true);
    setSelectedDoc(doc);
    setTimeout(() => {
      setIsProcessing(false);
    }, 350);
  };

  const handleSimulateUpload = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
    }, 600);
  };

  const handlePush = () => {
    setPushSuccess(true);
    onPushToClaim?.(selectedDoc);
    setTimeout(() => setPushSuccess(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            Medical OCR & Clinical Entity Extraction
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Automated parsing of unstructured clinical notes, discharge summaries, and lab PDFs into structured FHIR resources
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulateUpload}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-xs font-bold text-white shadow-lg shadow-cyan-500/20 flex items-center gap-1.5 transition-all"
          >
            <FileUp className="w-3.5 h-3.5" />
            <span>Upload Document (PDF/TIFF)</span>
          </button>
        </div>
      </div>

      {/* Document Selection Strip */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {SAMPLE_DOCUMENTS.map((doc) => {
          const isSelected = selectedDoc.id === doc.id;
          return (
            <div
              key={doc.id}
              onClick={() => handleSelectDoc(doc)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                isSelected
                  ? "bg-cyan-950/30 border-cyan-500/50 shadow-lg shadow-cyan-500/10"
                  : "bg-[#0d1424]/80 border-slate-800/80 hover:border-slate-700"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                  doc.documentType === "Discharge Summary" 
                    ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20"
                    : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                }`}>
                  {doc.documentType}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{doc.fileSize}</span>
              </div>
              <h4 className="text-xs font-bold text-white truncate">{doc.title}</h4>
              <p className="text-[11px] text-slate-400 mt-1 truncate">{doc.facility}</p>
              
              <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                <span className="text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> OCR: {doc.ocrConfidence}%
                </span>
                <span className="text-slate-400">{doc.uploadedAt}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side-by-side Inspection Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left column: Raw OCR Document View (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-lg flex flex-col space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Raw Clinical Record</h3>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
              Confidence: {selectedDoc.ocrConfidence}%
            </span>
          </div>

          <div className="relative flex-1 bg-slate-950 p-4 rounded-xl border border-slate-800/80 font-mono text-xs text-slate-300 leading-relaxed overflow-y-auto max-h-[520px] whitespace-pre-wrap">
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center h-64 gap-3 text-cyan-400">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span className="text-xs font-sans">Running Tesseract + BioBERT NER Extraction...</span>
              </div>
            ) : (
              selectedDoc.rawText
            )}
          </div>

          <div className="text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5" /> HIPAA Safe-Harbor De-identified
            </span>
            <span className="font-mono">Encoding: UTF-8</span>
          </div>
        </div>

        {/* Right column: Extracted Entities (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#0d1424]/90 border border-slate-800/80 shadow-lg flex flex-col space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                Structured Clinical Entities (FHIR v4.0.1)
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePush}
                className="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/30 text-xs font-medium flex items-center gap-1 transition-colors"
              >
                {pushSuccess ? "✓ Pushed to Engine" : "Push to Claims Engine →"}
              </button>
            </div>
          </div>

          {/* Patient Card */}
          <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Extracted Patient</span>
              <p className="font-bold text-white text-sm mt-0.5">{selectedDoc.extractedEntities.patient.name}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">MRN Index</span>
              <p className="font-mono text-cyan-300 font-semibold">{selectedDoc.extractedEntities.patient.mrn}</p>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">DOB & Sex</span>
              <p className="text-slate-300">{selectedDoc.extractedEntities.patient.dob} ({selectedDoc.extractedEntities.patient.sex})</p>
            </div>
          </div>

          {/* Extracted Diagnoses ICD-10 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Stethoscope className="w-3.5 h-3.5 text-emerald-400" />
                Extracted ICD-10 Diagnoses ({selectedDoc.extractedEntities.diagnoses.length})
              </span>
              <span className="text-[10px] text-slate-400">Validated against WHO ICD-10-CM</span>
            </div>

            <div className="space-y-1.5">
              {selectedDoc.extractedEntities.diagnoses.map((diag) => (
                <div 
                  key={diag.code}
                  className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                      {diag.code}
                    </span>
                    <span className="font-medium text-white">{diag.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 hidden sm:inline">{diag.category}</span>
                    <span className="text-emerald-400 font-mono text-[11px] font-semibold">{diag.confidence}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Procedures CPT */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5 text-cyan-400" />
                CPT / HCPCS Procedure Codes ({selectedDoc.extractedEntities.procedures.length})
              </span>
              <span className="text-[10px] text-slate-400">Medicare RBRVS Fee Schedule</span>
            </div>

            <div className="space-y-1.5">
              {selectedDoc.extractedEntities.procedures.map((proc) => (
                <div 
                  key={proc.code}
                  className="p-2.5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded font-mono font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20">
                      {proc.code}
                    </span>
                    <span className="font-medium text-white">{proc.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400">{proc.units} Unit</span>
                    <span className="text-emerald-400 font-mono font-bold">${proc.allowable.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Extracted Medications */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Pill className="w-3.5 h-3.5 text-indigo-400" />
                Prescribed Medications (RxNorm Normalized)
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {selectedDoc.extractedEntities.medications.map((med, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700/80 text-xs text-white"
                >
                  <span className="font-semibold text-indigo-300">{med.name}</span>
                  <span className="text-slate-400 font-mono text-[11px]">{med.dosage} {med.frequency}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Clinical Flags */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Clinical Quality & Compliance Annotations
            </span>
            <ul className="space-y-1 text-xs text-slate-300">
              {selectedDoc.extractedEntities.clinicalFlags.map((flag, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span>{flag}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
}
