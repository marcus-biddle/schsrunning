// import { useQuery } from "@tanstack/react-query";
// import { UserActions } from "../../../api/Auth/User/user";
// import { useAuth } from "../useAuth";
// import { usePrivateApi } from "../usePrivateAPI";
// import { useRefreshToken } from "../useRefreshToken";

export interface UserData {
    username: string;
    _id: string;
    __v: number;
    roles: string[];
    active: boolean;
}

// export const useUsersData = async () => {
    
// };