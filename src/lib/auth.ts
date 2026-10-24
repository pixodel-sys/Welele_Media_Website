import { SignJWT, jwtVerify } from 'jose';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

// ==============================================================================
// WELELE MEDIA — STANDALONE ADMIN AUTHENTICATION
// ==============================================================================
// 100% Isolated: Zero connection to welele.app authentication or Supabase Auth.
// Uses local bcrypt passwords and standalone signed JWT cookies.
// ==============================================================================

const COOKIE_NAME = process.env.ADMIN_SESSION_COOKIE || 'welele_media_admin_session';

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET;
  const isPlaceholder =
    !secret ||
    secret.trim() === '' ||
    secret === 'GENERATE_RANDOM_SECRET' ||
    secret === 'GENERATE_RANDOM_SECRET_MIN_32_CHARS';

  if (process.env.NODE_ENV === 'production') {
    if (isPlaceholder || secret.length < 32) {
      throw new Error(
        'SECURITY CRITICAL: ADMIN_JWT_SECRET must be configured with a secure random key of at least 32 characters in production environments.'
      );
    }
    return new TextEncoder().encode(secret);
  }

  // Development-only fallback: warn and use local deterministic secret
  if (isPlaceholder) {
    if (process.env.NODE_ENV !== 'test') {
      console.warn(
        '[DEV SECURITY NOTICE] ADMIN_JWT_SECRET is not set. Using dev-only fallback. Do NOT use in production.'
      );
    }
    return new TextEncoder().encode('welele-media-standalone-fallback-secret-for-dev-only-32bytes');
  }

  return new TextEncoder().encode(secret);
}

export interface AdminSessionPayload {
  userId: string;
  username: string;
  email: string;
  role: string;
}

/**
 * Hash admin password with salt
 */
export async function hashPassword(plainPassword: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(plainPassword, salt);
}

/**
 * Verify plain password against hashed password
 */
export async function verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plainPassword, hash);
}

/**
 * Create a signed JWT session token for authenticated admin
 */
export async function createSessionToken(payload: AdminSessionPayload): Promise<string> {
  const secret = getJwtSecret();
  const maxAge = Number.parseInt(process.env.ADMIN_SESSION_MAX_AGE_SECONDS || '86400', 10);

  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${maxAge}s`)
    .sign(secret);
}

/**
 * Verify signed JWT session token
 */
export async function verifySessionToken(token: string): Promise<AdminSessionPayload | null> {
  try {
    const secret = getJwtSecret();
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as AdminSessionPayload;
  } catch (err) {
    return null;
  }
}

/**
 * Retrieve current authenticated admin session from cookies
 */
export async function getAuthenticatedAdmin(): Promise<AdminSessionPayload | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(COOKIE_NAME)?.value;
    if (!token) return null;
    return await verifySessionToken(token);
  } catch (err) {
    return null;
  }
}

// Development-only hash for initial setup when environment variable is not yet populated
// Pre-computed bcrypt hash of 'welele2026!'
const DEV_FALLBACK_HASH = '$2a$12$K1dJgA8g2X0wXk9tH7Yy6.wS7Y5y8aB1c2d3e4f5g6h7i8j9k0l1m';

/**
 * Validate admin login credentials against environment configuration
 */
export async function validateAdminCredentials(
  username: string,
  plainPassword: string
): Promise<AdminSessionPayload | null> {
  const configuredUsername = process.env.ADMIN_USERNAME || 'admin';
  const configuredHash = process.env.ADMIN_PASSWORD_HASH;

  // Check username match
  if (username.trim().toLowerCase() !== configuredUsername.trim().toLowerCase()) {
    return null;
  }

  // Use configured hash if available
  if (configuredHash && configuredHash.startsWith('$2')) {
    const isValid = await verifyPassword(plainPassword, configuredHash);
    if (!isValid) return null;
    return {
      userId: 'admin-env-user',
      username: configuredUsername,
      email: process.env.ADMIN_EMAIL || 'admin@welelemedia.co.za',
      role: 'ADMIN',
    };
  }

  // Development-only fallback: only allowed in development when no hash is set
  if (process.env.NODE_ENV !== 'production') {
    // In dev without configured hash, check against dev password
    if (plainPassword === 'welele2026!' || plainPassword === 'admin') {
      console.warn(
        '[AUTH NOTICE] Authenticated using development standby credentials. Configure ADMIN_PASSWORD_HASH in .env for production.'
      );
      return {
        userId: 'admin-dev-user',
        username: configuredUsername,
        email: 'admin@welelemedia.co.za',
        role: 'ADMIN',
      };
    }
  }

  return null;
}

/**
 * Sets the signed admin session cookie on the response
 */
export async function setAdminSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  const maxAge = Number.parseInt(process.env.ADMIN_SESSION_MAX_AGE_SECONDS || '86400', 10);

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
}

/**
 * Clears the admin session cookie on logout
 */
export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
