import React, { useContext, useEffect, useRef, useState } from 'react';
import './styled/index.css'
import { AuthContext } from '../../context/authProvider';
import { fetchUser } from '../../api/auth';
import { useMutation} from '@tanstack/react-query';
import { useLocation, useNavigate } from 'react-router';
import { getAccessTokenCookie, setAccessTokenCookie } from '../../authUtils';

// export const loader = () => {
//     if (getAccessTokenCookie()) {
//         return getAccessTokenCookie();
//     }
//     return null;
// };

const Login: React.FC = () => {
    const { setAuth, auth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState<boolean>();
  const navigate = useNavigate();
  const { state } = useLocation();

  const mutation = useMutation({
    mutationFn: async ({user, pwd}: {user: string, pwd: string}) => {
        const res = await fetchUser(user, pwd, '1234');
        return res;
    },
    onSuccess: async() => {
        navigate(state?.path || '/dashboard/');
    }
  })

  useEffect(() => {
    if (getAccessTokenCookie()) {
        navigate(state?.path || '/dashboard/');
    }
  }, [navigate, state?.path])

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Perform login logic here
    try {
        const response = await mutation.mutateAsync({user, pwd});
        console.log(response);
        if (response) {
            const accessToken = response.accessToken;
            setAuth({ user, pwd, accessToken })
            setUser('');
            setPwd('');
            setSuccess(true);
            setAccessTokenCookie(accessToken, 60000 * 60);
            console.log(auth);
        } else {
          // User not found or incorrect credentials
          console.log('Invalid username or password');
        }
      } catch (err) {
        // Handle error
        console.error('Error during login:', err);
        setErrMsg('Login Failed');
        console.log(errMsg);
        errRef?.current?.focus();
      }
  };

  console.log('cookie func', getAccessTokenCookie())

  return (
    <div className="Login">
      <h1>Login</h1>
      {errMsg && <p className="error-message">{errMsg}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={user}
            ref={userRef}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
