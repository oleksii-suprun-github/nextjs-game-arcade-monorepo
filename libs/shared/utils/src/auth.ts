import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import { auth } from '@clerk/nextjs/server';
import { Prisma } from '@prisma/client';
import { prisma } from './db';

export const getUserByClerkId = async () => {
  try {
    const { userId } = auth();

    if (!userId) {
      console.warn('User ID is not available. User might be signed out.');

      return null;
    }

    const user = await prisma.user.findFirstOrThrow({
      where: {
        clerkId: userId,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientValidationError) {
      console.error('Prisma validation error:', error.message);
      throw new Error('Failed to find user due to validation error.');
    } else if (error?.code === 'P2025') {
      console.error('User not found:', error?.message);
      throw new Error('User not found.');
    } else {
      if (isDynamicServerError(error)) {
        throw error;
      }

      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  }
};
