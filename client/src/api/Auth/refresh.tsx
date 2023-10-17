import { privateAxiosInstance } from "../config/axios";

const findRefreshToken = async () => {
    const { data } = await privateAxiosInstance.get('/refresh');
    return data;
}

export const refreshTokenActions = {
    findRefreshToken
}