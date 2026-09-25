# AegisHealth AI — Autonomous Healthcare Intelligence Platform

An enterprise-grade SaaS platform for autonomous claims adjudication, medical OCR entity extraction, clinical fraud & upcoding detection, grounded policy RAG, and revenue cycle observability — built with a modern Next.js 14, TypeScript, Tailwind CSS, FastAPI, and PostgreSQL/pgvector stack.

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![HIPAA](https://img.shields.io/badge/HIPAA-Safe%20Harbor-emerald)
![SOC2](https://img.shields.io/badge/SOC2-Type%20II-cyan)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌐 Live Demo & Deployment Links

| Service | Description | Live Link |
|---|---|---|
| 🖥️ **Web Application Command Center (Vercel)** | Enterprise Healthcare AI Dashboard, Claims Engine, OCR Parser, & RAG Assistant | **[https://ai-healthcare-intelligence-platform.vercel.app](https://ai-healthcare-intelligence-platform.vercel.app)** |
| ⚡ **FastAPI Backend & OpenAPI Docs (Render)** | REST API endpoints, Claims adjudication rules, & interactive Swagger documentation | **[https://ai-healthcare-api.onrender.com/docs](https://ai-healthcare-api.onrender.com/docs)** |

---

## ✨ Platform Highlights & Key SaaS Capabilities

### 1. 🚀 Flagship SaaS Landing Page (`/`)
- **Executive Hero & Real-Time Simulation**: Live animated execution card demonstrating automated claim ingestion, ICD-10 extraction, policy match, and auto-approval in 480ms.
- **Interactive Live Sandbox**: Test 3 real-world scenarios (*Lumbar MRI Pre-Auth*, *Emergency Cardiac Catheterization*, and *Level 5 E&M Upcoding Audit*) directly in the browser with explainable AI scores.
- **Dynamic ROI Calculator**: Interactive sliders calculate projected annual lost revenue recovery and manual clinical review hours saved based on HFMA healthcare benchmarks.
- **Transparent SaaS Pricing Matrix**: Monthly/Annual toggle with 20% savings badge across *Starter Practice*, *Health System Pro*, and *Autonomous Payer* tiers.
- **Compliance & Social Proof**: HIPAA Safe Harbor, SOC-2 Type II, and FHIR HL7 v4.0.1 badges with clinical endorsements from Chief Medical Officers.

### 2. 📊 Executive Command Center (`/dashboard`)
- **Real-Time Telemetry Cards**:
  - **Total Claims Value**: `$1,836,425` (+14.8% vs previous period)
  - **Clean Auto-Approval Rate**: `91.4%` (1,684 instant decisions)
  - **Fraud & Upcode Flags**: `3.5%` ($340K loss prevented)
  - **Avg Adjudication Latency**: `1.18s` (99.8% SLA adherence)
- **Recharts Visualizations**:
  - **Hourly Adjudication Velocity**: Dual-gradient Area Chart tracking peak volume (410 claims/hr).
  - **Adjudication Breakdown**: Interactive Donut chart displaying *Clean Auto-Approved*, *Prior-Auth Pending*, *Fraud Flagged*, and *Policy Denied*.
- **Live Claims Queue**: Real-time filtering by status (`All`, `Approved`, `Flagged`, `Pending`, `Denied`) and search across patient name, MRN, provider, or clinical codes.

### 3. 🔍 Deep Slide-Over Claim Inspection Drawer
- **Explainable AI Scoring**: SHAP fraud score breakdown with confidence ratings.
- **Adjudication Rationale Note**: Clinical justification tied directly to CMS LCD or commercial payer bulletins.
- **Billing Discrepancies**: Highlighting unbundled CPT modifiers, duplicate encounters, or missing pre-auth tokens.
- **Medical Coding Breakdown**: ICD-10 diagnosis codes and CPT/HCPCS procedure codes with Medicare allowable fee schedules.
- **Auditor Override Actions**: Immediate *Approve Claim*, *Flag for Audit*, or *Deny*.

### 4. 🗂️ 5 Dedicated Platform Intelligence Modules
1. **Claims & Fraud Engine Studio** — Multi-factor risk filtering, batch adjudication of low-risk pending claims, and submission simulator.
2. **Medical OCR & Entity Extraction** — Side-by-side view with raw clinical reports on the left and extracted FHIR v4.0.1 entities (ICD-10, CPT, medications, and HIPAA de-identification) on the right.
3. **Clinical Protocol RAG Assistant** — Grounded vector search over CMS LCD policies and commercial bulletins with prompt chips (*Humira step therapy*, *Lumbar MRI criteria*, *Cardiac Cath indications*).
4. **Revenue Cycle Telemetry** — Denial root-cause bar chart, days in A/R tracker (16.4 days), and commercial payer scorecard (Medicare, BCBS, Aetna, UnitedHealthcare).
5. **HIPAA Security & Audit Ledger** — Immutable SHA-256 event ledger, tenant API token generator, and compliance proof export.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                   Frontend (Next.js 14 + Tailwind)               │
│           Interactive SaaS Landing · Executive Command Center   │
│           Recharts · Lucide · Glassmorphism · TypeScript         │
│                         localhost:3000                          │
└────────────────────────────────┬────────────────────────────────┘
                                 │ REST API / JWT
┌────────────────────────────────▼────────────────────────────────┐
│                        Backend (FastAPI)                        │
│                SQLAlchemy 2.0 · Pydantic v2 · Uvicorn           │
│                         localhost:8000                          │
├──────────────┬──────────────┬──────────────┬────────────────────┤
│  Auth Guard  │ Claims Engine│  OCR Parser  │  Protocol RAG      │
│  OAuth2/JWT  │ Rules & FWA  │ FHIR v4.0.1  │ pgvector 1536-dim  │
└──────┬───────┴──────┬───────┴──────┬───────┴─────────┬──────────┘
       │              │              │                 │
┌──────▼──────┐┌──────▼──────┐┌──────▼──────┐   ┌──────▼──────┐
│  PostgreSQL ││ Redis Cache ││ MinIO S3    │   │ Celery      │
│  + pgvector ││ Broker      ││ Object Store│   │ Async Worker│
│  :5432      ││ :6379       ││ :9000       │   │ Pipeline    │
└─────────────┘└─────────────┘└─────────────┘   └─────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS 4 · Lucide Icons · Recharts |
| **Backend** | FastAPI · SQLAlchemy 2.0 · Pydantic v2 · Uvicorn |
| **Auth & Security** | JWT (python-jose) · Passlib + bcrypt · OAuth2 · HIPAA Safe Harbor Redaction |
| **Database & Vector** | PostgreSQL 16 / SQLite (dev fallback) · pgvector |
| **Object Store** | MinIO (S3-compatible) |
| **Task Queue** | Celery + Redis |
| **Monitoring** | Prometheus · Grafana · OpenTelemetry |
| **Containerization** | Docker Compose · Kubernetes manifests |

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.12+**
- **Node.js 18+** and npm

### 1. Start the Frontend Application
```bash
cd services/frontend
npm install
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** for the Landing Page and **[http://localhost:3000/dashboard](http://localhost:3000/dashboard)** for the Command Center.

### 2. Start the FastAPI Backend
```bash
cd services/api
../../.venv/bin/python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```
Interactive OpenAPI documentation will be accessible at **[http://localhost:8000/docs](http://localhost:8000/docs)**.

### 3. Docker Compose (Full Stack)
```bash
docker compose up --build
```

---

## 🧪 Testing

```bash
# Backend pytest suite
cd services/api
PYTHONPATH=. pytest tests -q

# Frontend production build validation
cd services/frontend
npm run build
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
