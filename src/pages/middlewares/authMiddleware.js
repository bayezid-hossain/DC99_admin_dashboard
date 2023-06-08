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
    return data.success;
  } catch (error) {
    console.error('Failed to check authentication:', error);
    setIsAuthenticated(false);
  }
};

export default checkAuth;
