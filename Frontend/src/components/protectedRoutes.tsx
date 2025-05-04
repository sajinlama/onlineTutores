import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const ProtectedRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Make a request to a protected endpoint to verify authentication
        const response = await axios.get('http://localhost:5001/api/auth/verify', { withCredentials: true });
       
        const userId =response.data.user.userId;
        console.log(userId);
        localStorage.setItem('userId', userId);
        setIsAuthenticated(response.data.authenticated);
      } catch (error) {
        console.error('Authentication check failed:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    // Display a loading indicator while checking authentication
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // Redirect to login if not authenticated, otherwise render the protected route
  return  isAuthenticated? <Outlet /> :<Navigate  to ="/"/>  ;
};

export default ProtectedRoute;