from __future__ import annotations

from datetime import datetime
from typing import Any
from pydantic import BaseModel, EmailStr, Field


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = 'bearer'


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str = Field(min_length=2)
    password: str = Field(min_length=8)
    role: str = 'provider'


class UserOut(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    is_active: bool
    created_at: datetime


class ClaimCreate(BaseModel):
    claim_number: str
    amount: float
    patient_id: int | None = None


class ClaimOut(BaseModel):
    id: int
    claim_number: str
    status: str
    amount: float
    fraud_score: float | None = None
    ai_confidence: float | None = None
    decision_reason: str | None = None
    created_at: datetime


class DocumentUploadRequest(BaseModel):
    title: str
    document_type: str = 'unknown'
    metadata: dict[str, Any] = {}


class DocumentOut(BaseModel):
    id: int
    title: str
    document_type: str
    document_metadata: dict[str, Any]
    created_at: datetime

    model_config = {'from_attributes': True}


class DashboardMetrics(BaseModel):
    claims_processed: int
    approval_rate: float
    fraud_rate: float
    ai_confidence: float
    latency_ms: float
    token_usage: int
    cost_usd: float
    embeddings_indexed: int
    llm_calls: int
