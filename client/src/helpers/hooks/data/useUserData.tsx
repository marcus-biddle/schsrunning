import { useQuery } from "@tanstack/react-query";
import { UserActions } from "../../../api/User/user";


export interface UserData {
    username: string;
    _id: string;
    __v: number;
    roles: string[];
    active: boolean;
};

export const useUsersData = () => {
    const usersQuery = () => ({
        queryKey: ['users'],
        queryFn: async () => {
            const users: UserData[] = await UserActions.findAll();
            return users;
        }
    })

    const { isLoading, data, isError, error, isFetching } = useQuery(usersQuery());
    console.log('hook', { isLoading, data, isError, error, isFetching })
    return  { isLoading, data, isError, error, isFetching }
};