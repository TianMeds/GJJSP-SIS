import axios from '../api/axios';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const onLogout = async (setLoading, setAuth, navigate, LOGOUT_URL) => {
  setLoading(true);
  try {
    const remember_token = localStorage.getItem('remember_token');
    const config = {
      headers: {
        Authorization: `Bearer ${remember_token}` // Attach the token to the Authorization header
      }
    };

    const response = await axios.post(
      LOGOUT_URL,
      null,
      config
    );

    setLoading(false);
    localStorage.removeItem('remember_token');

    setAuth(null); // Update authentication state
  } catch (err) {
    setLoading(false);
    if (err.response.status === 401) {
      localStorage.removeItem('remember_token');
      setAuth(null); // Update authentication state
      navigate('/login');
    }
  }
};

const checkTokenExpiration = (expirationTime, onLogout) => {
  if (expirationTime) {
    const currentTime = Date.now();
    const tokenExpirationTime = parseInt(expirationTime, 10) + 1800 * 1000;
    if (currentTime > tokenExpirationTime) {
      // Token expired, perform logout
      onLogout();
    }
  }
};

const checkAutoLogin = async () => {
  const tokenDetailsString = localStorage.getItem('remember_token');
  let tokenDetails = '';
  if (!tokenDetailsString) {
    onLogout();
    return;
  }
  tokenDetails = JSON.stringify(tokenDetailsString);
  checkTokenExpiration();
};

export { onLogout, checkTokenExpiration, checkAutoLogin };
