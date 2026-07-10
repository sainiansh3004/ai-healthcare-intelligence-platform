from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_liveness_endpoint() -> None:
    response = client.get('/api/v1/health/live')
    assert response.status_code == 200
    assert response.json() == {'status': 'alive'}


def test_dashboard_metrics() -> None:
    response = client.get('/api/v1/analytics/dashboard')
    assert response.status_code == 200
    payload = response.json()
    assert payload['claims_processed'] > 0
