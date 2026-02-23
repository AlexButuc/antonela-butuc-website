'use client';

import { createContext, useContext, useEffect, useState } from 'react';

interface DemoUser {
  id: string;
  email: string;
}

interface AuthContextType {
  user: DemoUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export function useAuth() {
  return useContext(AuthContext);
}

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Demo mode: auto-login with a fake user
    const demoUser = {
      id: 'demo-user-123',
      email: 'demo@example.com',
    };
    
    // Check localStorage for existing session
    const storedUser = localStorage.getItem('demo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      localStorage.setItem('demo_user', JSON.stringify(demoUser));
      setUser(demoUser);
    }
    
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
