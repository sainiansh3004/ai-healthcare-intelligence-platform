from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Any
from sqlalchemy import Boolean, DateTime, ForeignKey, Integer, Numeric, String, Text, JSON
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


class Base(DeclarativeBase):
    pass


class RoleName(str, Enum):
    ADMIN = 'admin'
    DOCTOR = 'doctor'
    AUDITOR = 'auditor'
    INSURANCE_AGENT = 'insurance_agent'
    PROVIDER = 'provider'


class User(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    role: Mapped[str] = mapped_column(String(50), default=RoleName.PROVIDER.value)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    claims: Mapped[list['Claim']] = relationship(back_populates='user')
    documents: Mapped[list['MedicalDocument']] = relationship(back_populates='owner')


class Patient(Base):
    __tablename__ = 'patients'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    external_id: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    date_of_birth: Mapped[datetime | None] = mapped_column(DateTime, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    claims: Mapped[list['Claim']] = relationship(back_populates='patient')


class Doctor(Base):
    __tablename__ = 'doctors'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    provider_id: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    full_name: Mapped[str] = mapped_column(String(255), nullable=False)
    specialty: Mapped[str | None] = mapped_column(String(100), nullable=True)


class Hospital(Base):
    __tablename__ = 'hospitals'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(255), nullable=False)
    address: Mapped[str | None] = mapped_column(String(500), nullable=True)


class MedicalDocument(Base):
    __tablename__ = 'medical_documents'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)
    document_type: Mapped[str] = mapped_column(String(50), default='unknown')
    storage_key: Mapped[str] = mapped_column(String(500), nullable=False)
    document_metadata: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)
    extracted_text: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    owner_id: Mapped[int | None] = mapped_column(ForeignKey('users.id'), nullable=True)
    owner: Mapped[User | None] = relationship(back_populates='documents')


class Claim(Base):
    __tablename__ = 'claims'

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    claim_number: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    status: Mapped[str] = mapped_column(String(50), default='submitted')
    amount: Mapped[float] = mapped_column(Numeric(10, 2), default=0.0)
    fraud_score: Mapped[float | None] = mapped_column(Numeric(5, 4), nullable=True)
    ai_confidence: Mapped[float | None] = mapped_column(Numeric(5, 4), nullable=True)
    decision_reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

    user_id: Mapped[int | None] = mapped_column(ForeignKey('users.id'), nullable=True)
    patient_id: Mapped[int | None] = mapped_column(ForeignKey('patients.id'), nullable=True)

    user: Mapped[User | None] = relationship(back_populates='claims')
    patient: Mapped[Patient | None] = relationship(back_populates='claims')
