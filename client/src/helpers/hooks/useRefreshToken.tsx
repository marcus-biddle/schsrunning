import { refreshTokenActions } from "../../api/Auth/refresh";
import {useAuth} from "./useAuth";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    

    const refresh = async () => {
        const response = await refreshTokenActions.findRefreshToken();
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev, accessToken: response.data.accessToken };
        });
        return response.data.accessToken
    }

    console.log('useRefreshToken', refresh)

  return refresh;
}

export default useRefreshToken