# Architecture Overview

The platform is organized as a modular monorepo with separate service boundaries for the web application, API, asynchronous worker, data services, and observability. The backend follows a layered architecture with routers, schemas, domain models, and services. The same structure can be extended into a microservice landscape as traffic grows.

## Core domains

- Authentication and authorization
- Claims processing and validation
- Medical document intake and extraction
- Fraud detection and explainability
- RAG over healthcare knowledge bases
- Monitoring, evaluation, and deployment automation
