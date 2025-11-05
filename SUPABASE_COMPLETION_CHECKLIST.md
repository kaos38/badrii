# ✅ Supabase Setup Completion Checklist

**Current Status:** 70% Complete (Schema ready, needs configuration & execution)

---

## 📋 What's Already Done

- ✅ Database schema created (`prisma/schema.prisma`)
- ✅ Authentication system implemented
- ✅ Seed data script ready (`prisma/seed.js`)
- ✅ Comprehensive documentation created
- ✅ `.env.local` template created

---

## 🚀 What You Need To Do Next

### Step 1: Create Supabase Account & Project (5 minutes)

1. **Go to Supabase:**
   - Visit: https://supabase.com
   - Click "Start your project" → Sign up (GitHub/Google/Email)

2. **Create New Project:**
   - Click "New Project"
   - **Name:** `kuberji-mandir`
   - **Database Password:** Generate a strong password
   - **⚠️ SAVE THIS PASSWORD!** You'll need it in the next step
   - **Region:** Choose closest to your location (e.g., Mumbai for India)
   - **Plan:** Free tier is perfect for development
   - Click "Create new project"

3. **Wait for Setup:**
   - Takes 2-3 minutes
   - Green indicator means it's ready

---

### Step 2: Get Database Connection String (2 minutes)

1. **In Supabase Dashboard:**
   - Click **"Settings"** (gear icon) in left sidebar
   - Click **"Database"**
   - Scroll to **"Connection string"** section
   - Click **"URI"** tab

2. **Copy Connection String:**
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres
   ```

3. **Replace `[YOUR-PASSWORD]`:**
   - Use the database password you saved in Step 1
   - If password has special characters, URL encode them:
     - `@` → `%40`
     - `#` → `%23`
     - `$` → `%24`
     - `%` → `%25`
     - `&` → `%26`

---

### Step 3: Configure Environment Variables (3 minutes)

1. **Open `.env.local` file** (created in your repo)

2. **Update DATABASE_URL:**
   ```env
   DATABASE_URL="postgresql://postgres:YOUR_ACTUAL_PASSWORD@db.xxx.supabase.co:5432/postgres"
   ```
   Replace the placeholder with your actual connection string

3. **Generate JWT Secrets:**
   
   Open terminal and run:
   ```bash
   # Generate first secret
   openssl rand -base64 32
   
   # Generate second secret
   openssl rand -base64 32
   ```

4. **Update JWT Secrets in `.env.local`:**
   ```env
   JWT_SECRET="paste_first_generated_secret_here"
   JWT_REFRESH_SECRET="paste_second_generated_secret_here"
   ```

5. **Save the file**

---

### Step 4: Initialize Database (3 minutes)

Run these commands in your terminal:

```bash
# 1. Generate Prisma Client
bunx prisma generate

# 2. Create database tables (migrations)
bunx prisma migrate dev --name init

# 3. Seed database with sample data
bunx prisma db seed
```

**Expected Output:**
```
✅ Admin user created: admin@kuberjitemple.org
✅ Demo user created: user@temple.com
✅ Service created: Morning Aarti
✅ Service created: Evening Aarti
... (6 more services)
✅ Livestream created: Daily Morning Aarti - Live
✅ Livestream created: Evening Aarti - Live Stream
✅ Settings created

✨ Database seed completed successfully!
```

---

### Step 5: Verify Setup (2 minutes)

1. **View Database in Prisma Studio:**
   ```bash
   bunx prisma studio
   ```
   Opens at: http://localhost:5555
   
   **Check that you see:**
   - 2 users
   - 8 services
   - 2 livestreams
   - 3 settings

2. **OR View in Supabase Dashboard:**
   - Go to Supabase Dashboard
   - Click "Table Editor"
   - You should see tables: users, services, bookings, payments, livestreams, settings

3. **Test Authentication:**
   ```bash
   # Start dev server
   bun run dev
   
   # In another terminal, test login
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
       "name": "Demo User",
       "email": "user@temple.com",
       "role": "USER"
     }
   }
   ```

---

## 🎉 Success Criteria

You'll know setup is complete when:

