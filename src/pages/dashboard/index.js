import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth'; // Import the custom hook for authentication
import Router from 'next/router'; // Import the Next.js router for redirection
import actions from '../../redux/ecommerce/actions';
//import Widgets from '@iso/containers/Widgets/Widgets';
import { useDispatch } from 'react-redux';
const DashboardPage = () => {
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch authentication status on component mount
    const fetchAuthStatus = async () => {
      try {
        const response = await fetch(
          'http://localhost:4000/api/v1/auth/checkAuth',
          {
            credentials: 'include', // Include credentials (cookies) in the request
          }
        );
        const data = await response.json();
        // Check if authenticated
        if (!data.success) {
          // Redirect to login page
          Router.replace('/');
        }
      } catch (error) {
        console.error('Failed to fetch authentication status:', error);
        // Redirect to login page on error
        Router.replace('/');
      } finally {
        // Set loading state to false
        setIsLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);

  // Render nothing until the authentication check is complete
  if (isLoading) {
    return <p>Please wait while we authenticate you...</p>;
  }

  // Render the dashboard content if authenticated
  if (isAuthenticated) {
    dispatch({ type: actions.INIT_DATA_SAGA });

    Router.push('/dashboard/products');
  } else {
    // Redirect to login page if not authenticated
    Router.replace('/');
    return <p>Please wait while we authenticate you...</p>;
  }
};

export default DashboardPage;
