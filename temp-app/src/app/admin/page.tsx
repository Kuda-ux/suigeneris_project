'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Immediately redirect to dashboard
    // The dashboard will handle authentication
    router.push('/admin/dashboard');
  }, [router]);

  // Show loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Redirecting to dashboard...</p>
      </div>
    </div>
  );
}
