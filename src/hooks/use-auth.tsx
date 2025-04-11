
import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '@/lib/auth-types';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock authentication functions - will be replaced with Supabase
  useEffect(() => {
    // Check if user is stored in localStorage
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    // This will be replaced with actual Supabase authentication
    console.log('Sign up', { email, password, name });
    const newUser: AuthUser = {
      id: 'user_' + Date.now(),
      email,
      name,
      role: 'member',
    };
    
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const signIn = async (email: string, password: string) => {
    // This will be replaced with actual Supabase authentication
    console.log('Sign in', { email, password });
    const newUser: AuthUser = {
      id: 'user_' + Date.now(),
      email,
      name: email.split('@')[0],
      role: 'member',
    };
    
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const signOut = async () => {
    // This will be replaced with actual Supabase authentication
    localStorage.removeItem('auth_user');
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    // This will be replaced with actual Supabase authentication
    console.log('Reset password for', email);
  };

  const updateProfile = async (data: Partial<AuthUser>) => {
    // This will be replaced with actual Supabase authentication
    if (!user) return;
    
    const updatedUser = { ...user, ...data };
    localStorage.setItem('auth_user', JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    // This will be replaced with actual Supabase authentication
    console.log('Update password', { currentPassword, newPassword });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signUp,
        signIn,
        signOut,
        resetPassword,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
