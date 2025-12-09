import axios from 'axios';

const testLogin = async () => {
  try {
    // Test with a valid email - adjust these credentials based on what you actually signed up with
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'test@example.com',
      password: 'Test@123456'
    });

    console.log('✅ Login successful!');
    console.log('Token:', response.data.token);
    console.log('User:', response.data.user);
  } catch (error) {
    console.error('❌ Login failed:', error.response?.data || error.message);
  }
};

testLogin();
