import { usePrivateApi } from "../../helpers/hooks/usePrivateAPI";

const findRefreshToken = async () => {
    const privateApi = usePrivateApi();
    const { data } = await privateApi.get('/refresh');
    return data;
}

export const refreshTokenActions = {
    findRefreshToken
}