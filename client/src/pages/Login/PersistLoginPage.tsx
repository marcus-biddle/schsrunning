import { useEffect, useState } from 'react'
import { useRefreshToken } from '../../helpers/hooks/useRefreshToken';
import { useAuth } from '../../helpers/hooks/useAuth';
import { RequiredAuth } from '../../authUtils/RequiredAuth';

export const PersistLoginPage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`);
        console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    }, [isLoading])

  return (
    <>
        {isLoading
            ? <p>Loading...</p>
            : <RequiredAuth allowedRoles={[ 'admin' ]} />
        }
    </>
  )
}