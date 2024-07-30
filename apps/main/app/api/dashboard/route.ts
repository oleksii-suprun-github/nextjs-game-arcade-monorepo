import { NextResponse } from 'next/server';
import { update } from '@utils/actions';
import { getUserByClerkId } from '@utils/auth';
import { prisma } from '@utils/db';
import { isDynamicServerError } from 'next/dist/client/components/hooks-server-context';

export const POST = async (request: Request) => {
  const { content } = await request.json();
  const user = await getUserByClerkId();

  if (!user) {
    return NextResponse.json({ message: 'User not found' }, { status: 401 });
  }

  try {
    const entry = await prisma.journalEntry.create({
      data: {
        userId: user.id,
        content,
      },
    });

    update(['/dashboard']);

    return NextResponse.json({ data: entry });
  } catch (error) {
    if (isDynamicServerError(error)) {
      throw error;
    }

    console.error('Error processing POST request:', error);

    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
};
