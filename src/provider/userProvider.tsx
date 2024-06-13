"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/db';

interface ProviderContextProps {
  currentUser: {} | null;
  setCurrentUser: (user: any | null) => void;
}

const ProviderContext = createContext<ProviderContextProps | undefined>(undefined);

export const useUserProvider = () => {
  const context = useContext(ProviderContext);
  if (!context) {
    throw new Error("useUserProvider must be used within a UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value: ProviderContextProps = {
    currentUser,
    setCurrentUser,
  };

  return (
    <ProviderContext.Provider value={value}>
      {!loading && children}
    </ProviderContext.Provider>
  );
};
