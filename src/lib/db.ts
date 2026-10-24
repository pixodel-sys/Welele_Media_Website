import { PrismaClient } from '@prisma/client';

// ==============================================================================
// WELELE MEDIA — STANDALONE PRISMA DATABASE CLIENT
// ==============================================================================
// 100% Isolated: Dedicated PostgreSQL database.
// Zero connection to welele.app Supabase instance.
// ==============================================================================

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
