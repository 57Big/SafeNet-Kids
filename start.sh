#!/bin/bash

# BMI Filtrlash Tizimi - Quick Start Script
# Bu script ham backend ham frontend'ni birga ishga tushiradi

echo "🚀 BMI Filtrlash Tizimi ishga tushmoqda..."
echo ""

# Check if MongoDB is running
echo "📊 MongoDB tekshirilmoqda..."
if ! pgrep -x mongod > /dev/null; then
    echo "⚠️  MongoDB ishlamayapti. Ishga tushirilmoqda..."
    brew services start mongodb-community 2>/dev/null || mongod --fork --logpath /tmp/mongodb.log 2>/dev/null
    sleep 2
fi

# Function to run backend
run_backend() {
    echo "🔧 Backend ishga tushmoqda..."
    cd backend

    # Check if .env exists
    if [ ! -f .env ]; then
        echo "📝 .env fayli yaratilmoqda..."
        cp .env.example .env
        echo "⚠️  Iltimos .env faylida OPENAI_API_KEY ni sozlang!"
    fi

    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "📦 Backend dependencies o'rnatilmoqda..."
        npm install
    fi

    # Start backend
    npm run dev
}

# Function to run frontend
run_frontend() {
    echo "🎨 Frontend ishga tushmoqda..."
    cd frontend

    # Check if .env exists
    if [ ! -f .env ]; then
        echo "📝 .env fayli yaratilmoqda..."
        cp .env.example .env
    fi

    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo "📦 Frontend dependencies o'rnatilmoqda..."
        npm install
    fi

    # Start frontend
    npm start
}

# Run in parallel using background processes
echo ""
echo "🎯 Ishga tushirish boshlandi..."
echo ""
echo "Backend: http://localhost:5001"
echo "Frontend: http://localhost:3000"
echo ""
echo "To'xtatish uchun: Ctrl+C"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Trap Ctrl+C
trap 'echo ""; echo "❌ To'\''xtatilmoqda..."; kill 0; exit' INT

# Run both in background
run_backend &
BACKEND_PID=$!

sleep 3

run_frontend &
FRONTEND_PID=$!

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
