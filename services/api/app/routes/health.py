from fastapi import APIRouter

router = APIRouter(prefix='/health', tags=['health'])


@router.get('/live')
def liveness() -> dict[str, str]:
    return {'status': 'alive'}


@router.get('/ready')
def readiness() -> dict[str, str]:
    return {'status': 'ready'}
