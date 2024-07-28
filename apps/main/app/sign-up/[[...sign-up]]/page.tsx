import { Metadata } from 'next';
import { SignUp } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: 'Sign Up | OpenAI Game Arcade',
  description: 'Sign up page for OpenAI Game Arcade',
};

function SignUpPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center">
      <SignUp />
    </div>
  );
}
export default SignUpPage;
