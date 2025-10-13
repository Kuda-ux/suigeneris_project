import { redirect } from 'next/navigation';
import { AdminLogin } from '@/components/admin/admin-login';

export default function AdminPage() {
  // In a real app, you'd check authentication here
  const isAuthenticated = false; // This would come from your auth system
  
  if (isAuthenticated) {
    redirect('/admin/dashboard');
  }

  return (
    <div className="min-h-screen bg-sg-gray-50 flex items-center justify-center">
      <AdminLogin />
    </div>
  );
}
