import { prisma } from '@utils/db';
import { currentUser } from '@clerk/nextjs/server';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'New User Creation | OpenAI Game Arcade',
};

const createNewUser = async () => {
  const user = await currentUser();
  const match = await prisma.user.findUnique({ where: { clerkId: user?.id } });

  if (!match) {
    const now = new Date();
    const nextRenewalDate = new Date(now.setMonth(now.getMonth() + 1));

    await prisma.user.create({
      data: {
        clerkId: user?.id,
        email: user?.emailAddresses[0].emailAddress,
        gamesLimitRenewal: nextRenewalDate,
      },
    });
  }

  if (user) {
    redirect('/dashboard');
  }
};

const NewUserPage = async () => {
  await createNewUser();
};

export default NewUserPage;
