import { refreshTokenActions } from "../../api/Auth/refresh";
import {useAuth} from "./useAuth";

export const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await refreshTokenActions.findRefreshToken();
        setAuth(prev => {
            console.log('useRefreshToken', JSON.stringify(prev));
            console.log('useRefreshToken', response.data.accessToken);
            return { 
                ...prev, 
                roles: response.data.roles,
                accessToken: response.data.accessToken 
            };
        });
        
        return response.data.accessToken
    }

  return refresh;
};