# Supabase Connection Troubleshooting

## Issue: Can't reach database server

### Checklist:

1. **✅ Verify Supabase Project is Active**
   - Go to https://supabase.com/dashboard
   - Check if project has GREEN dot (active)
   - If PAUSED, click "Resume" or "Restore"

2. **✅ Check Password Format**
   - Special characters in password need URL encoding:
     - `@` becomes `%40`
     - `#` becomes `%23`
     - `$` becomes `%24`
     - `%` becomes `%25`
     - `&` becomes `%26`

3. **✅ Try Different Connection Strings**
   
   **Option A: Direct Connection (Port 5432)**
   ```
   postgresql://postgres:[PASSWORD]@db.PROJECT.supabase.co:5432/postgres
   ```
   
   **Option B: Transaction Pooling (Port 6543)** ⭐ Recommended
   ```
   postgresql://postgres.PROJECT:[PASSWORD]@aws-0-REGION.pooler.supabase.com:6543/postgres
   ```
   
   **Option C: With SSL Mode**
   ```
   postgresql://postgres:[PASSWORD]@db.PROJECT.supabase.co:5432/postgres?sslmode=require
   ```

4. **✅ Network/Firewall Issues**
   - Check if your network blocks PostgreSQL ports
   - Try from different network/location
   - Check corporate firewall settings

5. **✅ Use Prisma db push (Alternative)**
   If migrations fail, try:
   ```bash
   bunx prisma db push
   ```

## Quick Fix Steps:

### Step 1: Get correct connection string
```bash
# Go to Supabase Dashboard
# Settings → Database → Connection string
# Copy "Transaction pooling" or "URI"
```

### Step 2: Update .env.local
```bash
nano .env.local
# Update DATABASE_URL with correct string
```

### Step 3: Test connection
```bash
bunx prisma db push
```

### Step 4: Generate Client
```bash
bunx prisma generate
```

### Step 5: Seed database
```bash
bunx prisma db seed
```

## Alternative: Use Prisma Studio Remotely

If local connection fails, you can:
1. Deploy to Vercel/Railway
2. Use their environment to run migrations
3. Or use Supabase SQL Editor directly

## Contact Support

If still not working:
1. Check Supabase Status: https://status.supabase.com
2. Supabase Discord: https://discord.supabase.com
3. GitHub Issues: https://github.com/supabase/supabase
