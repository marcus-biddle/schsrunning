import React, { useState, ChangeEvent, FormEvent } from 'react';
import './styled/index.css'
import { AuthActions } from '../../../api/Auth/auth';
import { UserData } from '../../../types';
import { useAuth } from '../../../helpers/hooks/useAuth';
import { useLocation, useNavigate } from 'react-router';

const LoginForm: React.FC = () => {
  const { setAuth, auth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [userData, setUserData] = useState<UserData>({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState<UserData>({
    username: '',
    password: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const { username, password } = userData;
    const newErrors: UserData | any = {};

    // Regular expressions for username and password validation
    const usernameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;
    const passwordRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/;

    // Validate username
    if (!usernameRegex.test(username)) {
      newErrors.username = 'Invalid username address';
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Update errors state
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const user = await AuthActions.handleLogin({ username, password });
      
      if (user) {
        console.log('login user',user)
        setAuth({
          username: user.username,
          password: user.password,
          roles: user.roles,
          accessToken: user.accessToken
        });
        navigate(from, { replace: true });
        console.log('login auth', auth)
      } else {
        console.log('User not authenticated.')
      }
    }
  };

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

