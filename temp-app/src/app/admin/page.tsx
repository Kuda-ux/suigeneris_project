import { redirect } from 'next/navigation';
import { AdminLogin } from '@/components/admin/admin-login';

export default function AdminPage() {
  // In a real app, you'd check authentication here
  const isAuthenticated = false; // This would come from your auth system
  
  if (isAuthenticated) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50 to-gray-50 flex items-center justify-center p-4">
      <AdminLogin />
    </div>
  );
}
