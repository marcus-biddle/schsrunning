import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from 'react';

type AuthContextType = {
  auth: object,
  setAuth: Dispatch<SetStateAction<object>>,
};

// type UserProps = {
//   username: string,
//   password: string,
//   secretKey: string
// }

// export const useAuth = () => {
//   const [authed, setAuthed] = useState<UserProps | undefined>();

//   return {
//     authed,
//     login(user: UserProps) {
//       return new Promise(() => {
//         setAuthed(user);
//       })
//     },
//     logout(user: UserProps) {
//       return new Promise(() => {
//         setAuthed(undefined);
//       })
//     }
//   }
// }

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
