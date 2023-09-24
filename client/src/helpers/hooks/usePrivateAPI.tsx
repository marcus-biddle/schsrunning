import { useEffect } from "react";
import { privateApiClient } from '../../api/config/axios.js';
import {useAuth} from "./useAuth.js";
import useRefreshToken from "./useRefreshToken.js";

export const usePrivateApi = () => {
    // const { auth } = useAuth();
    // const refresh = useRefreshToken();

    // useEffect(() => {

    //     const requestIntercept = privateApiClient.interceptors.request.use(
    //         config => {
    //             if (!config.headers['Authorization']) {
    //                 config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
    //             }
    //             return config;
    //         }, (error) => Promise.reject(error)
    //     );
        
    //     const responseIntercept = privateApiClient.interceptors.response.use(
    //         response => response,
    //         async (error) => {
    //             const prevRequest = error?.config;
    //             if (error?.response?.status === 403 && !prevRequest?.sent) {
    //                 prevRequest.sent = true;
    //                 const newAccessToken = await refresh();
    //                 prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
    //                 return privateApiClient(prevRequest);
    //             }
    //             return Promise.reject(error);
    //         }
    //     );

    //     console.log('req inter', requestIntercept);
    //     console.log('res inter', responseIntercept);

    //     return () => {
    //         privateApiClient.interceptors.request.eject(requestIntercept);
    //         privateApiClient.interceptors.response.eject(responseIntercept);
    //     }
    // }, [auth, refresh])

    return privateApiClient;
}