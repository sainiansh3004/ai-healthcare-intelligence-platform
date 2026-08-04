'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  ShieldAlert,
  FileText,
  Brain,
  CheckCircle2,
  AlertTriangle,
  Server,
  Zap,
  TrendingUp,
  RefreshCw,
  Plus,
  ChevronRight,
  Sparkles,
  FileCheck
} from 'lucide-react';

interface Claim {
  id: string;
  patientId: string;
  patientName: string;
  procedureCode: string;
  procedureName: string;
  billedAmount: number;
  status: 'Approved' | 'Flagged' | 'Pending';
  fraudScore: number;
  aiConfidence: number;
  decisionReason: string;
  timestamp: string;
}

interface DocumentItem {
  id: string;
  title: string;
  type: string;
  patientName: string;
  extractedEntities: {
    icd10: string[];
    cpt: string[];
    medications: string[];
  };
  status: 'Processed' | 'Indexing' | 'Parsed';
  timestamp: string;
}

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'claims' | 'ocr' | 'rag' | 'system'>('dashboard');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Claims state
  const [claims, setClaims] = useState<Claim[]>([
    {
      id: 'CLM-9821',
      patientId: 'PT-4029',
      patientName: 'Sarah Jenkins',
      procedureCode: 'CPT-99214',
      procedureName: 'Office Outpatient Visit (30 mins)',
      billedAmount: 245.00,
      status: 'Approved',
      fraudScore: 0.04,
      aiConfidence: 0.98,
      decisionReason: 'Auto-validated against Blue Cross PPO Clinical Guideline #402',
      timestamp: '2 mins ago'
    },
    {
      id: 'CLM-9822',
      patientId: 'PT-8812',
      patientName: 'Marcus Vance',
      procedureCode: 'CPT-72148',
      procedureName: 'MRI Lumbar Spine W/O Contrast',
      billedAmount: 1850.00,
      status: 'Flagged',
      fraudScore: 0.78,
      aiConfidence: 0.92,
      decisionReason: 'Duplicate billing anomaly detected across 2 providers within 48h',
      timestamp: '14 mins ago'
    },
    {
      id: 'CLM-9823',
      patientId: 'PT-1092',
      patientName: 'Elena Rostova',
      procedureCode: 'CPT-80053',
      procedureName: 'Comprehensive Metabolic Panel',
      billedAmount: 120.00,
      status: 'Approved',
      fraudScore: 0.02,
      aiConfidence: 0.99,
      decisionReason: 'Routine diagnostic panel matched with ICD-10 E11.9 (Type 2 Diabetes)',
      timestamp: '28 mins ago'
    }
  ]);

  // Form state for creating claim
  const [newPatientName, setNewPatientName] = useState('');
  const [newProcedure, setNewProcedure] = useState('CPT-99214');
  const [newAmount, setNewAmount] = useState('350');
  const [newIcdCode, setNewIcdCode] = useState('E11.9');
  const [isSubmittingClaim, setIsSubmittingClaim] = useState(false);

  // RAG Chat state
  const [query, setQuery] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: 'user' | 'assistant'; text: string; citations?: string[] }[]>([
    {
      role: 'assistant',
      text: 'Hello! I am your AI Healthcare Clinical Protocol Assistant. Ask me anything about payer policy guidelines, ICD-10/CPT crosswalks, or prior authorization criteria.',
      citations: ['Aetna Clinical Policy Bulletin #0231', 'CMS National Coverage Determination 210.3']
    }
  ]);
  const [isAsking, setIsAsking] = useState(false);

  // Document state
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: 'DOC-104',
      title: 'Discharge_Summary_Jenkins.pdf',
      type: 'Hospital Discharge',
      patientName: 'Sarah Jenkins',
      extractedEntities: {
        icd10: ['E11.9 (Type 2 Diabetes)', 'I10 (Essential Hypertension)'],
        cpt: ['CPT-99214', 'CPT-93000 (ECG Tracing)'],
        medications: ['Metformin 500mg BID', 'Lisinopril 10mg QD']
      },
      status: 'Processed',
      timestamp: 'Today 10:15 AM'
    },
    {
      id: 'DOC-105',
      title: 'Lumbar_Spine_MRI_Radiology.pdf',
      type: 'Radiology Report',
      patientName: 'Marcus Vance',
      extractedEntities: {
        icd10: ['M54.5 (Low Back Pain)', 'M51.26 (Intervertebral Disc Displacement)'],
        cpt: ['CPT-72148 (MRI Lumbar)'],
        medications: ['Gabapentin 300mg TID', 'Naproxen 500mg PRN']
      },
      status: 'Processed',
      timestamp: 'Today 09:30 AM'
    }
  ]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(documents[0]);

  // Fetch backend analytics if running
  const [apiData, setApiData] = useState<any>(null);
  const [backendStatus, setBackendStatus] = useState<'connected' | 'simulated'>('connected');

  const fetchDashboard = () => {
    setIsRefreshing(true);
    fetch('http://localhost:8000/api/v1/analytics/dashboard')
      .then((res) => {
        if (!res.ok) throw new Error('API down');
        return res.json();
      })
      .then((data) => {
        setApiData(data);
        setBackendStatus('connected');
        setIsRefreshing(false);
      })
      .catch(() => {
        setBackendStatus('simulated');
        setIsRefreshing(false);
      });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleCreateClaim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPatientName) return;

    setIsSubmittingClaim(true);
    setTimeout(() => {
      const amount = parseFloat(newAmount) || 250;
      const isHighRisk = amount > 1500;
      const createdClaim: Claim = {
        id: `CLM-${Math.floor(1000 + Math.random() * 9000)}`,
        patientId: `PT-${Math.floor(1000 + Math.random() * 9000)}`,
        patientName: newPatientName,
        procedureCode: newProcedure,
        procedureName: newProcedure === 'CPT-99214' ? 'Outpatient Evaluation' : newProcedure === 'CPT-72148' ? 'MRI Lumbar Spine' : 'Specialist Consultation',
        billedAmount: amount,
        status: isHighRisk ? 'Flagged' : 'Approved',
        fraudScore: isHighRisk ? 0.74 : 0.05,
        aiConfidence: 0.96,
        decisionReason: isHighRisk
          ? 'High billed amount flagged for manual medical necessity review'
          : `Auto-validated with ICD-10 code ${newIcdCode} against standard coverage policy`,
        timestamp: 'Just now'
      };

      setClaims([createdClaim, ...claims]);
      setNewPatientName('');
      setIsSubmittingClaim(false);
    }, 600);
  };

  const handleSendQuery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const userText = query;
    setQuery('');
    setChatHistory((prev) => [...prev, { role: 'user', text: userText }]);
    setIsAsking(true);

    setTimeout(() => {
      let aiResponse = 'Based on current clinical guidelines and payer policies, this procedure is covered when accompanied by documented failed conservative therapy for >6 weeks and prior authorization confirmation.';
      let citations = ['Clinical Policy Bulletin #0891', 'AMA CPT Coding Guidelines 2026'];

      if (userText.toLowerCase().includes('mri') || userText.toLowerCase().includes('72148')) {
        aiResponse = 'Lumbar Spine MRI (CPT 72148) requires Prior Authorization under standard Commercial & Medicare Advantage plans. Clinical documentation must confirm: 1) Low back pain lasting >6 weeks, 2) Failure of physical therapy or NSAIDs, 3) Red flag symptoms (e.g. progressive neurological deficit).';
        citations = ['Aetna CPB 0236: MRI Lumbar Spine', 'CMS LCD L34210'];
      } else if (userText.toLowerCase().includes('diabetes') || userText.toLowerCase().includes('glucose')) {
        aiResponse = 'Continuous Glucose Monitoring (CGM) is approved for patients diagnosed with Type 1 or Type 2 Diabetes (ICD-10 E11.9/E10.9) requiring multiple daily insulin injections or with documented recurrent hypoglycemia.';
        citations = ['ADA Standards of Care 2026', 'BlueCross Medical Policy MED.00092'];
      }

      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', text: aiResponse, citations }
      ]);
      setIsAsking(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-sky-500 selection:text-white">
      {/* Background Glow Overlay */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(14,165,233,0.15),rgba(255,255,255,0))]" />

      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#030712]/80 backdrop-blur-xl px-6 py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-600 to-indigo-600 shadow-lg shadow-sky-500/20">
              <Activity className="h-6 w-6 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Enterprise AI</span>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> LIVE
                </span>
              </div>
              <h1 className="text-xl font-bold tracking-tight text-white">Healthcare Intelligence Platform</h1>
            </div>
          </div>

          {/* Header Action / Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-300">
              <ShieldAlert className="h-4 w-4 text-emerald-400" />
              <span>HIPAA Compliant</span>
            </div>
            <button
              onClick={fetchDashboard}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-slate-700 hover:text-white"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>Sync</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Sub-Header */}
      <div className="border-b border-slate-800 bg-slate-950/60 backdrop-blur-md px-6">
        <div className="mx-auto flex max-w-7xl overflow-x-auto">
          {[
            { id: 'dashboard', label: 'Command Center', icon: Activity },
            { id: 'claims', label: 'Claims & Fraud Engine', icon: ShieldAlert },
            { id: 'ocr', label: 'Medical OCR & Extraction', icon: FileText },
            { id: 'rag', label: 'Clinical Protocol RAG', icon: Brain },
            { id: 'system', label: 'System Telemetry', icon: Server },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 border-b-2 px-5 py-3.5 text-sm font-medium transition whitespace-nowrap ${
                  active
                    ? 'border-sky-500 text-sky-400 bg-sky-500/5'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? 'text-sky-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Container */}
      <main className="relative mx-auto max-w-7xl px-6 py-8">

        {/* TAB 1: EXECUTIVE COMMAND CENTER */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Top Stat Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: 'Claims Processed', value: apiData?.claims_processed ? apiData.claims_processed.toLocaleString() : '1,842', change: '+12.4% vs last week', icon: FileCheck, color: 'text-sky-400', bg: 'from-sky-500/10 to-sky-500/5' },
                { label: 'Auto-Approval Rate', value: apiData?.approval_rate ? `${(apiData.approval_rate * 100).toFixed(1)}%` : '91.4%', change: '+3.2% efficiency', icon: CheckCircle2, color: 'text-emerald-400', bg: 'from-emerald-500/10 to-emerald-500/5' },
                { label: 'Fraud Anomaly Rate', value: apiData?.fraud_rate ? `${(apiData.fraud_rate * 100).toFixed(1)}%` : '3.5%', change: '-0.8% reduction', icon: AlertTriangle, color: 'text-amber-400', bg: 'from-amber-500/10 to-amber-500/5' },
                { label: 'AI Model Confidence', value: apiData?.ai_confidence ? `${(apiData.ai_confidence * 100).toFixed(1)}%` : '94.8%', change: '+1.1% accuracy', icon: Brain, color: 'text-indigo-400', bg: 'from-indigo-500/10 to-indigo-500/5' },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-gradient-to-b ${stat.bg} p-6 shadow-xl`}>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">{stat.label}</span>
                      <Icon className={`h-5 w-5 ${stat.color}`} />
                    </div>
                    <div className="mt-4 text-3xl font-extrabold tracking-tight text-white">{stat.value}</div>
                    <div className="mt-2 text-xs font-medium text-emerald-400 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" /> {stat.change}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Core Feature Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Left Column - Live Adjudication Telemetry */}
              <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur-md">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white flex items-center gap-2">
                      <Zap className="h-5 w-5 text-sky-400" />
                      Real-Time AI Claims Stream
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">Live adjudication feed processed by LLM Policy Evaluator</p>
                  </div>
                  <button onClick={() => setActiveTab('claims')} className="text-xs font-semibold text-sky-400 hover:text-sky-300 flex items-center gap-1">
                    Open Claims Engine <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="mt-5 space-y-3">
                  {claims.slice(0, 4).map((claim) => (
                    <div key={claim.id} className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-800/80 bg-slate-950/60 p-4 gap-3 transition hover:border-slate-700">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-sky-400">{claim.id}</span>
                          <span className="text-xs font-medium text-slate-300">• {claim.patientName}</span>
                          <span className="text-[10px] text-slate-500 font-mono">({claim.patientId})</span>
                        </div>
                        <p className="text-xs text-slate-400">{claim.procedureName} (<span className="font-mono text-slate-300">{claim.procedureCode}</span>)</p>
                      </div>
                      <div className="flex items-center justify-between sm:justify-end gap-4">
                        <div className="text-right">
                          <div className="text-sm font-bold text-white">${claim.billedAmount.toFixed(2)}</div>
                          <div className="text-[10px] text-slate-400">Score: {(claim.fraudScore * 100).toFixed(0)}%</div>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold border ${
                            claim.status === 'Approved'
                              ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                          }`}
                        >
                          {claim.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - System Capabilities */}
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-xl backdrop-blur-md">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Brain className="h-5 w-5 text-indigo-400" />
                  AI Model Telemetry
                </h2>
                <p className="text-xs text-slate-400 mt-1">Multi-modal clinical NLP & vector store status</p>

                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Payer Policy Vector Store</span>
                      <span className="font-mono text-sky-400 font-semibold">456,000 Embeddings</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-sky-500 to-indigo-500" style={{ width: '85%' }} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">P99 Model Inference Latency</span>
                      <span className="font-mono text-emerald-400 font-semibold">231.4 ms</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400" style={{ width: '92%' }} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950/70 p-4">
                    <div className="text-xs text-slate-400 mb-2">Supported Medical Standards</div>
                    <div className="flex flex-wrap gap-1.5">
                      {['HL7 FHIR v4', 'ICD-10-CM', 'CPT 2026', 'SNOMED CT', 'LOINC', 'HIPAA 837P'].map((std) => (
                        <span key={std} className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-[11px] font-mono text-slate-300">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CLAIMS & FRAUD ENGINE */}
        {activeTab === 'claims' && (
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Form to submit new claim */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl h-fit">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-4">
                <Plus className="h-5 w-5 text-sky-400" />
                <h2 className="text-lg font-bold text-white">Submit Claim Sandbox</h2>
              </div>
              <form onSubmit={handleCreateClaim} className="mt-5 space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. David Miller"
                    value={newPatientName}
                    onChange={(e) => setNewPatientName(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Procedure Code</label>
                  <select
                    value={newProcedure}
                    onChange={(e) => setNewProcedure(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none"
                  >
                    <option value="CPT-99214">CPT-99214: Office Visit (30 mins)</option>
                    <option value="CPT-72148">CPT-72148: MRI Lumbar Spine</option>
                    <option value="CPT-99205">CPT-99205: New Patient High Complexity</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">Billed Amount ($)</label>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">ICD-10 Code</label>
                    <input
                      type="text"
                      value={newIcdCode}
                      onChange={(e) => setNewIcdCode(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2.5 text-sm text-white focus:border-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmittingClaim}
                  className="w-full rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/20 transition hover:from-sky-400 hover:to-indigo-500 disabled:opacity-50"
                >
                  {isSubmittingClaim ? 'Analyzing Claim with AI...' : 'Run Real-time AI Adjudication'}
                </button>
              </form>
            </div>

            {/* Claims Table */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-4">Adjudicated Claims Queue</h2>
              <div className="space-y-3">
                {claims.map((claim) => (
                  <div key={claim.id} className="rounded-xl border border-slate-800 bg-slate-950/80 p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/60 pb-3">
                      <div>
                        <span className="font-mono text-sm font-bold text-sky-400">{claim.id}</span>
                        <span className="ml-3 font-semibold text-slate-200">{claim.patientName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-400">{claim.timestamp}</span>
                        <span
                          className={`rounded-full px-3 py-0.5 text-xs font-semibold border ${
                            claim.status === 'Approved'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          {claim.status}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">Procedure</span>
                        <span className="font-medium text-slate-200">{claim.procedureCode}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Billed Amount</span>
                        <span className="font-medium text-white">${claim.billedAmount.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Fraud Score</span>
                        <span className={`font-medium ${claim.fraudScore > 0.3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {(claim.fraudScore * 100).toFixed(0)}%
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">AI Confidence</span>
                        <span className="font-medium text-sky-400">{(claim.aiConfidence * 100).toFixed(0)}%</span>
                      </div>
                    </div>

                    <div className="rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-300 flex items-start gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{claim.decisionReason}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MEDICAL OCR & PARSING */}
        {activeTab === 'ocr' && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
              <h2 className="text-lg font-bold text-white mb-4">Ingested Documents</h2>
              <div className="space-y-3">
                {documents.map((doc) => (
                  <button
                    key={doc.id}
                    onClick={() => setSelectedDoc(doc)}
                    className={`w-full text-left rounded-xl border p-4 transition ${
                      selectedDoc?.id === doc.id
                        ? 'border-sky-500 bg-sky-500/10'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-sky-400">{doc.id}</span>
                      <span className="text-[10px] text-slate-400">{doc.timestamp}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-white mt-1">{doc.title}</h3>
                    <p className="text-xs text-slate-400">{doc.patientName} • {doc.type}</p>
                  </button>
                ))}
              </div>
            </div>

            {selectedDoc && (
              <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">{selectedDoc.title}</h2>
                    <p className="text-xs text-slate-400">OCR & Clinical Named Entity Recognition (NER) Results</p>
                  </div>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-semibold text-emerald-400">
                    {selectedDoc.status}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-xs font-semibold uppercase text-sky-400 block mb-2">ICD-10 Diagnoses</span>
                    <div className="space-y-1.5">
                      {selectedDoc.extractedEntities.icd10.map((code) => (
                        <div key={code} className="text-xs font-mono text-slate-200 bg-slate-900 rounded p-1.5 border border-slate-800">
                          {code}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-xs font-semibold uppercase text-indigo-400 block mb-2">CPT Procedures</span>
                    <div className="space-y-1.5">
                      {selectedDoc.extractedEntities.cpt.map((cpt) => (
                        <div key={cpt} className="text-xs font-mono text-slate-200 bg-slate-900 rounded p-1.5 border border-slate-800">
                          {cpt}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                    <span className="text-xs font-semibold uppercase text-emerald-400 block mb-2">Prescribed Rx</span>
                    <div className="space-y-1.5">
                      {selectedDoc.extractedEntities.medications.map((med) => (
                        <div key={med} className="text-xs font-mono text-slate-200 bg-slate-900 rounded p-1.5 border border-slate-800">
                          {med}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-4">
                  <span className="text-xs font-semibold text-slate-400 block mb-2">Raw Extracted Document OCR Text</span>
                  <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-900/80 p-3 rounded-lg border border-slate-800">
                    Patient: {selectedDoc.patientName} | Record Type: {selectedDoc.type} | Intake Date: {selectedDoc.timestamp}
                    {'\n\n'}SUMMARY: Patient presents with persistent symptoms. Multi-modal clinical NER pipeline identified primary codes {selectedDoc.extractedEntities.icd10.join(', ')}. Recommended follow-up procedure {selectedDoc.extractedEntities.cpt.join(', ')}. Medication compliance verified.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CLINICAL PROTOCOL RAG */}
        {activeTab === 'rag' && (
          <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl max-w-4xl mx-auto space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Brain className="h-5 w-5 text-sky-400" />
                Medical Policy & Clinical RAG Assistant
              </h2>
              <p className="text-xs text-slate-400 mt-1">Grounded vector search over 450,000+ payer bulletins and clinical guidelines</p>
            </div>

            {/* Quick Prompts */}
            <div className="flex flex-wrap gap-2">
              {[
                'What are coverage rules for Lumbar Spine MRI (CPT 72148)?',
                'Check continuous glucose monitor eligibility criteria',
                'What ICD-10 codes support CPT 99214 outpatient visit?'
              ].map((p) => (
                <button
                  key={p}
                  onClick={() => setQuery(p)}
                  className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 transition hover:border-sky-500 hover:text-white"
                >
                  {p}
                </button>
              ))}
            </div>

            {/* Chat Feed */}
            <div className="space-y-4 min-h-[250px] max-h-[400px] overflow-y-auto pr-2">
              {chatHistory.map((item, idx) => (
                <div key={idx} className={`flex flex-col ${item.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 text-sm ${
                      item.role === 'user'
                        ? 'bg-sky-600 text-white rounded-br-none'
                        : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-bl-none'
                    }`}
                  >
                    <p>{item.text}</p>
                    {item.citations && item.citations.length > 0 && (
                      <div className="mt-3 border-t border-slate-800/80 pt-2 text-[11px] text-slate-400 space-y-1">
                        <span className="font-semibold text-sky-400 block">Citations & Grounding:</span>
                        {item.citations.map((c) => (
                          <div key={c} className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3 text-emerald-400" /> {c}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isAsking && (
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Sparkles className="h-4 w-4 text-sky-400 animate-spin" /> Querying vector embeddings & analyzing clinical policies...
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendQuery} className="flex gap-2">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask clinical policy or coding question..."
                className="flex-1 rounded-xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-sky-500 focus:outline-none"
              />
              <button
                type="submit"
                className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-sky-400"
              >
                Query RAG
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: SYSTEM TELEMETRY */}
        {activeTab === 'system' && (
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">API Gateway Status</h3>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs text-emerald-400">
                    Online
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-white">FastAPI v1.0</div>
                <div className="text-xs text-slate-400 mt-1">Uvicorn ASGI • Python 3.14</div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">Database Engine</h3>
                  <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs text-emerald-400">
                    Active
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-white">SQLAlchemy + SQLite</div>
                <div className="text-xs text-slate-400 mt-1">Auto-migrated schema</div>
              </div>

              <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-white">Live Connection</h3>
                  <span className="rounded-full bg-sky-500/10 border border-sky-500/30 px-2.5 py-0.5 text-xs text-sky-400">
                    {backendStatus === 'connected' ? 'Connected to API' : 'Interactive Demo Mode'}
                  </span>
                </div>
                <div className="text-2xl font-extrabold text-white">HTTP / REST</div>
                <div className="text-xs text-slate-400 mt-1">CORS Allowed (*)</div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-xl space-y-3">
              <h3 className="text-sm font-bold text-white">Raw Analytics Telemetry (/api/v1/analytics/dashboard)</h3>
              <pre className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-mono text-sky-300 overflow-x-auto">
{JSON.stringify(
  apiData || {
    claims_processed: 1842,
    approval_rate: 0.914,
    fraud_rate: 0.035,
    ai_confidence: 0.948,
    latency_ms: 231.4,
    token_usage: 128000,
    cost_usd: 1842.31,
    embeddings_indexed: 456000,
    llm_calls: 38124
  },
  null,
  2
)}
              </pre>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
