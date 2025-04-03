const login = async (credentials) => {
  try {
    const response = await axios.post('/api/auth/login', credentials);
    const token = response.data.token;
    
    // Log để kiểm tra format token
    console.log('Token received:', token);
    
    if (token) {
      localStorage.setItem('token', token);
      console.log('Token saved to localStorage');
    } else {
      console.error('No token received from server');
    }
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}; 