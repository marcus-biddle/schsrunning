import { useLocation, useNavigate } from 'react-router';
import { UserData } from '../../../helpers/hooks/data/useUserData';
import { usePrivateApi } from '../../../helpers/hooks/usePrivateAPI';
import { UserActions } from '../../../api/Auth/User/user';
import { useQuery } from '@tanstack/react-query';

const UsersPage = () => {
    const privateApi = usePrivateApi();
    const {data: users, isLoading, isError, error, isFetching} = useQuery(['users'], async () => await UserActions.findAll({ privateApi }));

    const navigate = useNavigate();
    const location = useLocation();


    if (isLoading || isFetching) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        console.log('User page error', error)
        navigate('/login', { state: { from: location}, replace: true });
        return <h1>{error ? <>{error}</> : 'error'}</h1>
    }

    return (
    <div>
        <p>test</p>
        {users && users?.map((user: UserData) => {
            return (
                <div key={`${user._id}`}>
                    {user.username}
                </div>
            )
        })}
    </div>
    )
}

export default UsersPage