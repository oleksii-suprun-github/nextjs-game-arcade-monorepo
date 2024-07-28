import { Metadata } from 'next';
import { SignIn } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign In | OpenAI Game Arcade',
  description: 'Sign in page for OpenAI Game Arcade',
};

function SignInPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <SignIn />
    </div>
  );
}
export default SignInPage;
