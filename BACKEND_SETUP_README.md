# Backend Setup Guide - KuberJi Mandir

## ✅ Completed Implementation

### 1. Database Schema
- **Status:** ✅ Complete
- **ORM:** Prisma with PostgreSQL
- **Models:** User, Service, Booking, Payment, Livestream, Setting
- **Location:** `prisma/schema.prisma`

### 2. Authentication System
- **Status:** ✅ Complete
- **Type:** JWT-based authentication with httpOnly cookies
- **Endpoints:**
  - `POST /api/auth/register` - User registration
  - `POST /api/auth/login` - User login  
  - `POST /api/auth/logout` - User logout
- **Security Features:**
  - Password hashing with bcrypt (12 rounds)
  - JWT access & refresh tokens
  - HttpOnly cookies
  - Role-based access control (USER, ADMIN, PRIEST)

### 3. Core Libraries
- ✅ Prisma Client
- ✅ bcryptjs (password hashing)
- ✅ jsonwebtoken (JWT)
- ✅ zod (validation)

## 🔄 In Progress / To Be Implemented

### Phase 2: Payment Gateway
```
📦 Required Packages:
  bun add razorpay
  # or
  bun add stripe

📁 Files to Create:
  - /lib/razorpay.js
  - /app/api/payments/create-order/route.js
  - /app/api/payments/verify/route.js
  - /app/api/payments/webhook/route.js
```

### Phase 3: Advanced Features
```
📦 Required Packages:
  bun add nodemailer        # Email notifications
  bun add jspdf             # PDF generation
  bun add @react-pdf/renderer # PDF rendering
  bun add date-fns          # Date utilities
  bun add react-datepicker  # Calendar booking

📁 Files to Create:
  - /lib/email.js
  - /lib/pdf.js
  - /app/api/bookings/*
  - /app/api/livestreams/*
  - /app/api/users/profile/route.js
```

### Phase 4: Admin Panel
```
📦 Required Packages:
  bun add recharts          # Charts
  bun add @tanstack/react-table # Tables

📁 Files to Create:
  - /app/admin/dashboard/page.js
  - /app/admin/bookings/page.js
  - /app/admin/users/page.js
  - /app/admin/services/page.js
  - /app/api/admin/*
```

## 🚀 Setup Instructions

### Step 1: Database Setup

#### Option A: Local PostgreSQL with Docker
```bash
# 1. Create docker-compose.yml
cat > docker-compose.yml << 'DOCKER'
version: '3.8'
services:
  postgres:
    image: postgres:16-alpine
    container_name: kuberji-postgres
    environment:
      POSTGRES_USER: kuberji
      POSTGRES_PASSWORD: kuberji123
      POSTGRES_DB: kuberji_mandir
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
DOCKER

# 2. Start PostgreSQL
docker-compose up -d

# 3. Verify it's running
docker ps
```

#### Option B: Cloud PostgreSQL (Recommended for Production)
**Supabase** (Free tier available):
1. Go to https://supabase.com
2. Create a new project
3. Copy the connection string from Settings > Database
4. Use the connection string in `.env.local`

**Other Options:**
- Railway: https://railway.app
- Neon: https://neon.tech
- ElephantSQL: https://www.elephantsql.com

### Step 2: Environment Setup

```bash
# 1. Copy environment template
cp .env.example .env.local

# 2. Update DATABASE_URL in .env.local
# For local Docker:
DATABASE_URL="postgresql://kuberji:kuberji123@localhost:5432/kuberji_mandir?schema=public"

# For Supabase:
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"

# 3. Generate JWT secrets
openssl rand -base64 32  # Use for JWT_SECRET
openssl rand -base64 32  # Use for JWT_REFRESH_SECRET
```

### Step 3: Database Migration

```bash
# 1. Generate Prisma Client
bunx prisma generate

# 2. Run migrations
bunx prisma migrate dev --name init

# 3. Seed database (optional - create seed file first)
bunx prisma db seed

# 4. Open Prisma Studio to view data
bunx prisma studio
```

### Step 4: Testing Authentication

```bash
# Start the development server
bun run dev

# Test registration endpoint
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "language": "en"
  }'

# Test login endpoint
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

## 📊 Database Schema Overview

### Users
- Stores user information with role-based access
- Supports email/password authentication
- Tracks language preference and notification settings

### Services
- Bilingual service information (EN/HI)
- Pricing, duration, and availability
- Categories: Daily Aarti, Special Pooja, Grand Ceremony, Seva

### Bookings
- Links users to services
- Tracks booking date/time and status
- Payment integration ready

### Payments
- Complete payment tracking
- Support for Razorpay and Stripe
- Receipt generation capability

### Livestreams
- Schedule and manage live streams
- Track viewership
- Store recordings

## 🔐 Security Best Practices

### ✅ Implemented
- [x] Password hashing with bcrypt
- [x] JWT tokens in httpOnly cookies
- [x] Input validation with Zod
- [x] Role-based access control
- [x] Secure cookie settings

### 📝 To Implement
- [ ] Rate limiting
- [ ] CORS configuration
- [ ] Email verification
- [ ] Password reset flow
- [ ] Two-factor authentication
- [ ] Audit logging

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration
- [ ] User login
- [ ] User logout
- [ ] Token refresh
- [ ] Protected route access
- [ ] Role-based permissions

### Automated Testing (To Implement)
```bash
# Install test dependencies
bun add --dev jest @testing-library/react @testing-library/jest-dom
bun add --dev supertest

# Run tests
bun test
```

## 📈 Next Steps Priority

### Immediate (Week 1)
1. ✅ Complete auth system
2. 🔄 Add user profile API
3. 🔄 Create booking API endpoints
4. 🔄 Implement service management

### Short-term (Week 2-3)
5. 🔄 Integrate Razorpay payment gateway
6. 🔄 Add email notifications
7. 🔄 Create PDF receipt generation
8. 🔄 Build calendar booking system

### Medium-term (Week 4-6)
9. 🔄 Implement livestream integration
10. 🔄 Build admin dashboard
11. 🔄 Add analytics
12. 🔄 User profile editing

## 🐛 Troubleshooting

### Database Connection Issues
```bash
# Check if PostgreSQL is running
docker ps

# Check database connection
bunx prisma db pull

# Reset database (WARNING: Deletes all data)
bunx prisma migrate reset
```

### Prisma Client Issues
```bash
# Regenerate Prisma Client
bunx prisma generate

# Clear node_modules and reinstall
rm -rf node_modules
bun install
```

### Authentication Issues
```bash
# Clear cookies in browser
# Check JWT_SECRET is set in .env.local
# Verify database has user data
bunx prisma studio
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "+919876543210",
  "language": "en"
}

Response 201:
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword"
}

Response 200:
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "USER"
  }
}
```

#### Logout
```http
POST /api/auth/logout

Response 200:
{
  "success": true,
  "message": "Logged out successfully"
}
```

## 🤝 Contributing

1. Create feature branch
2. Implement feature with tests
3. Update documentation
4. Submit pull request

## 📞 Support

For issues or questions:
- Check troubleshooting section
- Review API documentation
- Contact development team

---

**Last Updated:** October 2024
**Version:** 1.0.0
**Status:** Phase 1 Complete ✅
