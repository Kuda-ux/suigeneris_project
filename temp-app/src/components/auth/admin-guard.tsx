'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { Shield, AlertTriangle } from 'lucide-react';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in - redirect to home
        router.push('/');
      } else if (userProfile && !userProfile.is_admin) {
        // Logged in but not admin - redirect to home
        router.push('/');
      }
    }
  }, [user, userProfile, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Show unauthorized if not logged in
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-purple-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please sign in to access this page.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl font-bold hover:from-red-700 hover:to-purple-700 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // Show unauthorized if not admin
  if (userProfile && !userProfile.is_admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-purple-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Admin Access Required</h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin portal.
          </p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-purple-600 text-white rounded-xl font-bold hover:from-red-700 hover:to-purple-700 transition-all"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  // User is admin - show content
  return <>{children}</>;
}
