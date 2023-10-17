import { useEffect } from "react";
import { privateAxiosInstance } from '../../api/config/axios';
import { useAuth } from "./useAuth";
import { useRefreshToken } from "./useRefreshToken";

export const usePrivateApi = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    useEffect(() => {

        const requestIntercept = privateAxiosInstance.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        
        const responseIntercept = privateAxiosInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return privateAxiosInstance(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            privateAxiosInstance.interceptors.request.eject(requestIntercept);
            privateAxiosInstance.interceptors.response.eject(responseIntercept);
        }
    }, [auth, refresh])

    return privateAxiosInstance;
}

export const useAxios = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();

    privateAxiosInstance.interceptors.request.use(async req => {
        if (!req.headers.Authorization) {
            req.headers.Authorization = `Bearer ${auth?.accessToken}`;
        }

        const newAccessToken = await refresh();
        req.headers.Authorization = `Bearer ${newAccessToken}`;

        return req
    })

    return privateAxiosInstance;
}