.PHONY: up down test api frontend lint

up:
	docker compose up --build -d

down:
	docker compose down -v

test:
	pytest services/api/tests -q

api:
	cd services/api && uvicorn app.main:app --reload

frontend:
	cd services/frontend && npm run dev

lint:
	cd services/api && python -m compileall app
