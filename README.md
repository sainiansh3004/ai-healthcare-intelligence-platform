# AI Healthcare Intelligence Platform

A production-grade monorepo for healthcare document processing, claims intelligence, fraud analytics, RAG workflows, and enterprise observability — built with a modern Python + TypeScript stack.

![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-009688?logo=fastapi&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-14-000000?logo=next.js&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

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
| **Frontend** | Next.js 14 · TypeScript · Tailwind CSS · Recharts |
| **Backend** | FastAPI · SQLAlchemy 2.0 · Pydantic v2 · Uvicorn |
| **Auth** | JWT (python-jose) · Passlib + bcrypt · OAuth2 |
| **Database** | PostgreSQL 16 · pgvector (embeddings-ready) |
| **Object Store** | MinIO (S3-compatible) |
| **Queue** | Celery + Redis |
| **Monitoring** | Prometheus · Grafana · OpenTelemetry |
| **Deployment** | Docker Compose · Kubernetes manifests |

---

## Features

- **Claims Processing** — Submit, validate, and track healthcare insurance claims with AI-powered fraud scoring
- **Fraud Analytics** — Real-time fraud detection with configurable confidence thresholds
- **Document Intake** — Upload and process medical documents (OCR pipeline ready)
- **RAG Workflows** — Retrieval-Augmented Generation over medical policies and clinical protocols
- **Role-Based Auth** — JWT authentication with roles: Admin, Doctor, Auditor, Insurance Agent, Provider
- **Dashboard** — Real-time operational intelligence with claims metrics, latency, and AI telemetry
- **Observability** — Prometheus metrics, Grafana dashboards, and OpenTelemetry tracing

---

## Quick Start

### Prerequisites

- **Docker Desktop** (for PostgreSQL, Redis, MinIO)
- **Python 3.12+**
- **Node.js 18+** and npm

### Option 1: Docker Compose (Recommended)

Start all services with a single command:

```bash
make up
```

This builds and runs everything — API, frontend, database, Redis, MinIO, Prometheus, and Grafana.

### Option 2: Local Development

**1. Start infrastructure services:**

```bash
docker compose up -d postgres redis minio
```

**2. Set up the API:**

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r services/api/requirements.txt
```

**3. Initialize the database and start the API:**

```bash
cd services/api
PYTHONPATH=. python -c "from app.database import init_db; init_db()"
PYTHONPATH=. uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

**4. Start the frontend (new terminal):**

```bash
cd services/frontend
npm install
npm run dev
```

### Access Points

| Service | URL |
|---------|-----|
| **Frontend Dashboard** | http://localhost:3000 |
| **API Documentation (Swagger)** | http://localhost:8000/docs |
| **API Documentation (ReDoc)** | http://localhost:8000/redoc |
| **Health Check** | http://localhost:8000/api/v1/health/live |
| **Prometheus** | http://localhost:9090 |
| **Grafana** | http://localhost:3001 (admin/admin) |
| **MinIO Console** | http://localhost:9001 (minioadmin/minioadmin) |

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

## Project Structure

```
ai-healthcare-intelligence-platform/
├── services/
│   ├── api/                        # FastAPI backend
│   │   ├── app/
│   │   │   ├── main.py             # Application entrypoint
│   │   │   ├── config.py           # Settings (env-driven)
│   │   │   ├── database.py         # SQLAlchemy engine & session
│   │   │   ├── models.py           # ORM models (User, Claim, Document, etc.)
│   │   │   ├── schemas.py          # Pydantic request/response schemas
│   │   │   ├── worker.py           # Celery worker configuration
│   │   │   ├── routes/
│   │   │   │   ├── health.py       # Health check endpoints
│   │   │   │   ├── auth.py         # Registration, login, JWT
│   │   │   │   ├── claims.py       # Claims CRUD
│   │   │   │   ├── documents.py    # Document upload & listing
│   │   │   │   └── analytics.py    # Dashboard metrics
│   │   │   └── services/
│   │   │       └── auth_service.py # Password hashing & JWT utilities
│   │   ├── tests/                  # Pytest test suite
│   │   ├── requirements.txt        # Python dependencies
│   │   ├── Dockerfile
│   │   └── .env.example
│   └── frontend/                   # Next.js frontend
│       ├── app/
│       │   ├── layout.tsx          # Root layout
│       │   ├── page.tsx            # Dashboard page
│       │   └── globals.css         # Global styles
│       ├── package.json
│       ├── tailwind.config.ts
│       └── Dockerfile
├── k8s/                            # Kubernetes deployment manifests
├── monitoring/                     # Prometheus configuration
├── docs/                           # Architecture & system design docs
├── docker-compose.yml              # Full-stack orchestration
├── Makefile                        # Dev shortcuts
└── .github/                        # CI/CD workflows
```

---

## Database Models

| Model | Description |
|-------|-------------|
| **User** | Platform users with roles (admin, doctor, auditor, insurance_agent, provider) |
| **Patient** | Patient records with external ID linkage |
| **Doctor** | Provider registry with specialty tracking |
| **Hospital** | Facility records |
| **Claim** | Insurance claims with fraud scoring and AI confidence |
| **MedicalDocument** | Uploaded documents with OCR text extraction |

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `DATABASE_URL` | `postgresql+psycopg://healthcare:healthcare@localhost:5432/healthcare` | PostgreSQL connection string |
| `REDIS_URL` | `redis://localhost:6379/0` | Redis connection string |
| `JWT_SECRET` | `change-me` | JWT signing secret |
| `JWT_ALGORITHM` | `HS256` | JWT algorithm |
| `MINIO_ENDPOINT` | `localhost:9000` | MinIO endpoint |
| `MINIO_ACCESS_KEY` | `minioadmin` | MinIO access key |
| `MINIO_SECRET_KEY` | `minioadmin` | MinIO secret key |
| `DEBUG` | `false` | Debug mode |

---

## Development Commands

```bash
make up        # Start all services via Docker Compose
make down      # Stop and remove all containers + volumes
make test      # Run API test suite
make api       # Run API server locally
make frontend  # Run frontend dev server locally
make lint      # Compile-check Python code
```

---

## Testing

```bash
# Run the full test suite
cd services/api
PYTHONPATH=. pytest tests -q

# Run with verbose output
PYTHONPATH=. pytest tests -v
```

---

## License

MIT
