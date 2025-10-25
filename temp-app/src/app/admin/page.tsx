'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth-context';

export default function AdminPage() {
  const router = useRouter();
  const { user, userProfile, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      // If user is authenticated and is admin, redirect to dashboard
      if (user && userProfile?.is_admin) {
        router.push('/admin/dashboard');
      } else if (user && !userProfile?.is_admin) {
        // User is authenticated but not admin
        alert('Access Denied: Admin privileges required');
        router.push('/');
      } else {
        // User is not authenticated
        router.push('/');
      }
    }
  }, [user, userProfile, loading, router]);

  // Show loading state
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-red-600 mx-auto mb-4"></div>
        <p className="text-gray-600 font-semibold">Checking access...</p>
      </div>
    </div>
  );
}
