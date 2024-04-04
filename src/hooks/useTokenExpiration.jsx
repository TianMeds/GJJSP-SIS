{/* import React from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

const LOGOUT_URL = "/api/logout";
const navigate = useNavigate();

const onLogout = async() => {
    const [auth, setAuth] = useAuth();
    setLoading(true);
    try{
      const remember_token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${remember_token}` // Attach the token to the Authorization header
        }
      };

      const response = await axios.post(
          LOGOUT_URL,
          null,
          config
      )
    
      localStorage.removeItem('token');

      setLoading(false);

      setAuth(null); // Update authentication state
    }
    catch(err){
      setLoading(false);
      if(err.response.status === 401) {
        localStorage.removeItem('token');
        setAuth(null); // Update authentication state
        navigate('/login')
      }
    }
  }

  const checkTokenExpiration = async () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    if(tokenExpiration){
      const currentTime = Date.now();
      const tokenExpirationTime = parseInt(tokenExpiration, 10) + 60 * 1000;
      if (currentTime > tokenExpirationTime) {
        // Token expired, perform logout
        onLogout();
      }
    }
  }
export default checkTokenExpiration; */}