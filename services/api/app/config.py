from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file='.env', extra='ignore')

    app_name: str = 'AI Healthcare Intelligence Platform'
    api_v1_prefix: str = '/api/v1'
    debug: bool = False
    database_url: str = 'sqlite:///./healthcare.db'
    redis_url: str = 'redis://localhost:6379/0'
    jwt_secret: str = 'change-me'
    jwt_algorithm: str = 'HS256'
    minio_endpoint: str = 'localhost:9000'
    minio_access_key: str = 'minioadmin'
    minio_secret_key: str = 'minioadmin'


@lru_cache
def get_settings() -> Settings:
    return Settings()
