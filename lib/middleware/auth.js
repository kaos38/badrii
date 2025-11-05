// Authentication Middleware
import { NextResponse } from 'next/server';
import { verifyAccessToken } from '@/lib/jwt';
import prisma from '@/lib/prisma';

// Verify authentication from request cookies
export async function verifyAuth(request) {
  try {
    // Get token from cookies
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return { authenticated: false, user: null };
    }

    // Verify token
    const decoded = verifyAccessToken(accessToken);
    if (!decoded) {
      return { authenticated: false, user: null };
    }

    // Get user from database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        language: true,
      },
    });

    if (!user) {
      return { authenticated: false, user: null };
    }

    return { authenticated: true, user };
  } catch (error) {
    console.error('Auth verification error:', error);
    return { authenticated: false, user: null };
  }
}

// Middleware wrapper for protected routes
export function withAuth(handler, options = {}) {
  return async (request, context) => {
    const auth = await verifyAuth(request);

    if (!auth.authenticated) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check role if specified
    if (options.roles && !options.roles.includes(auth.user.role)) {
      return NextResponse.json(
        { success: false, error: 'Forbidden - Insufficient permissions' },
        { status: 403 }
      );
    }

    // Attach user to request
    request.user = auth.user;

    // Call the actual handler
    return handler(request, context);
  };
}

// Admin-only middleware
export function withAdmin(handler) {
  return withAuth(handler, { roles: ['ADMIN'] });
}
