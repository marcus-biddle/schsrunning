import { useLocation, useNavigate } from 'react-router';
import { UserData, useUsersData } from '../../../helpers/hooks/data/useUserData';

const UsersPage = () => {
    const { isLoading, data, isError, error, isFetching } = useUsersData();
    const navigate = useNavigate();
    const location = useLocation();

    if (isLoading || isFetching) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        navigate('/login', { state: { from: location}, replace: true });
        return <h1>{error ? <>{error}</> : 'error'}</h1>
    }

    return (
    <div>
        <p>test</p>
        {data && data.map((user: UserData) => {
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