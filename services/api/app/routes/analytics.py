from fastapi import APIRouter

from app.schemas import DashboardMetrics

router = APIRouter(prefix='/analytics', tags=['analytics'])


@router.get('/dashboard', response_model=DashboardMetrics)
def dashboard_metrics() -> DashboardMetrics:
    return DashboardMetrics(
        claims_processed=1842,
        approval_rate=0.91,
        fraud_rate=0.035,
        ai_confidence=0.94,
        latency_ms=231.4,
        token_usage=128000,
        cost_usd=1842.31,
        embeddings_indexed=456000,
        llm_calls=38124,
    )
