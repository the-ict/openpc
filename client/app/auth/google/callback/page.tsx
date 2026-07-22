"use client";

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import user_store from '@/src/shared/store/user.store';

function GoogleCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken } = user_store.getState();

  useEffect(() => {
    const token = searchParams.get('token');
    const refreshToken = searchParams.get('refresh_token');

    if (token) {
      setToken(token);
      if (refreshToken) {
        localStorage.setItem('refresh_token', refreshToken);
      }
      router.push('/session');
    } else {
      router.push('/login');
    }
  }, [searchParams, router]);

  return (
    <div className="h-screen w-screen bg-[#0A0A0A] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4E728] mx-auto mb-4"></div>
        <p>Tizimga kirilmoqda...</p>
      </div>
    </div>
  );
}

export default function GoogleCallbackPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen bg-[#0A0A0A] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E4E728] mx-auto mb-4"></div>
          <p>Tizimga kirilmoqda...</p>
        </div>
      </div>
    }>
      <GoogleCallbackContent />
    </Suspense>
  );
}
