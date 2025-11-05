# 🚀 Final Step: Run SQL in Supabase Dashboard

Due to connection pooling limitations with Prisma migrations, please run the SQL directly in your Supabase dashboard.

## 📋 Step-by-Step Instructions

### Step 1: Open Supabase SQL Editor

1. Go to: https://supabase.com/dashboard/projects
2. Click your **"kuberji-mandir"** project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New query"**

### Step 2: Copy and Run This SQL

Copy the entire SQL below and paste it into the SQL editor, then click **"RUN"**:

```sql
-- Create Enums
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN', 'PRIEST');
CREATE TYPE "ServiceCategory" AS ENUM ('DAILY_AARTI', 'SPECIAL_POOJA', 'GRAND_CEREMONY', 'SEVA');
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED');
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'REFUNDED', 'FAILED');
CREATE TYPE "PaymentGateway" AS ENUM ('RAZORPAY', 'STRIPE', 'CASH');
CREATE TYPE "PaymentTransactionStatus" AS ENUM ('INITIATED', 'SUCCESS', 'FAILED', 'REFUNDED');
CREATE TYPE "LivestreamStatus" AS ENUM ('SCHEDULED', 'LIVE', 'COMPLETED', 'CANCELLED');

-- Create Tables
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "language" TEXT NOT NULL DEFAULT 'en',
    "notifications" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "nameHi" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionHi" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "duration" INTEGER NOT NULL,
    "category" "ServiceCategory" NOT NULL,
    "benefitsEn" TEXT[],
    "benefitsHi" TEXT[],
    "availableSlots" TEXT[],
    "imageUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "bookings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "bookingTime" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "amount" DOUBLE PRECISION NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paymentId" TEXT,
    "videoUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "bookings_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'INR',
    "paymentMethod" TEXT NOT NULL,
    "paymentGateway" "PaymentGateway" NOT NULL,
    "gatewayPaymentId" TEXT NOT NULL,
    "gatewayOrderId" TEXT NOT NULL,
    "status" "PaymentTransactionStatus" NOT NULL DEFAULT 'INITIATED',
    "receiptUrl" TEXT,
    "receiptNumber" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "livestreams" (
    "id" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleHi" TEXT NOT NULL,
    "descriptionEn" TEXT,
    "descriptionHi" TEXT,
    "streamUrl" TEXT NOT NULL,
    "scheduledTime" TIMESTAMP(3) NOT NULL,
    "status" "LivestreamStatus" NOT NULL DEFAULT 'SCHEDULED',
    "viewCount" INTEGER NOT NULL DEFAULT 0,
    "recordingUrl" TEXT,
    "thumbnailUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "livestreams_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);

-- Create Unique Indexes
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "services_nameEn_nameHi_key" ON "services"("nameEn", "nameHi");
CREATE UNIQUE INDEX "payments_bookingId_key" ON "payments"("bookingId");
CREATE UNIQUE INDEX "payments_gatewayPaymentId_key" ON "payments"("gatewayPaymentId");
CREATE UNIQUE INDEX "payments_receiptNumber_key" ON "payments"("receiptNumber");
CREATE UNIQUE INDEX "settings_key_key" ON "settings"("key");

-- Create Indexes
CREATE INDEX "users_email_idx" ON "users"("email");
CREATE INDEX "bookings_userId_idx" ON "bookings"("userId");
CREATE INDEX "bookings_serviceId_idx" ON "bookings"("serviceId");
CREATE INDEX "bookings_bookingDate_idx" ON "bookings"("bookingDate");
CREATE INDEX "payments_userId_idx" ON "payments"("userId");
CREATE INDEX "payments_gatewayPaymentId_idx" ON "payments"("gatewayPaymentId");
CREATE INDEX "livestreams_scheduledTime_idx" ON "livestreams"("scheduledTime");
CREATE INDEX "livestreams_status_idx" ON "livestreams"("status");

-- Add Foreign Keys
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "payments_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "payments" ADD CONSTRAINT "payments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
```

### Step 3: Verify Tables Created

After running the SQL:
1. Click **"Table Editor"** in left sidebar
2. You should see these tables:
   - users
   - services
   - bookings
   - payments
   - livestreams
   - settings

### Step 4: Seed the Database

Once tables are created, come back here and run:

```bash
cd /workspace/blissful-vale-7621
node prisma/seed.js
```

This will create:
- ✅ 2 test users (Admin + Demo)
- ✅ 8 temple services
- ✅ 2 scheduled livestreams
- ✅ 3 system settings

### Step 5: Verify Everything Works

```bash
# Start the development server
bun run dev

# Visit: http://localhost:3000/auth/login
# Login with: user@temple.com / demo123
```

---

## ✅ Success Checklist

- [ ] Opened Supabase SQL Editor
- [ ] Copied and ran the SQL above
- [ ] Saw "Success" message in Supabase
- [ ] Verified tables in Table Editor
- [ ] Ran `node prisma/seed.js` successfully
- [ ] Can login with test accounts

---

## 🆘 If You Get Errors

### "type already exists"
- Some types might already exist
- That's okay, just means you ran it before
- Check Table Editor to see if tables exist

### "relation already exists"
- Tables already created
- Check Table Editor
- If tables are empty, just run seed script

### Seed script fails
```bash
# Make sure tables exist first in Supabase
# Then run:
cd /workspace/blissful-vale-7621
node prisma/seed.js
```

---

**After completing this, you'll be 100% set up!** 🎉
