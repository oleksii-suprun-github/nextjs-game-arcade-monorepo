import { NextResponse } from 'next/server';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';
import { getUserByClerkId } from '@utils/auth';
import { prisma } from '@utils/db';

export const PATCH = async (_request: Request) => {
  const user = await getUserByClerkId();

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  }

  try {
    // Fetch the current value of gamesPlayed
    const currentUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { gamesPlayed: true },
    });

    if (!currentUser) {
      return NextResponse.json({ message: 'User not found in database' }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { gamesPlayed: currentUser.gamesPlayed + 1 },
    });

    return NextResponse.json({ message: 'User updated successfully' });
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }

    console.error('Error processing PATCH request:', error);

    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
};
