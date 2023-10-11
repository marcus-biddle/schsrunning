import { AxiosResponse } from "axios";
import { apiClient } from "../../config/axios";
import { UserData } from "../../../constants/types";

const findAll = async ({ privateApi }: { privateApi: any }): Promise<any> => {
    const controller = new AbortController();
    const response: AxiosResponse<any[]> = await privateApi.get('/users', {
        signal: controller.signal
    });

    return response.data;
}

const findById = async (id: any) => {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
}

const findByUsername = async (username: string) => {
    const response = await apiClient.get(`/users?username=${username}`);
    return response.data;
}

const createUser = async ({ username, password }: UserData) => {
    const response = await apiClient.post('/register', { username, password });
    return response.data;
}

// const updateUser = async ({ username, password, roles }: UserData) => {
//     const response = await apiClient.post('/register', { username, password });
//     return response.data;
// }

export const UserActions = {
    findAll,
    findById,
    findByUsername,
    createUser
}