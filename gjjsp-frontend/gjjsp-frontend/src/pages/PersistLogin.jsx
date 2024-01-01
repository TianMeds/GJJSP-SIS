{/* import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Outlet } from "react-router-dom";
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth,setAuth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try{
        const storedToken = localStorage.getItem('remember_token');
        if (storedToken) {
            setAuth(prev => ({ ...prev, remember_token: storedToken }));
            await refresh(); // Use the refresh function to update the token
        }
      }
      catch(err){
        console.error(err);
      }
      finally{
        setIsLoading(false);
      }
    }
    !auth?.remember_token ? verifyRefreshToken() : setIsLoading(false);
  }, [])

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`)
    console.log(`aT:  ${JSON.stringify(auth?.remember_token)}`)
  }, [isLoading])

  return (
    <>
      {isLoading ? <div>Loading...</div> : <Outlet/>}
    </>
  )

}
export default PersistLogin; */}
