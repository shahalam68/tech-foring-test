import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: !!localStorage.getItem('siteToken'),
    accessToken: localStorage.getItem('siteToken') || ''
  });
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('siteToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setAuth({ isLoggedIn: true, accessToken: token });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password }, { withCredentials: true });
      console.log('Login response:', response);
      if (response.data.Login) {
        const token = response.data.accessToken;
        if (token) {
          localStorage.setItem('siteToken', token);
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          setAuth({ isLoggedIn: true, accessToken: token });
          setUser(response.data.user); // Save user data
          navigate('/');
        }
      } else {
        throw new Error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  };

  const logout = () => {
    axios.post('http://localhost:5000/logout', {}, { withCredentials: true })
      .then(() => {
        localStorage.removeItem('siteToken');
        setAuth({ isLoggedIn: false, accessToken: '' });
        axios.defaults.headers.common['Authorization'] = '';
        navigate('/login');
      })
      .catch((error) => {
        console.error('Logout Error:', error);
      });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
