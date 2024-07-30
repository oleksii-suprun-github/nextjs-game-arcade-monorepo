import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getUserByClerkId } from '@utils/auth';
import { GamesList } from '@components';

export const metadata: Metadata = {
  title: 'Dashboard | OpenAI Game Arcade',
  description: 'Dashboard page for OpenAI Game Arcade',
};

const getEntries = async () => {
  const user = await getUserByClerkId();

  if (!user) {
    return { entries: [], user: null };
  }

  return { user };
};

const DashboardPage = async () => {
  const { user } = await getEntries();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-svh p-10">
      <GamesList />
    </div>
  );
};

export default DashboardPage;
