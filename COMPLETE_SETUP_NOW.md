# 🚨 Complete Your Setup - Final Steps

## Current Status

✅ Supabase account created  
✅ Supabase project created  
⚠️ **Need to update `.env.local` with actual values**

---

## 🔧 What You Need to Do Right Now

### Step 1: Get Your Supabase Connection String

1. **Go to your Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard/projects
   - Click on your **"kuberji-mandir"** project

2. **Navigate to Database Settings:**
   - Click **"Settings"** (gear icon) in left sidebar
   - Click **"Database"**

3. **Copy Connection String:**
   - Scroll to **"Connection string"** section
   - Click **"URI"** tab
   - You'll see something like:
     ```
     postgresql://postgres:[YOUR-PASSWORD]@db.abcdefghijk.supabase.co:5432/postgres
     ```
   - **Replace `[YOUR-PASSWORD]`** with your actual database password
   - Copy the complete string

### Step 2: Update .env.local File

Open `.env.local` in your editor and replace the DATABASE_URL line:

**Current (with placeholder):**
```env
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD_HERE@db.YOUR_PROJECT_ID.supabase.co:5432/postgres"
```

**Replace with your actual connection string:**
```env
DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.YOUR_ACTUAL_PROJECT_ID.supabase.co:5432/postgres"
```

### Step 3: Update JWT Secrets

If you haven't generated JWT secrets yet, run:

```bash
# Generate first secret
openssl rand -base64 32

# Generate second secret
openssl rand -base64 32
```

Then update in `.env.local`:

**Current (with placeholder):**
```env
JWT_SECRET="REPLACE_WITH_GENERATED_SECRET_1"
JWT_REFRESH_SECRET="REPLACE_WITH_GENERATED_SECRET_2"
```

**Replace with generated values:**
```env
JWT_SECRET="paste_your_first_generated_secret_here"
JWT_REFRESH_SECRET="paste_your_second_generated_secret_here"
```

---

## 🚀 After Updating .env.local

Run these commands to complete the setup:

```bash
# 1. Generate Prisma Client
bunx prisma generate

# 2. Create database tables
bunx prisma migrate dev --name init

# 3. Seed database with sample data
bunx prisma db seed
```

---

## ✅ Verification

After running the commands, verify everything works:

```bash
# View your database
bunx prisma studio

# Start dev server
bun run dev
```

**Test login:**
- Go to: http://localhost:3000/auth/login
- Email: `user@temple.com`
- Password: `demo123`

---

## 📝 Example .env.local (Filled Out)

Here's what a properly configured `.env.local` should look like:

```env
# Database - YOUR ACTUAL SUPABASE CONNECTION STRING
DATABASE_URL="postgresql://postgres:MySecureP@ssw0rd123@db.xyzabcdefgh.supabase.co:5432/postgres"

# JWT Secrets - YOUR GENERATED SECRETS
JWT_SECRET="a3K8mN2pQ7rT9vW1xY4zA6bC8dE0fG2hI4jK6lM8nO0pQ2rS4tU6vW8xY0zA2"
JWT_REFRESH_SECRET="zX9yW8vU7tS6rQ5pO4nM3lK2jI1hG0fE9dC8bA7zA6yX5wV4uT3sR2qP1oN0"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"

# Security
BCRYPT_ROUNDS=12

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Payment Gateway (Leave empty for now)
RAZORPAY_KEY_ID=""
RAZORPAY_SECRET=""
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
```

---

## 🆘 Common Issues

### "Missing required environment variable: DATABASE_URL"
- Check that DATABASE_URL is on its own line
- No extra spaces before `DATABASE_URL=`
- No quotes around the variable name
- The entire connection string should be in quotes

### "Can't reach database server"
- Verify password is correct
- Check if special characters need URL encoding:
  - `@` → `%40`
  - `#` → `%23`
  - `$` → `%24`
  - `&` → `%26`
- Make sure Supabase project is active (green dot)

### "Password authentication failed"
- Double-check your database password
- Try copying connection string again from Supabase
- Make sure you replaced `[YOUR-PASSWORD]` with actual password

---

## 💡 Need Your Connection String?

### Quick Way to Get It:

1. **Supabase Dashboard URL:**
   ```
   https://supabase.com/dashboard/project/YOUR_PROJECT_ID/settings/database
   ```

2. **Look for these details:**
   - **Host:** `db.YOUR_PROJECT_ID.supabase.co`
   - **Database:** `postgres`
   - **Port:** `5432` (direct) or `6543` (pooled)
   - **User:** `postgres`
   - **Password:** The one you set when creating project

3. **Format:**
   ```
   postgresql://postgres:YOUR_PASSWORD@db.YOUR_PROJECT_ID.supabase.co:5432/postgres
   ```

---

## 🎯 Quick Checklist

- [ ] Opened Supabase dashboard
- [ ] Found database connection string
- [ ] Copied actual password and project ID
- [ ] Updated DATABASE_URL in .env.local
- [ ] Generated JWT secrets with OpenSSL
- [ ] Updated JWT_SECRET in .env.local
- [ ] Updated JWT_REFRESH_SECRET in .env.local
- [ ] Saved .env.local file
- [ ] Ran `bunx prisma generate`
- [ ] Ran `bunx prisma migrate dev --name init`
- [ ] Ran `bunx prisma db seed`
- [ ] Verified in Prisma Studio

---

**After completing these steps, let me know and I'll help you test everything!**

🕉️ **Almost there!**