- ✅ No errors when running `bunx prisma generate`
- ✅ Migrations complete successfully
- ✅ Seed script runs without errors
- ✅ Can see data in Prisma Studio or Supabase Dashboard
- ✅ Login API test returns successful response
- ✅ Dev server starts without database errors

---

## 🔥 Quick Setup (Automated)

If you want to use the automated script:

```bash
# Make it executable
chmod +x setup-database.sh

# Run the script
./setup-database.sh
```

The script will:
1. Check for `.env.local`
2. Generate JWT secrets for you
3. Run Prisma generate
4. Run migrations
5. Seed database
6. Show test accounts

---

## 🧪 Test Accounts (After Seeding)

| Role  | Email                      | Password  |
|-------|----------------------------|-----------|
| Admin | admin@kuberjitemple.org    | admin123  |
| User  | user@temple.com            | demo123   |

---

## 📊 What Gets Created

### Users (2)
- Admin account with full privileges
- Demo user account for testing

### Services (8)
1. Morning Aarti - ₹501
2. Evening Aarti - ₹501
3. Abhishekam Pooja - ₹1,100
4. Kuber Yantra Pooja - ₹2,100
5. Rudrabhishek - ₹2,500
6. Maha Aarti - ₹5,100
7. Lakshmi-Kuber Pooja - ₹3,100
8. Special Prasad Seva - ₹751

### Livestreams (2)
- Daily Morning Aarti (scheduled for tomorrow 6:00 AM)
- Evening Aarti (scheduled for tomorrow 7:00 PM)

### Settings (3)
- Temple open time: 06:00
- Temple close time: 21:00
- Bookings enabled: true

---

## 🐛 Troubleshooting

### Problem: "Can't reach database server"

**Solutions:**
1. Check if DATABASE_URL is correct in `.env.local`
2. Verify Supabase project has GREEN dot (active)
3. Try connection pooling URL (port 6543):
   ```
   postgresql://postgres:PASSWORD@db.xxx.supabase.co:6543/postgres?pgbouncer=true
   ```

### Problem: "Password authentication failed"

**Solutions:**
1. Check password is correct
2. URL encode special characters in password
3. Regenerate connection string from Supabase

### Problem: Migration fails

**Solutions:**
```bash
# Alternative: Push schema directly
bunx prisma db push

# This skips migration files but creates tables
```

### Problem: Seed fails

**Solutions:**
1. Make sure migrations completed first
2. Check if bcryptjs is installed: `bun add bcryptjs`
3. Run manually: `node prisma/seed.js`

---

## 📚 Additional Resources

- **Detailed Guide:** `SUPABASE_SETUP_GUIDE.md`
- **Troubleshooting:** `SUPABASE_TROUBLESHOOTING.md`
- **Backend Docs:** `BACKEND_SETUP_README.md`
- **Quick Start:** `QUICK_START.md`
- **Supabase Docs:** https://supabase.com/docs
- **Prisma Docs:** https://www.prisma.io/docs

---

## 🎯 Next Steps After Setup

Once database is ready, you can:

1. **Test Authentication:**
   - Visit http://localhost:3000/auth/login
   - Login with demo accounts

2. **View Data:**
   - Run `bunx prisma studio`
   - Open Supabase Table Editor

3. **Continue Development:**
   - Implement booking API
   - Add payment gateway
   - Build user profile pages

4. **Deploy to Production:**
   - Set up production database
   - Configure environment variables
   - Deploy to Vercel/Railway/etc.

---

## 💡 Pro Tips

1. **Keep your database password safe** - Store in password manager
2. **Use connection pooling in production** - Better performance
3. **Regular backups** - Supabase provides automatic backups
4. **Monitor usage** - Check Supabase dashboard regularly
5. **Version control migrations** - Commit migration files to Git

---

## 🔐 Security Reminders

- ✅ `.env.local` is in `.gitignore` (never commit secrets)
- ✅ Use strong passwords (16+ characters)
- ✅ Unique JWT secrets for each environment
- ✅ HTTPS in production
- ✅ Regular password rotation

---

**Status After Completion:** 100% Complete ✅

**Estimated Time:** 15-20 minutes

**Last Updated:** October 2024
