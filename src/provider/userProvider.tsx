// useProviderContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/db';
import { findUser } from './action/providerAction';

interface ProviderContextProps {
    currentUser: User | null;
    userData: any;
}

const ProviderContext = createContext<ProviderContextProps | undefined>(undefined);

export const useUserProvider = () => {
    const context = useContext(ProviderContext);
    if (!context) {
        throw new Error("useProvider must be used within a UserProvider");
    }
    return context;
};

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                const dbUser = await findUser(user.uid);

                setUserData(dbUser);
            } else {
                setUserData(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const value: ProviderContextProps = {
        currentUser,
        userData,
    };

    return (
        <ProviderContext.Provider value={value}>
            {children}
        </ProviderContext.Provider>
    );
};
