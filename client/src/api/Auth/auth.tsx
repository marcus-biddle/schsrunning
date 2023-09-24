import { UserData } from "../../types";
import { apiClient } from "../config/axios";

const handleLogin = async ({ username, password }: UserData) => {
  
    try {
        // Create an object with the login credentials
        const credentials = {
          username: username,
          password: password,
        };
    
        // Make a POST request to your login endpoint
        const response = await apiClient.post('/login', credentials);
    
        // Check the response for success or failure
        if (response.status === 200) {
          // Login was successful, handle the success case here
          // For example, you can store authentication tokens in your app state
          const accessToken: string = response.data.accessToken;
          const roles: string[] = response.data.roles;

          console.log('auth response', response);
          return { username, password, roles, accessToken}
          // Perform any additional actions for successful login
        } else {
          // Login failed, handle the failure case here
          // You can show error messages to the user or perform other actions
        }
      } catch (error) {
        // Handle any errors that occur during the login request
        // You can log the error or display an error message to the user
        console.error('Login error:', error);
      }
};

export const AuthActions = {
    handleLogin
}