# AI Healthcare Intelligence Platform

A production-oriented monorepo for healthcare document processing, claims intelligence, fraud analytics, RAG workflows, and enterprise observability.

## Architecture

- Frontend: Next.js + TypeScript + Tailwind + shadcn-inspired UI
- Backend: FastAPI + SQLAlchemy + Pydantic + Alembic
- Worker: Celery + Redis for asynchronous processing
- Data: PostgreSQL + pgvector + MinIO
- AI: LangGraph, LangChain, embeddings, model evaluation, and retrieval workflows
- Ops: Docker Compose, Kubernetes manifests, Prometheus, Grafana, OpenTelemetry

## Quick start

```bash
make up
```

Then visit:
- Frontend: http://localhost:3000
- API: http://localhost:8000/docs
- Prometheus: http://localhost:9090
- Grafana: http://localhost:3001
