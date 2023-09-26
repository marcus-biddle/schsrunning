import { useQuery } from "@tanstack/react-query";
import { UserActions } from "../../../api/User/user";
import { useAuth } from "../useAuth";
import { usePrivateApi } from "../usePrivateAPI";
import { useRefreshToken } from "../useRefreshToken";

export interface UserData {
    username: string;
    _id: string;
    __v: number;
    roles: string[];
    active: boolean;
};

export const useUsersData = () => {
    const { auth } = useAuth();
    const refresh = useRefreshToken();
    console.log('useUserData', auth);
    const privateApi = usePrivateApi({ auth, refresh });
    const usersQuery = () => ({
        queryKey: ['users'],
        queryFn: async () => {
            const users: UserData[] = await UserActions.findAll({privateApi});
            if (users) return users;
        }
    })

    const { isLoading, data, isError, error, isFetching } = useQuery(usersQuery());
    console.log('hook', { isLoading, data, isError, error, isFetching })
    return  { isLoading, data, isError, error, isFetching }
};