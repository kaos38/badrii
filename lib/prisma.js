// Prisma Client Instance
// Singleton pattern to prevent multiple instances in development

import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis;

// Check if DATABASE_URL is set
const isDatabaseConfigured = () => {
  return !!process.env.DATABASE_URL;
};

// Create Prisma client only if database is configured
let prisma;

if (isDatabaseConfigured()) {
  prisma = globalForPrisma.prisma || new PrismaClient({
    log: process.env.NODE_ENV === 'development'
      ? ['query', 'error', 'warn']
      : ['error'],
  });

  if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
  }

  // Graceful shutdown
  process.on('beforeExit', async () => {
    await prisma.$disconnect();
  });
} else {
  // Create a mock prisma client that throws helpful errors
  prisma = new Proxy({}, {
    get: (target, prop) => {
      return () => {
        throw new Error('Database not configured. Please set DATABASE_URL environment variable.');
      };
    }
  });
}

export { prisma, isDatabaseConfigured };
export default prisma;
