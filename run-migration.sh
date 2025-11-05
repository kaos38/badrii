#!/bin/bash
export DATABASE_URL="postgresql://postgres.hnjckwzwjeafhhtywcnr:KARTIKPANWAr12345@aws-1-ap-south-1.pooler.supabase.com:6543/postgres"
export JWT_SECRET="7siHrFaTMZF85bGAzFuTDZErIzGTu76i9YNAD0wRhtk="
export JWT_REFRESH_SECRET="vGZKF277gDjEYoGdvieuoYgWm+fjrzqKazpysOjuD1Y="

echo "Running migrations..."
bunx prisma migrate dev --name init
