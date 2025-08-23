#!/bin/bash

# Development script to run both frontend and backend
set -e

echo "🚀 Starting AI Voice Assistant & Calendar Manager development environment..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Start database and Redis
echo "📦 Starting database and Redis..."
docker-compose up -d db redis

# Wait for database to be ready
echo "⏳ Waiting for database to be ready..."
until docker-compose exec -T db pg_isready -U postgres; do
    echo "Database is not ready yet. Waiting..."
    sleep 2
done

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Build shared packages
echo "🔨 Building shared packages..."
pnpm --filter @voice-assistant/types build
pnpm --filter @voice-assistant/ui build

# Run database migrations
echo "🗄️ Running database migrations..."
cd apps/backend
alembic upgrade head
cd ../..

# Start development servers
echo "🌐 Starting development servers..."
pnpm dev

echo "✅ Development environment is ready!"
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:8000"
echo "📊 API Docs: http://localhost:8000/docs"
