'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  userProfile: UserProfile | null;
}

interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const router = useRouter();

  // Fetch user profile from database - optimized for speed
  const fetchUserProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      // Cast to any to bypass strict Supabase types (table schema not in generated types)
      const { data, error } = await (supabase as any)
        .from('users')
        .select('id, email, full_name, avatar_url, is_admin, created_at, updated_at')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }
      
      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Create or update user profile - optimized with single query
  const upsertUserProfile = async (user: User) => {
    try {
      // Single optimized query - try to fetch first (most common case)
      const profile = await fetchUserProfile(user.id);
      
      if (profile) {
        setUserProfile(profile);
        return;
      }
      
      // User doesn't exist, create new profile with insert
      // Cast to any to bypass strict Supabase types (table schema not in generated types)
      const { data: newUser, error: insertError } = await (supabase as any)
        .from('users')
        .insert({
          id: user.id,
          email: user.email!,
          full_name: user.user_metadata?.full_name || user.user_metadata?.name || null,
          avatar_url: user.user_metadata?.avatar_url || user.user_metadata?.picture || null,
          is_admin: false,
          role: 'customer',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select('id, email, full_name, avatar_url, is_admin, created_at, updated_at')
        .single();

      if (insertError) {
        // If insert fails (user might already exist due to race condition), try fetch again
        console.error('Error inserting user:', insertError);
        const retryProfile = await fetchUserProfile(user.id);
        setUserProfile(retryProfile);
      } else {
        setUserProfile(newUser as UserProfile);
      }
    } catch (error) {
      console.error('Error upserting user profile:', error);
      setUserProfile(null);
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    // Get initial session - optimized for speed
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!isMounted) return;
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Load profile in parallel, don't block
          upsertUserProfile(session.user);
        } else {
          setUserProfile(null);
        }
        
        // Set loading false immediately after session check
        setLoading(false);
      } catch (error) {
        console.error('Auth init error:', error);
        if (isMounted) setLoading(false);
      }
    };
    
    initAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (!isMounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Load profile without blocking
        upsertUserProfile(session.user);
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    try {
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        throw new Error('Authentication service is not properly configured. Please contact support.');
      }

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Provide user-friendly error messages
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
        }
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please try again.');
        }
        throw error;
      }
    } catch (error: any) {
      console.error('Error signing in with email:', error);
      // Re-throw with user-friendly message if it's a network error
      if (error.message?.includes('Failed to fetch') || error.name === 'AuthRetryableFetchError') {
        throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
      }
      throw error;
    }
  };

  const signUpWithEmail = async (email: string, password: string, fullName: string) => {
    try {
      // Check if Supabase is properly configured
      if (!isSupabaseConfigured()) {
        throw new Error('Authentication service is not properly configured. Please contact support.');
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        // Provide user-friendly error messages
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
        }
        if (error.message.includes('already registered')) {
          throw new Error('This email is already registered. Please sign in instead.');
        }
        throw error;
      }

      // Check if email confirmation is required
      if (data?.user && !data.session) {
        throw new Error('Please check your email to confirm your account before signing in.');
      }
    } catch (error: any) {
      console.error('Error signing up with email:', error);
      // Re-throw with user-friendly message if it's a network error
      if (error.message?.includes('Failed to fetch') || error.name === 'AuthRetryableFetchError') {
        throw new Error('Unable to connect to authentication service. Please check your internet connection and try again.');
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUserProfile(null);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    signOut,
    userProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
