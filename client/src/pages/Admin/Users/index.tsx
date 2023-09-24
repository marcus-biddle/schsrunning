import { UserData, useUsersData } from '../../../helpers/hooks/data/useUserData';

const UsersPage = () => {
    const { isLoading, data, isError, error, isFetching } = useUsersData();

    console.log('data', data);

    if (isLoading || isFetching) {
        return <h1>Loading...</h1>
    }

    if (isError) {
        return <h1>{error ? <>{error}</> : 'error'}</h1>
    }

    return (
    <div>
        {/* {data && data.map((user: UserData) => {
            return (
                <div key={`${user._id}`}>
                    {user.username}
                </div>
            )
        })} */}
    </div>
    )
}

export default UsersPage