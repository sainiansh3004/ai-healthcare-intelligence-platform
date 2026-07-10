from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import TokenResponse, UserCreate, UserOut
from app.services.auth_service import authenticate_user, create_access_token, get_password_hash

router = APIRouter(prefix='/auth', tags=['auth'])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='/api/v1/auth/token')


@router.post('/register', response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register_user(payload: UserCreate, db: Session = Depends(get_db)) -> UserOut:
    if db.query(User).filter(User.email == payload.email).first():
        raise HTTPException(status_code=400, detail='Email already registered')

    user = User(
        email=str(payload.email),
        full_name=payload.full_name,
        hashed_password=get_password_hash(payload.password),
        role=payload.role,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return UserOut.model_validate(user)


@router.post('/token', response_model=TokenResponse)
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)) -> TokenResponse:
    user = authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail='Invalid credentials')
    token = create_access_token(subject=str(user.id))
    return TokenResponse(access_token=token)


@router.get('/me', response_model=UserOut)
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> UserOut:
    from jose import JWTError
    from app.services.auth_service import decode_access_token

    try:
        payload = decode_access_token(token)
    except JWTError as exc:
        raise HTTPException(status_code=401, detail='Invalid token') from exc

    user = db.query(User).filter(User.id == int(payload['sub'])).first()
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    return UserOut.model_validate(user)
