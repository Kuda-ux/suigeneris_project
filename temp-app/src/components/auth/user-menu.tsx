'use client';

import { useState, useRef, useEffect } from 'react';
import { User, LogOut, ShoppingBag, Heart, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import Image from 'next/image';
import Link from 'next/link';

export function UserMenu() {
  const { user, userProfile, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getDisplayName = () => {
    if (userProfile?.full_name) return userProfile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getInitials = () => {
    const name = getDisplayName();
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-full hover:from-red-700 hover:to-red-800 transition-all shadow-md hover:shadow-lg"
      >
        {userProfile?.avatar_url ? (
          <div className="relative w-6 h-6 rounded-full overflow-hidden">
            <Image
              src={userProfile.avatar_url}
              alt={getDisplayName()}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-6 h-6 rounded-full bg-white text-red-600 flex items-center justify-center text-xs font-black">
            {getInitials()}
          </div>
        )}
        <span className="font-semibold hidden md:inline">{getDisplayName()}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border-2 border-gray-100 overflow-hidden animate-in slide-in-from-top-2 duration-200 z-50">
          {/* User Info */}
          <div className="p-4 bg-gradient-to-r from-red-50 to-purple-50 border-b-2 border-gray-100">
            <div className="flex items-center gap-3">
              {userProfile?.avatar_url ? (
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white">
                  <Image
                    src={userProfile.avatar_url}
                    alt={getDisplayName()}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-600 to-purple-600 text-white flex items-center justify-center text-lg font-black ring-2 ring-white">
                  {getInitials()}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-900 truncate">{getDisplayName()}</p>
                <p className="text-sm text-gray-600 truncate">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link
              href="/orders"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-blue-50 rounded-xl transition-all group"
            >
              <ShoppingBag className="h-5 w-5 text-gray-600 group-hover:text-blue-600" />
              <span className="font-semibold text-gray-900 group-hover:text-blue-600">My Orders</span>
            </Link>

            <Link
              href="/wishlist"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-pink-50 rounded-xl transition-all group"
            >
              <Heart className="h-5 w-5 text-gray-600 group-hover:text-pink-600" />
              <span className="font-semibold text-gray-900 group-hover:text-pink-600">Wishlist</span>
            </Link>

            <Link
              href="/account"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-4 py-3 hover:bg-purple-50 rounded-xl transition-all group"
            >
              <Settings className="h-5 w-5 text-gray-600 group-hover:text-purple-600" />
              <span className="font-semibold text-gray-900 group-hover:text-purple-600">Account Settings</span>
            </Link>

            <div className="border-t-2 border-gray-100 my-2"></div>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-xl transition-all group"
            >
              <LogOut className="h-5 w-5 text-gray-600 group-hover:text-red-600" />
              <span className="font-semibold text-gray-900 group-hover:text-red-600">Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
