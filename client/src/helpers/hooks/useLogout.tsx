import { privateAxiosInstance } from "../../api/config/axios";
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
        
          try {
            await privateAxiosInstance('/logout')
          } catch (err) {
            console.error(err)
          }
    }
    console.log(logout)
  return logout
}

export default useLogout