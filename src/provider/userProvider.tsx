"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/db';
import { fetchUserData } from '@/app/action/userAction';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

interface User {
  id: string;
  idFirebase: string;
  nom: string | null;
  prenom: string | null;
  email: string | null;
  image: string | null;
  adresse: string | null;
  codePostal: string | null;
  ville: string | null;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

interface ProviderContextProps {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  setUserAndCookie: (user: User | null) => void;
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

  const setUserAndCookie = (user: User | null) => {
    setCurrentUser(user);
    if (user) {
      setCookie('currentUser', JSON.stringify(user));
    } else {
      deleteCookie('currentUser');
    }
  };

  useEffect(() => {
    const storedUser = getCookie('currentUser');

    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser as string));
      setLoading(false);
    } else {
      const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const userData = await fetchUserData(firebaseUser.uid);
          setUserAndCookie(userData);
        } else {
          setUserAndCookie(null);
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, []);

  const value: ProviderContextProps = {
    currentUser,
    setCurrentUser: setUserAndCookie,
    setUserAndCookie,
  };

  return (
    <ProviderContext.Provider value={value}>
      {!loading && children}
    </ProviderContext.Provider>
  );
};
