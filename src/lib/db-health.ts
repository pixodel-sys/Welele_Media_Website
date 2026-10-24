// ==============================================================================
// WELELE MEDIA — DATABASE & SYSTEM HEALTH SERVICE (Stage D)
// ==============================================================================
// Detects whether the CMS is in Live PostgreSQL Mode or Standby / Inspection Mode.
// Never crashes: safe timeouts, zero exceptions thrown to caller.
// ==============================================================================

import { db } from './db';

export type CmsMode = 'LIVE' | 'STANDBY';

export interface DatabaseHealthStatus {
  mode: CmsMode;
  isConfigured: boolean;
  isConnected: boolean;
  message: string;
  checkedAt: string;
}

// In-memory cache to avoid repeated DB probes within a short window (15s)
let cachedStatus: DatabaseHealthStatus | null = null;
let lastCheckTime = 0;
const CACHE_TTL_MS = 15000;

/**
 * Checks database connection health safely.
 * Returns STANDBY if DATABASE_URL is not set or if PostgreSQL is unreachable.
 */
export async function getDatabaseHealth(forceFresh = false): Promise<DatabaseHealthStatus> {
  const now = Date.now();
  if (!forceFresh && cachedStatus && now - lastCheckTime < CACHE_TTL_MS) {
    return cachedStatus;
  }

  const databaseUrl = process.env.DATABASE_URL;

  // Mode B: Standby Mode (Database not configured)
  if (!databaseUrl || databaseUrl.trim() === '' || databaseUrl.includes('DB_USER:DB_PASSWORD')) {
    cachedStatus = {
      mode: 'STANDBY',
      isConfigured: false,
      isConnected: false,
      message: 'Database not configured. CMS is running in Standby / Inspection Mode.',
      checkedAt: new Date().toISOString(),
    };
    lastCheckTime = now;
    return cachedStatus;
  }

  // Attempt non-blocking probe with a strict 2-second timeout
  try {
    const probePromise = db.$queryRaw`SELECT 1 as healthy`;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Connection probe timed out')), 2000)
    );

    await Promise.race([probePromise, timeoutPromise]);

    cachedStatus = {
      mode: 'LIVE',
      isConfigured: true,
      isConnected: true,
      message: 'PostgreSQL connected. Live content management enabled.',
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    // Mode B: Standby Mode (Database configured but offline / unreachable)
    cachedStatus = {
      mode: 'STANDBY',
      isConfigured: true,
      isConnected: false,
      message: 'Database configured but currently unreachable. CMS has entered Standby Mode.',
      checkedAt: new Date().toISOString(),
    };
  }

  lastCheckTime = now;
  return cachedStatus;
}
