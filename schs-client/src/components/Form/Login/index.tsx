import React, { useState, ChangeEvent, FormEvent } from 'react';
import './styled/index.css'

interface FormData {
  email: string;
  password: string;
}

interface FormErrors {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    email: '',
    password: '',
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const { email, password } = formData;
    const newErrors: FormErrors | any = {};

    // Regular expressions for email and password validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const passwordRegex = /^.{8,}$/;

    // Validate email
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email address';
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    // Update errors state
    setErrors(newErrors);

    // If there are no errors, you can add your login logic here
    // Add backend API, JWT, etc to this.
    if (Object.keys(newErrors).length === 0) {
      console.log('Valid form data:', { email, password });
    }
  };

  return (
    <div className='login-form'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
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

