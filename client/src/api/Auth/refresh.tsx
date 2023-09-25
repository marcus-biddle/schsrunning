import { privateApiClient } from "../config/axios";

const findRefreshToken = async () => {
    const { data } = await privateApiClient.get('/refresh');
    return data;
}

export const refreshTokenActions = {
    findRefreshToken
}