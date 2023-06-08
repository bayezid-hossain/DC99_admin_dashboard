import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Input from '@iso/components/uielements/input';
import Checkbox from '@iso/components/uielements/checkbox';
import Button from '@iso/components/uielements/button';

import useAuth from '@iso/pages/hooks/useAuth'; // Import the custom hook for authentication
import configureAppStore from '@iso/redux/store';

const store = configureAppStore();
// import FirebaseLogin from '@iso/containers/FirebaseForm/FirebaseForm';
// import Auth0 from '../authentication/Auth0';

import jwtAuthentication from '@iso/authentication/jwtAuthentication';
import SignInStyleWrapper from '../styled/SignIn.styles';
export default function SignInPage(props) {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true); // State to track loading state

  const [errorMessage, setErrorMessage] = useState(null); // Add state for error message
  const [successMessage, setSuccessMessage] = useState(null); // Add state for success message

  const handleJWTLogin = async () => {
    const userInfo = {
      email:
        (typeof window === 'object' &&
          document.getElementById('inputUserName').value) ||
        '',
      password:
        (typeof window === 'object' &&
          document.getElementById('inpuPassword').value) ||
        '',
    };
    try {
      // Call jwtAuthentication.login with user info
      const result = await jwtAuthentication.login(userInfo);
      // If authentication is successful
      //console.log(result.token);
      if (result.success) {
        // Redirect to the desired page using Next.js router
        router.push('/dashboard'); // Replace '/dashboard' with the desired URL
        setSuccessMessage('Login successful!'); // Set success message in state
        setErrorMessage(null);
      } else {
        // Handle authentication failure
        console.error(result.message);
        setErrorMessage(result.message); // Set error message in state
      }
    } catch (error) {
      // Handle any error that may occur during authentication
      console.error('Error during authentication:', error);
    }
  };
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
        if (data.success) {
          // Redirect to login page
          router.replace('/dashboard');
        }
      } catch (error) {
        console.error('Failed to fetch authentication status:', error);
        // Redirect to login page on error
        router.replace('/');
      } finally {
        // Set loading state to false
        setIsLoading(false);
      }
    };

    fetchAuthStatus();
  }, []);
  if (isLoading) {
    return <p>Please wait while we authenticate you...</p>;
  }
  if (isAuthenticated) {
    return (
      <div>
        <h1>Dashboard Page</h1>
        <p>
          This is a private dashboard page that requires authentication to
          access.
        </p>
      </div>
    );
  } else {
    // Redirect to login page if not authenticated

    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              DC99
              {/* <Link href="/dashboard">
              <a>
                <IntlMessages id="page.signInTitle" />
              </a>
            </Link> */}
            </div>

            <div className="isoSignInForm">
              <div className="isoInputWrapper">
                <Input
                  id="inputUserName"
                  size="large"
                  placeholder="Username"
                  defaultValue="arkantos.tas@gmail.com"
                />
              </div>
              <div className="isoInputWrapper">
                <Input
                  id="inpuPassword"
                  size="large"
                  type="password"
                  placeholder="Password"
                  defaultValue="asdfasdf"
                />
              </div>
              <div>
                {/* Render error message if exists */}
                {errorMessage && (
                  <div
                    style={{
                      backgroundColor: '#f8d7da',
                      color: '#721c24',
                      border: '1px solid #f5c6cb',
                      padding: '8px',
                      borderRadius: '4px',
                      margin: '8px 0',
                    }}
                  >
                    <p style={{ margin: '0' }}>{errorMessage}</p>
                  </div>
                )}
                {/* Render success message if exists */}
                {successMessage && (
                  <div
                    style={{
                      backgroundColor: '#d2f0d7', // Update to green-ish background color
                      color: '#228b22', // Update to green-ish text color
                      border: '1px solid #90ee90', // Update to green-ish border color
                      padding: '8px',
                      borderRadius: '4px',
                      margin: '8px 0',
                    }}
                  >
                    <p style={{ margin: '0' }}>{successMessage}</p>
                  </div>
                )}
              </div>
              <div className="isoInputWrapper isoLeftRightComponent">
                <Checkbox>
                  {/* <IntlMessages id="page.signInRememberMe" /> */}
                  Remember Me
                </Checkbox>
                <Button type="primary" onClick={handleJWTLogin}>
                  Sign In
                  {/* <IntlMessages id="page.signInButton" /> */}
                </Button>
              </div>

              <p className="isoHelperText">
                {/* <IntlMessages id="page.signInPreview" /> */}
              </p>
            </div>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}
