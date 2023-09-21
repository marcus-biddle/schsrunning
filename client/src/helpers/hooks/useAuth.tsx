import { useState, useEffect } from 'react';

/** UNreleated to this file, but the solution to 
 * the database sleeping problem could be to
 * make cacheTime for 7 days or however long so it
 * doesn't need to go to the database everytime someone
 * visits.
 * Default time is like 15 minutes?
 * Anyone coming to the site for the first time will still have to deal with the 
 * loading however.
 */
/** Add React Hook Form for Admin */
// Might wrap this in a context state management
function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate user authentication status.
  useEffect(() => {
    // Check if the user is authenticated (you can use a real authentication service here).
    // const isAuthenticated = /* Logic to check authentication status */;

    // if (isAuthenticated) {
    //   // Fetch user data (e.g., user profile) if authenticated.
    // //   const userData = /* Logic to fetch user data */;

    //   // Update user state.
    // //   setUser(userData);
    // } else {
    //   // User is not authenticated, set user to null.
    //   setUser(null);
    // }

    // Authentication check is complete.
    setIsLoading(false);
  }, []);

  // Login function.
  // pass in creds to login
  const login = async () => {
    // Perform login logic (e.g., send login request to a server).
    try {
      // Simulate a successful login.
    //   const userData = /* Simulated user data after login */;
    //   setUser(userData);
    //   return userData;
    } catch (error) {
      // Handle login error.
      throw new Error('Login failed');
    }
  };

  // Logout function.
  const logout = async () => {
    // Perform logout logic (e.g., invalidate the authentication token).
    try {
      // Simulate a successful logout.
      setUser(null);
    } catch (error) {
      // Handle logout error.
      throw new Error('Logout failed');
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user, // Check if the user is authenticated
    login,
    logout,
  };
}

export default useAuth;
