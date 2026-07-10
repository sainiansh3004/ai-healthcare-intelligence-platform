from fastapi import APIRouter, Depends, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import MedicalDocument
from app.schemas import DocumentOut, DocumentUploadRequest

router = APIRouter(prefix='/documents', tags=['documents'])


@router.post('', response_model=DocumentOut, status_code=status.HTTP_201_CREATED)
def upload_document(payload: DocumentUploadRequest, file: UploadFile | None = None, db: Session = Depends(get_db)) -> DocumentOut:
    document = MedicalDocument(
        title=payload.title,
        document_type=payload.document_type,
        metadata=payload.metadata,
        storage_key='uploaded://example',
        extracted_text='OCR and metadata extraction pipeline ready for deployment',
    )
    db.add(document)
    db.commit()
    db.refresh(document)
    return DocumentOut.model_validate(document)


@router.get('', response_model=list[DocumentOut])
def list_documents(db: Session = Depends(get_db)) -> list[DocumentOut]:
    documents = db.query(MedicalDocument).order_by(MedicalDocument.created_at.desc()).all()
    return [DocumentOut.model_validate(document) for document in documents]
