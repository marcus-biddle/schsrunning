import { useAuth } from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();

    const logout = async () => {
        setAuth({
            username: '',
            password: '',
            roles: [''],
            accessToken: '',
          });
        
        //   try {
        //     // const response = await 
        //   }
    }
  return (
    <div>useLogout</div>
  )
}

export default useLogout