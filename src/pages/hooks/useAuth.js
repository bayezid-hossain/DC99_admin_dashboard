import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Your authentication logic
  // This is just an example, you may need to modify it based on your actual authentication setup
  const checkAuth = async () => {
    try {
      // Fetch authentication status from your backend or perform any other authentication logic
      const response = await fetch(
        'http://localhost:4000/api/v1/auth/checkAuth',
        {
          credentials: 'include', // Include credentials (cookies) in the request
        }
      );
      const data = await response.json();
      setIsAuthenticated(data.success);
    } catch (error) {
      console.error('Failed to check authentication:', error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    checkAuth(); // Check authentication status on component mount
  }, []);

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!isAuthenticated && !router.pathname.startsWith('/')) {
      // Synchronously push to the login page
      router.push('/');
    }
  }, [isAuthenticated, router.pathname]); // Include isAuthenticated and router.pathname as dependencies

  return { isAuthenticated };
};

export default useAuth;
