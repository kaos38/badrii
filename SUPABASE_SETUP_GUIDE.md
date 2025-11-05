# Supabase Setup Guide - KuberJi Mandir

## Step-by-Step Setup

### 1. Create Supabase Account & Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with GitHub/Google/Email
4. Click "New Project"
5. Fill in:
   - **Name:** kuberji-mandir
   - **Database Password:** (Generate strong password - SAVE THIS!)
   - **Region:** Choose closest to you (e.g., Mumbai for India)
   - **Pricing Plan:** Free (Perfect for development)
6. Click "Create new project"
7. Wait 2-3 minutes for setup to complete

### 2. Get Database Connection String

1. In your Supabase project dashboard:
   - Click "Settings" (gear icon) in left sidebar
   - Click "Database"
   - Scroll to "Connection string" section
   - Select "URI" tab
   - Copy the connection string
   - It looks like: `postgresql://postgres:[YOUR-PASSWORD]@db.xxx.supabase.co:5432/postgres`

2. **Important:** Replace `[YOUR-PASSWORD]` with your actual database password

### 3. Configure Environment Variables

The connection string should be added to `.env.local` file in your project.

**Note:** The `.env.local` file is already in `.gitignore` so it won't be committed.

### 4. Generate JWT Secrets

You'll need to generate secure JWT secrets. Run these commands:

```bash
# Generate JWT_SECRET
openssl rand -base64 32

# Generate JWT_REFRESH_SECRET  
openssl rand -base64 32
```

Save both of these - you'll need them in the next step!

### 5. Example `.env.local` Configuration

```env
# Database (Replace with your Supabase connection string)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@db.xxx.supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"

# JWT Secrets (Use the ones you generated above)
JWT_SECRET="your_generated_jwt_secret_here"
JWT_REFRESH_SECRET="your_generated_refresh_secret_here"
JWT_EXPIRES_IN="7d"
JWT_REFRESH_EXPIRES_IN="30d"

# Security
BCRYPT_ROUNDS=12

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NODE_ENV="development"

# Optional - Payment Gateway (Add later)
RAZORPAY_KEY_ID=""
RAZORPAY_SECRET=""
NEXT_PUBLIC_RAZORPAY_KEY_ID=""
```

### 6. Run Prisma Migrations

After setting up `.env.local`, run these commands:

```bash
# 1. Generate Prisma Client
bunx prisma generate

# 2. Create and apply migrations
bunx prisma migrate dev --name init

# 3. (Optional) Open Prisma Studio to view database
bunx prisma studio
```

### 7. Verify Database Connection

Check your Supabase dashboard:
1. Go to "Table Editor" in left sidebar
2. You should see all your tables:
   - users
   - services
   - bookings
   - payments
   - livestreams
   - settings

### 8. Supabase Features You Can Use

**Free Tier Includes:**
- ✅ PostgreSQL database
- ✅ 500 MB database space
- ✅ Unlimited API requests
- ✅ 50,000 monthly active users
- ✅ Built-in auth (optional - we're using custom JWT)
- ✅ Real-time subscriptions
- ✅ Storage for files

**Dashboard Features:**
- 📊 SQL Editor - Run custom queries
- 📋 Table Editor - View/edit data visually
- 🔐 Database Settings - Manage connections
- 📈 Database Usage - Monitor resources
- 🔄 Backups - Automatic daily backups (paid plans)

### 9. Optional: Enable Supabase Row Level Security (RLS)

If you want extra security, you can enable RLS in Supabase:

1. Go to "Authentication" > "Policies"
2. Enable RLS for each table
3. Create policies for access control

**Note:** This is optional since we're using JWT authentication

### 10. Connection Pooling (Important for Production)

For production, use Supabase's connection pooling:

```env
# Development (Direct connection)
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"

# Production (Pooled connection - recommended)
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:6543/postgres?pgbouncer=true&connection_limit=1"
```

The pooled connection (port 6543) is better for serverless/edge environments.

## Troubleshooting

### Error: P1001 - Can't reach database
- Check if DATABASE_URL is correct
- Verify password has no special characters that need URL encoding
- Check Supabase project is active (green dot)

### Error: SSL required
Add to connection string: `?sslmode=require`

### Error: Too many connections
Use connection pooling (port 6543 instead of 5432)

### Can't see tables in Supabase
- Check if migrations ran successfully
- Look for errors in terminal
- Try: `bunx prisma db push` as alternative

## Security Best Practices

1. **Never commit `.env.local`** - Already in .gitignore
2. **Use strong database password** - At least 16 characters
3. **Rotate JWT secrets regularly** - Every 3-6 months
4. **Enable RLS in production** - Extra security layer
5. **Use connection pooling** - Better performance
6. **Enable SSL** - Always for production
7. **Regular backups** - Supabase provides this

## Monitoring & Maintenance

### Check Database Health
```bash
# View database metrics
# Go to Supabase Dashboard > Settings > Database

# Check connection count
# Go to Supabase Dashboard > Database > Connection pooling
```

### Database Backups
- Free tier: Point-in-time recovery (7 days)
- Paid tiers: Automated daily backups
- Manual backup: Use Supabase dashboard or `pg_dump`

### Upgrade Path
When you need more resources:
- **Pro Plan ($25/month):** 8GB database, daily backups
- **Team Plan:** Custom resources, dedicated support

## Next Steps

After database setup:
1. ✅ Test authentication endpoints
2. ✅ Create seed data (initial services)
3. ✅ Implement booking API
4. ✅ Add payment gateway
5. ✅ Deploy to production

---

**Supabase Dashboard:** https://supabase.com/dashboard/projects
**Supabase Docs:** https://supabase.com/docs
**Support:** https://supabase.com/support
