import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@utils/db';

async function handlePostRequest(request: NextRequest) {
  const authHeader = request.headers.get('Authorization');

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    const now = new Date();

    const usersToUpdate = await prisma.user.findMany({
      where: {
        gamesLimitRenewal: {
          lte: now,
        },
      },
    });

    if (usersToUpdate.length === 0) {
      return NextResponse.json({ message: 'No users found for update.' });
    }

    const updateUsers = async (users: any[]) => {
      const updatePromises = users.map((user) =>
        prisma.user.update({
          where: { id: user.id },
          data: {
            gamesPlayed: 0,
            gamesLimitRenewal: new Date(
              user.gamesLimitRenewal.setMonth(user.gamesLimitRenewal.getMonth() + 1),
            ),
          },
        }),
      );

      await Promise.all(updatePromises);
    };

    await updateUsers(usersToUpdate);

    return NextResponse.json({ message: 'Prompt symbols used reset for applicable users.' });
  } catch (error) {
    console.error('Error resetting prompt symbols used:', error);

    return NextResponse.json({ message: 'Failed to reset prompt symbols used.' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function GET(request: NextRequest) {
  return handlePostRequest(request);
}
