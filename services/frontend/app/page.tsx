'use client';

import { useEffect, useState } from 'react';

const metrics = [
  { label: 'Claims processed', value: '1,842', change: '+12.4%' },
  { label: 'Approval rate', value: '91%', change: '+3.2%' },
  { label: 'Fraud rate', value: '3.5%', change: '-0.8%' },
  { label: 'AI confidence', value: '94%', change: '+1.1%' },
];

export default function HomePage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/analytics/dashboard')
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData({ claims_processed: 0 }));
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.25),_transparent_30%),linear-gradient(135deg,_#020617,_#111827)] p-8 text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-slate-950/40">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">Enterprise AI Platform</p>
            <h1 className="mt-2 text-3xl font-semibold">Healthcare Intelligence Command Center</h1>
          </div>
          <div className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
            Production-ready operations
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-slate-800 bg-slate-900/70 p-5">
              <p className="text-sm text-slate-400">{metric.label}</p>
              <p className="mt-3 text-3xl font-semibold">{metric.value}</p>
              <p className="mt-2 text-sm text-emerald-400">{metric.change}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold">Operational Intelligence</h2>
            <p className="mt-2 text-sm text-slate-400">Claims, document processing, fraud signals, and LLM telemetry from the backend services.</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-sm text-slate-400">Claims processed</p>
                <p className="mt-2 text-2xl font-semibold">{data?.claims_processed ?? '—'}</p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-4">
                <p className="text-sm text-slate-400">Latency</p>
                <p className="mt-2 text-2xl font-semibold">{data?.latency_ms ?? '—'} ms</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="text-xl font-semibold">Platform Capabilities</h2>
            <ul className="mt-4 space-y-3 text-sm text-slate-400">
              <li>• OCR + multimodal document intake</li>
              <li>• Claims validation and fraud scoring</li>
              <li>• RAG over medical policy and clinical protocols</li>
              <li>• Agentic workflows with evaluator and observability</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
