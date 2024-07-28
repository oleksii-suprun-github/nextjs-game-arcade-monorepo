import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
  '/new-user(.*)',
  '/dashboard(.*)',
]);

export const authMiddleware = () =>
  clerkMiddleware((auth, req) => {
    const userId = auth().userId;
    if (!userId && isProtectedRoute(req)) {
      return auth().redirectToSignIn();
    }
  });
