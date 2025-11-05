# 🚀 Quick Start Guide - KuberJi Mandir

## 📋 Prerequisites Checklist

- [x] Node.js 18+ or Bun installed
- [ ] Supabase account created
- [ ] `.env.local` configured

## ⚡ 3-Step Quick Setup

### Step 1: Create Supabase Database (5 minutes)

1. Go to https://supabase.com and create account
2. Create new project: **kuberji-mandir**
3. Copy database password (save it!)
4. Get connection string:
   - Settings → Database → Connection string → URI
5. Copy the full connection string

### Step 2: Configure Environment (2 minutes)

```bash
# Run the automated setup script
./setup-database.sh

# OR manually:
cp .env.example .env.local
# Then edit .env.local with your values
```

**Required Values in `.env.local`:**

```env
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT].supabase.co:5432/postgres"
JWT_SECRET="[run: openssl rand -base64 32]"
JWT_REFRESH_SECRET="[run: openssl rand -base64 32]"
```

### Step 3: Initialize Database (3 minutes)

```bash
# Generate Prisma Client
bunx prisma generate

# Run migrations
bunx prisma migrate dev --name init

# Seed with sample data
bunx prisma db seed

# View database (optional)
bunx prisma studio
```

## ✅ Verify Setup

```bash
# Start development server
bun run dev

# Test authentication (in another terminal)
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@temple.com","password":"demo123"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "...",
    "name": "Demo User",
    "email": "user@temple.com",
    "role": "USER"
  }
}
```

## 🧪 Test Accounts

After running `bunx prisma db seed`:

| Role  | Email                      | Password  |
|-------|----------------------------|-----------|
| Admin | admin@kuberjitemple.org    | admin123  |
| User  | user@temple.com            | demo123   |

## 📊 Database Overview

After seeding, you'll have:
- ✅ 2 test users (Admin + Demo user)
- ✅ 8 temple services
- ✅ 2 scheduled livestreams
- ✅ Temple settings

## 🔍 View Your Data

```bash
# Open Prisma Studio (visual database editor)
bunx prisma studio

# Opens at: http://localhost:5555
```

## 🛠️ Common Commands

```bash
# Development
bun run dev              # Start dev server (port 3000)

# Database
bunx prisma studio       # View database
bunx prisma migrate dev  # Create new migration
bunx prisma db push      # Push schema (no migration)
bunx prisma db seed      # Seed database
bunx prisma generate     # Generate Prisma Client

# Production
bun run build           # Build for production
bun run start           # Start production server
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Example: Register User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "secure123",
    "language": "en"
  }'
```

## 🎨 Frontend Pages

Heritage theme implemented:
- ✅ `/about` - About Pandukeshwar
- ✅ `/shop` - Temple shop
- ✅ `/contact` - Contact form
- ✅ `/howtoreachus` - Visit information
- ✅ `/events` - Temple events
- ✅ `/auth/login` - Login page
- ✅ `/auth/signup` - Signup page

## 🐛 Troubleshooting

### Database Connection Error
```bash
# Check if DATABASE_URL is correct in .env.local
# Verify Supabase project is active (green dot)
# Try direct connection first, then pooled
```

### Prisma Client Error
```bash
# Regenerate Prisma Client
bunx prisma generate

# Clear and reinstall
rm -rf node_modules
bun install
```

### Migration Error
```bash
# Alternative: Push schema without migration
bunx prisma db push

# Reset database (⚠️ deletes all data)
bunx prisma migrate reset
```

### Seed Error
```bash
# Check if migrations ran successfully
bunx prisma migrate status

# Run seed manually
node prisma/seed.js
```

## 📚 Documentation

- `SUPABASE_SETUP_GUIDE.md` - Detailed Supabase setup
- `BACKEND_SETUP_README.md` - Complete backend guide
- `BACKEND_IMPLEMENTATION_PLAN.md` - Full roadmap
- `HERITAGE_THEME_IMPLEMENTATION.md` - Theme docs

## 🔐 Security Checklist

- [ ] Strong database password (16+ characters)
- [ ] Unique JWT secrets (use `openssl rand -base64 32`)
- [ ] `.env.local` in `.gitignore` (already done)
- [ ] HTTPS in production
- [ ] Environment variables in deployment platform

## 🚀 Next Steps

### Immediate
1. ✅ Complete database setup
2. ✅ Test authentication
3. 🔄 Implement booking API
4. 🔄 Add payment gateway

### Short-term
5. 🔄 Email notifications
6. 🔄 PDF receipts
7. 🔄 Calendar booking
8. 🔄 User profile editing

### Long-term
9. 🔄 Livestream integration
10. 🔄 Admin dashboard
11. 🔄 Analytics
12. 🔄 Mobile app

## 💡 Pro Tips

1. **Use Prisma Studio** - Visual database editor (bunx prisma studio)
2. **Connection Pooling** - Use port 6543 for production
3. **Regular Backups** - Supabase provides automatic backups
4. **Monitor Usage** - Check Supabase dashboard regularly
5. **Version Control** - Commit migrations to Git

## 🤝 Need Help?

1. Check `SUPABASE_SETUP_GUIDE.md` for detailed instructions
2. Review `BACKEND_SETUP_README.md` for troubleshooting
3. Check Supabase docs: https://supabase.com/docs
4. Prisma docs: https://www.prisma.io/docs

## ✨ Success Indicators

You're ready to continue when:
- ✅ Dev server runs without errors
- ✅ Can login with test accounts
- ✅ Prisma Studio shows your data
- ✅ All pages load with heritage theme
- ✅ No console errors in browser

---

**Estimated Setup Time:** 10-15 minutes
**Status:** Phase 1 Complete ✅
**Last Updated:** October 2024
