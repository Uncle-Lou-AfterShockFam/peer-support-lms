#!/bin/bash

echo "🧪 TESTING PEER SUPPORT LMS LOCALLY"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the vercel-lms directory"
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🔧 Checking environment variables..."
if [ ! -f ".env.local" ]; then
    echo "⚠️  .env.local not found, copying from .env.example"
    cp .env.example .env.local
    echo "✏️  Please edit .env.local with your Baserow API details"
fi

echo "🏗️  Building the application..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    echo "🚀 Starting local development server..."
    echo "🌐 Your LMS will be available at: http://localhost:3000"
    echo "📱 Make sure your Baserow server is running at: http://localhost"
    echo ""
    echo "Press Ctrl+C to stop the server"
    npm run dev
else
    echo "❌ Build failed! Check the errors above."
    exit 1
fi