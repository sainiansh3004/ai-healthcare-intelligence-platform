# AI Healthcare Intelligence Platform

A production-grade monorepo for healthcare document processing, claims intelligence, fraud analytics, RAG workflows, and enterprise observability — built with a modern Python + TypeScript stack.

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🌐 Live Demo & Deployment Links

| Service | Description | Live Link |
|---|---|---|
| 🖥️ **Web Application Command Center (Vercel)** | Enterprise Healthcare AI Dashboard, Claims Engine, OCR Parser, & RAG Assistant | **[https://ai-healthcare-intelligence-platform-eight.vercel.app](https://ai-healthcare-intelligence-platform-eight.vercel.app)** |
| ⚡ **FastAPI Backend & OpenAPI Docs (Render)** | REST API endpoints, Claims adjudication rules, & interactive Swagger documentation | **[https://ai-healthcare-intelligence-platform.onrender.com/docs](https://ai-healthcare-intelligence-platform.onrender.com/docs)** |
| 💻 **Local Interface** | Local web application server | [http://localhost:3000](http://localhost:3000) / [http://localhost:3001](http://localhost:3001) |

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                    │
│            TypeScript · Tailwind · Recharts             │
│                   localhost:3000                         │
└────────────────────────┬────────────────────────────────┘
                         │ REST API
┌────────────────────────▼────────────────────────────────┐
│                   Backend (FastAPI)                      │
│         SQLAlchemy · Pydantic · JWT Auth                │
│                   localhost:8000                         │
├──────────┬──────────┬──────────┬────────────────────────┤
│  Auth    │  Claims  │   Docs   │     Analytics          │
│  Module  │  Engine  │  Intake  │     Dashboard          │
└────┬─────┴────┬─────┴────┬─────┴──────┬─────────────────┘
     │          │          │            │
┌────▼──┐  ┌───▼───┐  ┌───▼───┐  ┌────▼─────┐
│Postgres│  │ Redis │  │ MinIO │  │ Celery   │
│  :5432 │  │ :6379 │  │ :9000 │  │ Worker   │
└────────┘  └───────┘  └───────┘  └──────────┘
```

### Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 · TypeScript · Tailwind CSS · Lucide Icons · Recharts |
| **Backend** | FastAPI · SQLAlchemy 2.0 · Pydantic v2 · Uvicorn |
| **Auth** | JWT (python-jose) · Passlib + bcrypt · OAuth2 |
| **Database** | PostgreSQL 16 / SQLite (local dev fallback) · pgvector |
| **Object Store** | MinIO (S3-compatible) |
| **Queue** | Celery + Redis |
| **Monitoring** | Prometheus · Grafana · OpenTelemetry |
| **Deployment** | Docker Compose · Kubernetes manifests · Localtunnel live deployment |

---

## Features

- **Executive Command Center** — Real-time telemetry tracking 1,842+ processed claims, 91.4% auto-approval rate, 3.5% fraud anomaly rate, and 94.8% AI model confidence
- **Claims & Fraud Engine** — Interactive claim submission with real-time fraud risk scoring and automated adjudication decision rationales
- **Medical OCR & Entity Extraction** — Automated parsing of discharge summaries, radiology reports, and lab results into structured ICD-10 codes, CPT procedure codes, and medications
- **Clinical Protocol RAG Assistant** — Grounded vector QA search over medical policy bulletins with policy citations
- **System Telemetry** — Full REST API gateway integration and live microservice telemetry

---

## Quick Start

### Prerequisites

- **Python 3.12+**
- **Node.js 18+** and npm

### Option 1: Docker Compose (Recommended)

Start all services with a single command:

```bash
make up
```

This builds and runs everything — API, frontend, database, Redis, MinIO, Prometheus, and Grafana.

### Option 2: Local Development

**1. Set up the API:**

```bash
cd services/api
../../.venv/bin/python3 -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

**2. Start the frontend:**

```bash
cd services/frontend
npm run dev
```

---

## API Endpoints

### Health

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/health/live` | Liveness probe |
| `GET` | `/api/v1/health/ready` | Readiness probe |

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/token` | Login and get JWT token |
| `GET` | `/api/v1/auth/me` | Get current user profile |

### Claims

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/claims` | Submit a new claim |
| `GET` | `/api/v1/claims` | List all claims |
| `GET` | `/api/v1/claims/{id}` | Get claim by ID |

### Documents

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/documents` | Upload a medical document |
| `GET` | `/api/v1/documents` | List all documents |

### Analytics

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/analytics/dashboard` | Dashboard metrics |

---

## Testing

```bash
# Run the full test suite
cd services/api
PYTHONPATH=. pytest tests -q
```

---

## License

MIT
