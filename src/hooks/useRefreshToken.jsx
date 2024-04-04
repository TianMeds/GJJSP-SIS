{/* import axios from '../api/axios';
import useAuth from './useAuth';

const TOKEN_URL = '/api/refresh-token';

const useRefreshToken = () => {
    const { auth, setAuth } = useAuth(); // Retrieve auth state and setter

    const refresh = async () => {
            const remember_token = localStorage.getItem('remember_token');
            const config = {
                headers: {
                    Authorization: `Bearer ${remember_token}` // Attach the token to the Authorization header
                }
            };
            const response = await axios.get(
                TOKEN_URL,
                config
            )
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.remember_token);
                return {
                    ...prev,
                    role_id: response.data.role_id,
                    remember_token: response.data.remember_token
                }
            });
            return response.data.remember_token
    }   
    return refresh;
};

export default useRefreshToken; */}