'use client';
import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { LoginPage } from './LoginPage';
import GoogleProvider from "next-auth/providers/google";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  // 소셜 로그인(구글)
  const handleSocialLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signIn('google', { callbackUrl: '/mainpage' });
    } catch (e) {
      setError('소셜 로그인 실패');
    }
    setIsLoading(false);
  };

  // 이메일 로그인(NextAuth Credentials 등)
  const handleEmailLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError('');
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });
      if (res?.ok) {
        router.push('/mainpage');
      } else {
        setError('이메일 로그인 실패');
      }
    } catch (e) {
      setError('이메일 로그인 실패');
    }
    setIsLoading(false);
  };

  return (
    <LoginPage
      onSocialLogin={handleSocialLogin}
      onEmailLogin={handleEmailLogin}
      isLoading={isLoading}
      error={error}
    />
  );
} 