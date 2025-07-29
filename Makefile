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
	@echo "  docker-compose-dev-up - Start development environment with live reload"
	@echo "  docker-compose-dev-down - Stop development environment"
	@echo "  docker-compose-dev-logs - View development logs"
	@echo "  docker-compose-dev-shell - Access development container shell"
	@echo "  db-generate - Generate Prisma client"
	@echo "  db-push     - Push schema to database"
	@echo "  db-migrate  - Create and apply migrations"
	@echo "  db-studio   - Open Prisma Studio"
	@echo "  db-seed     - Seed database with test data"
	@echo "  db-reset    - Reset database and apply migrations"
	@echo "  fresh-start - Complete clean start: remove all containers, volumes, images, and rebuild"
	@echo "  clean-docker - Clean only Docker resources (containers, volumes, images)"
	@echo "  clean-local  - Clean only local files (node_modules, package-lock.json)"
	@echo "  docs         - Open documentation index"

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

# Docker Compose Development commands
docker-compose-dev-up:
	docker-compose -f docker-compose.dev.yml up --build

docker-compose-dev-down:
	docker-compose -f docker-compose.dev.yml down

docker-compose-dev-logs:
	docker-compose -f docker-compose.dev.yml logs -f

docker-compose-dev-shell:
	docker-compose -f docker-compose.dev.yml exec api sh

# Database commands
db-generate:
	npm run db:generate

db-push:
	npm run db:push

db-migrate:
	npm run db:migrate

db-studio:
	npm run db:studio

db-seed:
	npm run db:seed

db-reset:
	npm run db:reset

# Fresh start - Complete clean rebuild
fresh-start:
	@echo "🧹 Starting complete clean rebuild..."
	@echo "📦 Stopping all containers..."
	docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans || true
	@echo "🗑️  Removing all containers..."
	docker container prune -f || true
	@echo "🗑️  Removing all volumes..."
	docker volume prune -f || true
	@echo "🗑️  Removing all images..."
	docker image prune -a -f || true
	@echo "🗑️  Removing all networks..."
	docker network prune -f || true
	@echo "🗑️  Removing all build cache..."
	docker builder prune -a -f || true
	@echo "📦 Cleaning local node_modules and package-lock.json..."
	rm -rf node_modules package-lock.json || true
	@echo "📦 Installing fresh dependencies..."
	npm install
	@echo "🔧 Generating Prisma client..."
	npm run db:generate
	@echo "🐳 Building and starting fresh containers..."
	docker-compose -f docker-compose.dev.yml up --build
	@echo "✅ Fresh start completed! Your environment is now completely clean and rebuilt."

# Clean only Docker resources
clean-docker:
	@echo "🐳 Cleaning Docker resources..."
	@echo "📦 Stopping all containers..."
	docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans || true
	@echo "🗑️  Removing all containers..."
	docker container prune -f || true
	@echo "🗑️  Removing all volumes..."
	docker volume prune -f || true
	@echo "🗑️  Removing all images..."
	docker image prune -a -f || true
	@echo "🗑️  Removing all networks..."
	docker network prune -f || true
	@echo "🗑️  Removing all build cache..."
	docker builder prune -a -f || true
	@echo "✅ Docker resources cleaned!"

# Clean only local files
clean-local:
	@echo "📦 Cleaning local files..."
	@echo "🗑️  Removing node_modules and package-lock.json..."
	rm -rf node_modules package-lock.json || true
	@echo "📦 Installing fresh dependencies..."
	npm install
	@echo "🔧 Generating Prisma client..."
	npm run db:generate
	@echo "✅ Local files cleaned and dependencies reinstalled!"

# Documentation
docs:
	@echo "📚 Opening documentation index..."
	@echo "📖 Documentation is available in the docs/ folder:"
	@echo "   📄 docs/README.md - Documentation index"
	@echo "   🔌 docs/API.md - API reference"
	@echo "   🐳 docs/DOCKER_DEV_SETUP.md - Docker setup"
	@echo "   📊 docs/SWAGGER_SETUP.md - Swagger guide"
	@echo "   🧹 docs/CLEAN_COMMANDS.md - Clean commands"
	@echo "   🔒 docs/SECURITY_SETUP.md - Security guide"
	@echo "   🗄️ docs/DATABASE_MIGRATIONS.md - Database migrations"
	@echo ""
	@echo "💡 You can also view the main README.md in the root directory" 