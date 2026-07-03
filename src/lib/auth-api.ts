import { NextRequest } from 'next/server';
import { verifyToken, TokenPayload } from './jwt';

export class AuthError extends Error {
  status: number;
  constructor(message: string, status: number = 401) {
    super(message);
    this.status = status;
    this.name = 'AuthError';
  }
}

export function getAuthenticatedUser(req: NextRequest): TokenPayload {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    throw new AuthError('Not authenticated', 401);
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    throw new AuthError('Invalid session token', 401);
  }

  return decoded;
}

export function requireRole(req: NextRequest, allowedRoles: string[]): TokenPayload {
  const user = getAuthenticatedUser(req);
  
  if (!allowedRoles.includes(user.role)) {
    throw new AuthError('Forbidden: insufficient permissions', 403);
  }

  return user;
}
