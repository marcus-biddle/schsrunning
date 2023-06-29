import React, { useContext, useEffect, useRef, useState } from 'react';
import './styled/index.css'
import { AuthContext } from '../../context/authProvider';
import { fetchUser } from '../../api/auth';

const Login: React.FC = () => {
    const { setAuth, auth } = useContext(AuthContext);
  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLParagraphElement>(null);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState<boolean>();

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
        console.log('clicked');
        const response = await fetchUser(user, pwd, '1234');
        console.log('response', response);
        if (response) {
            const accessToken = response.accessToken;
            setAuth({ user, pwd, accessToken })
          setUser('');
          setPwd('');
          setSuccess(true);
          console.log(auth);
        } else {
          // User not found or incorrect credentials
          console.log('Invalid username or password');
        }
      } catch (err: any) {
        // Handle error
        console.error('Error during login:', err);
        if (!err.response) {
            setErrMsg('No Server Resopnse');
        } else if (err.response.status === 400) {
            setErrMsg('Missing Username or Password');
        } else if (err.response.status === 401) {
            setErrMsg('Unauthorized');
        } else {
            setErrMsg('Login Failed');
        }
        console.log(errMsg);
        errRef?.current?.focus();
      }
      

    // Example error handling
    if (user === '' || pwd === '') {
      setErrMsg('Please enter both username and password.');
    } else {
      setErrMsg('');
      setSuccess(true);
      // Reset form fields
      setUser('');
      setPwd('');
    }
  };

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
