from celery import Celery

from app.config import get_settings

settings = get_settings()
celery_app = Celery('healthcare_worker', broker=settings.redis_url, backend=settings.redis_url)


@celery_app.task(name='healthcare.process_document')
def process_document(document_id: int) -> dict[str, object]:
    return {'document_id': document_id, 'status': 'queued'}
