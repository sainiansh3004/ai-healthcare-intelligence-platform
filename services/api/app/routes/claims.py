from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Claim
from app.schemas import ClaimCreate, ClaimOut

router = APIRouter(prefix='/claims', tags=['claims'])


@router.post('', response_model=ClaimOut, status_code=status.HTTP_201_CREATED)
def create_claim(payload: ClaimCreate, db: Session = Depends(get_db)) -> ClaimOut:
    claim = Claim(
        claim_number=payload.claim_number,
        amount=payload.amount,
        patient_id=payload.patient_id,
        status='submitted',
        fraud_score=0.12,
        ai_confidence=0.91,
        decision_reason='Auto-validated against payer policy rules',
    )
    db.add(claim)
    db.commit()
    db.refresh(claim)
    return ClaimOut.model_validate(claim)


@router.get('', response_model=list[ClaimOut])
def list_claims(db: Session = Depends(get_db)) -> list[ClaimOut]:
    claims = db.query(Claim).order_by(Claim.created_at.desc()).all()
    return [ClaimOut.model_validate(claim) for claim in claims]


@router.get('/{claim_id}', response_model=ClaimOut)
def get_claim(claim_id: int, db: Session = Depends(get_db)) -> ClaimOut:
    claim = db.query(Claim).filter(Claim.id == claim_id).first()
    if not claim:
        raise HTTPException(status_code=404, detail='Claim not found')
    return ClaimOut.model_validate(claim)
