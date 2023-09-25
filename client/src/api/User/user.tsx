import { AxiosInstance } from "axios";
import { useAuth } from "../../helpers/hooks/useAuth";
import { usePrivateApi } from "../../helpers/hooks/usePrivateAPI";
import { UserData } from "../../types";
import { apiClient, privateApiClient } from "../config/axios";

interface UserApiProps {
    privateApi: AxiosInstance;
}

const findAll = async ({ privateApi }: UserApiProps) => {
    const controller = new AbortController();
    console.log('privateApi', privateApi);
    const response = await privateApi.get('/users', {
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