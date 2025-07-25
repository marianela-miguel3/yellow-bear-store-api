.PHONY: help install dev start test lint lint-fix clean docker-build docker-run docker-stop docker-clean

# Default target
help:
	@echo "Available commands:"
	@echo "  install     - Install dependencies"
	@echo "  build       - Build TypeScript to JavaScript"
	@echo "  dev         - Start development server"
	@echo "  start       - Start production server"
	@echo "  lint        - Run ESLint"
	@echo "  lint-fix    - Fix ESLint issues"
	@echo "  clean       - Clean node_modules, dist and logs"
	@echo "  docker-build - Build Docker image"
	@echo "  docker-run  - Run Docker container"
	@echo "  docker-stop - Stop Docker container"
	@echo "  docker-clean - Remove Docker container and image"

# Install dependencies
install:
	npm install

# Build TypeScript to JavaScript
build:
	npm run build

# Start development server
dev:
	npm run dev

# Start production server
start:
	npm start

# Run ESLint
lint:
	npm run lint

# Fix ESLint issues
lint-fix:
	npm run lint:fix

# Clean up
clean:
	rm -rf node_modules
	rm -rf dist
	rm -f *.log
	npm install

# Docker commands
docker-build:
	docker build -t yellow-bear-store-api .

docker-run:
	docker run -d --name yellow-bear-api -p 3005:3005 yellow-bear-store-api

docker-stop:
	docker stop yellow-bear-api || true
	docker rm yellow-bear-api || true

docker-clean: docker-stop
	docker rmi yellow-bear-store-api || true

# Docker Compose commands
docker-compose-up:
	docker-compose up --build

docker-compose-down:
	docker-compose down

docker-compose-logs:
	docker-compose logs -f 