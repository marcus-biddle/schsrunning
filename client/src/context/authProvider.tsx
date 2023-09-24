import React, { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

// Define the type for the auth object
type AuthType = {
  username: string;
  password: string;
  roles: string[];
  accessToken: string;
};

// Define the type for the context
type AuthContextType = {
  auth: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType>>;
};

// Create the initial auth state
const initialAuth: AuthType = {
  username: '',
  password: '',
  roles: [''],
  accessToken: '',
};

// Create the AuthContext with initial values
export const AuthContext = createContext<AuthContextType>({
  auth: initialAuth,
  setAuth: () => {},
});

// AuthProvider component
export const AuthProvider = ({ children }: PropsWithChildren<{}>) => {
  const [auth, setAuth] = useState<AuthType>(initialAuth);

  // Log auth for debugging
  console.log('auth', auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

