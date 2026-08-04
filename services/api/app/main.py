from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import get_settings
from app.routes.health import router as health_router
from app.routes.auth import router as auth_router
from app.routes.claims import router as claims_router
from app.routes.documents import router as documents_router
from app.routes.analytics import router as analytics_router

from app.database import init_db

settings = get_settings()
init_db()

app = FastAPI(
    title=settings.app_name,
    version='1.0.0',
    docs_url='/docs',
    redoc_url='/redoc',
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

app.include_router(health_router, prefix=settings.api_v1_prefix)
app.include_router(auth_router, prefix=settings.api_v1_prefix)
app.include_router(claims_router, prefix=settings.api_v1_prefix)
app.include_router(documents_router, prefix=settings.api_v1_prefix)
app.include_router(analytics_router, prefix=settings.api_v1_prefix)

@app.get('/')
def root():
    return {"status": "ok", "message": "AI Healthcare Intelligence API"}

