#!/bin/bash

# KuberJi Mandir - Database Setup Script
# This script helps set up the database with Supabase

echo "🕉️  KuberJi Mandir - Database Setup"
echo "======================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "⚠️  .env.local file not found!"
    echo ""
    echo "📋 Creating .env.local from template..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Please update the following in .env.local:"
    echo "   1. DATABASE_URL (from Supabase)"
    echo "   2. JWT_SECRET (generate with: openssl rand -base64 32)"
    echo "   3. JWT_REFRESH_SECRET (generate with: openssl rand -base64 32)"
    echo ""
    echo "📖 See SUPABASE_SETUP_GUIDE.md for detailed instructions"
    echo ""
    read -p "Press Enter after updating .env.local..."
fi

echo "🔑 Generating JWT Secrets..."
echo ""
echo "JWT_SECRET (copy to .env.local):"
openssl rand -base64 32
echo ""
echo "JWT_REFRESH_SECRET (copy to .env.local):"
openssl rand -base64 32
echo ""

read -p "Have you updated DATABASE_URL in .env.local? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Please update DATABASE_URL in .env.local first"
    echo "📖 See SUPABASE_SETUP_GUIDE.md for instructions"
    exit 1
fi

echo ""
echo "🔄 Step 1: Generating Prisma Client..."
bunx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Failed to generate Prisma Client"
    exit 1
fi

echo ""
echo "🔄 Step 2: Running Database Migrations..."
bunx prisma migrate dev --name init

if [ $? -ne 0 ]; then
    echo "❌ Failed to run migrations"
    echo "💡 Try: bunx prisma db push (if migrations fail)"
    exit 1
fi

echo ""
echo "🌱 Step 3: Seeding Database..."
bunx prisma db seed

if [ $? -ne 0 ]; then
    echo "⚠️  Seeding failed, but you can continue"
fi

echo ""
echo "✨ Database setup complete!"
echo ""
echo "📊 Want to view your database? Run: bunx prisma studio"
echo ""
echo "🧪 Test Accounts:"
echo "   Admin: admin@kuberjitemple.org / admin123"
echo "   User:  user@temple.com / demo123"
echo ""
echo "🚀 Start development: bun run dev"
echo ""
