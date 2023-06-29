import React, { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

type AuthContextType = {
  auth: object,
  setAuth: Dispatch<SetStateAction<object>>,
};

export const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => null,
});

const AuthProvider= ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
