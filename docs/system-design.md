# System Design

## Request flow

1. Users interact with the Next.js dashboard.
2. The FastAPI backend serves authenticated APIs for analytics, claims, and documents.
3. Asynchronous tasks are offloaded to Celery for document processing and enrichment.
4. Data persists in PostgreSQL, with object storage for files and vector capabilities for retrieval.
5. Prometheus and Grafana provide observability for latency, errors, and usage.

## Production considerations

- JWT-based authentication with role-aware access.
- Structured logging and health probes for operational readiness.
- Containerized deployment with Kubernetes-ready manifests.
- CI/CD pipeline for automated backend and frontend validation.
