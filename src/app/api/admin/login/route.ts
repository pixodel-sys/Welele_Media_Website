import { NextResponse } from 'next/server';
import {
  validateAdminCredentials,
  createSessionToken,
  setAdminSessionCookie,
} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required.' },
        { status: 400 }
      );
    }

    const admin = await validateAdminCredentials(username, password);

    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid username or password.' },
        { status: 401 }
      );
    }

    // Create session token and set secure HTTP-only cookie
    const token = await createSessionToken(admin);
    await setAdminSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        username: admin.username,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication.' },
      { status: 500 }
    );
  }
}
