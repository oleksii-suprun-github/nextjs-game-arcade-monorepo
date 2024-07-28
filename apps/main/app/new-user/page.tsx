import { prisma } from '@utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'New User Creation | OpenAI Game Arcade',
};

const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({ where: { clerkId: user?.id as string } });

  if (!match) {
    const now = new Date();
    const nextRenewalDate = new Date(now.setMonth(now.getMonth() + 1));

    await prisma.user.create({
      data: {
        clerkId: user?.id as string,
        email: user?.emailAddresses[0].emailAddress as string,
        gamesLimitRenewal: nextRenewalDate as Date,
      },
    });
  }

  if (user) {
    redirect('/dashboard');
  }
};

const NewUserPage = async () => {
  await createNewUser();
  return <></>;
};

export default NewUserPage;
