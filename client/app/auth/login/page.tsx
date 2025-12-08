'use client';

import { useSearchParams } from 'next/navigation';
import LoginForm from '@/src/features/user/auth/login/components/LoginForm';

export default function LoginPage() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') ?? '';

  return <LoginForm defaultEmail={email} />;
}
