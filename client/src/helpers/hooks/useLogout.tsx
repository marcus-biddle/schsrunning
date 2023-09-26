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
    console.log(logout)
  return (
    <div>useLogout</div>
  )
}

export default useLogout